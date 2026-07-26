import { NextRequest, NextResponse } from "next/server";
import { getEventById } from "@/lib/db/events";
import { buildClassificationPrompt } from "@/lib/prompts/classify";
import { logClassification } from "@/lib/db/classificationLogs";

const VALID_FAILURE_TYPES = new Set([
  "expiry_authenticity",
  "missing_information",
  "unresolved_support",
  "high_value_hesitation",
  "unclear",
]);

const VALID_CONFIDENCE_LEVELS = new Set(["high", "medium", "low"]);

export async function POST(request: NextRequest) {
  let eventId: string | undefined;

  try {
    const body = await request.json();
    eventId = body.eventId;
  } catch {
    return NextResponse.json(
      { error: "invalid_request_body" },
      { status: 400 }
    );
  }

  if (!eventId || typeof eventId !== "string") {
    return NextResponse.json(
      { error: "event_id_required" },
      { status: 400 }
    );
  }

  const event = getEventById(eventId);
  if (!event) {
    return NextResponse.json(
      { error: "event_not_found" },
      { status: 404 }
    );
  }

  const prompt = buildClassificationPrompt(
    event.rawText,
    event.triggerType,
    event.category,
    event.ratingValue
  );

  const apiKey = process.env.GROQ_API_KEY;

  if (apiKey) {
    try {
      const groqResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
            response_format: { type: "json_object" },
          }),
        }
      );

      if (groqResponse.ok) {
        const groqData = await groqResponse.json();
        const content = groqData.choices?.[0]?.message?.content;

        if (content) {
          const parsed = JSON.parse(content);

          const failureType = parsed.failureType;
          const confidence = parsed.confidence;
          const reasoning = parsed.reasoning;

          if (
            VALID_FAILURE_TYPES.has(failureType) &&
            VALID_CONFIDENCE_LEVELS.has(confidence) &&
            typeof reasoning === "string" &&
            reasoning.trim().length > 0
          ) {
            logClassification(eventId, failureType, confidence);

            return NextResponse.json(
              {
                failureType,
                confidence,
                reasoning: reasoning.trim(),
                modelCallType: "live",
              },
              { status: 200 }
            );
          }
        }
      }
    } catch (err) {
      console.warn("Live classification failed, falling back to cached seed data:", err);
    }
  }

  // Cached fallback case (graceful degradation)
  if (event.groundTruthFailureType) {
    logClassification(eventId, event.groundTruthFailureType, "medium");

    return NextResponse.json(
      {
        failureType: event.groundTruthFailureType,
        confidence: "medium",
        reasoning: "Cached result — live classification unavailable",
        modelCallType: "cached",
      },
      { status: 200 }
    );
  }

  // Hard error case if even fallback fails
  return NextResponse.json(
    { error: "classification_failed" },
    { status: 502 }
  );
}
