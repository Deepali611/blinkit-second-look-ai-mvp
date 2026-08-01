import { NextRequest, NextResponse } from "next/server";
import seedData from "@/data/seed.json";

export async function POST(request: NextRequest) {
  let productId: string | undefined;

  try {
    const body = await request.json();
    productId = body.productId || body.eventId;
  } catch {
    return NextResponse.json(
      { error: "invalid_request_body" },
      { status: 400 }
    );
  }

  if (!productId || typeof productId !== "string") {
    return NextResponse.json(
      { error: "product_id_required" },
      { status: 400 }
    );
  }

  // Find product by ID or name or event ID
  const product =
    seedData.products.find((p) => p.productId === productId || p.name === productId) ||
    seedData.products.find((p) => productId.startsWith("evt_") && p.productId === "boat_airdopes_141");

  if (!product) {
    return NextResponse.json({
      selectedEvidence: null,
      evidenceValue: 0,
      message: null,
      action: "no_action",
    });
  }

  const { reorderRate, returnRate, sellerConsistency, name, seller } = product;

  // Build controlled prompt
  const prompt = `You are Blinkit's AI Reassurance Reasoning Engine.
Given the following raw operational metrics for product "${name}" sold by "${seller}":
- Reorder Rate: ${(reorderRate * 100).toFixed(0)}% (reorderRate = ${reorderRate})
- Return Rate: ${(returnRate * 100).toFixed(1)}% (returnRate = ${returnRate})
- Seller Consistency: ${sellerConsistency.verifiedOrderCount} verified orders, ${sellerConsistency.qualityComplaintCount} quality complaints, ${sellerConsistency.daysWithoutComplaint} consecutive days without complaints.

Task:
1. Select which ONE piece of evidence ("reorder_rate", "return_rate", or "seller_consistency") most directly addresses a Quality/Authenticity concern for this specific product.
2. Extract the numeric value corresponding to the selected evidence.
3. Generate a short 1-sentence grounded reassurance message referencing ONLY the selected evidence number (no invented claims).
4. Select exactly ONE next action from this fixed set: "highlight_seller" | "jump_to_reviews" | "emphasize_replacement" | "focus_cta" | "no_action".

Output MUST be a strict JSON object with this schema:
{
  "selectedEvidence": "reorder_rate" | "return_rate" | "seller_consistency",
  "evidenceValue": number,
  "message": "1-sentence grounded message",
  "action": "highlight_seller" | "jump_to_reviews" | "emphasize_replacement" | "focus_cta" | "no_action"
}`;

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
            temperature: 0.1,
            response_format: { type: "json_object" },
          }),
        }
      );

      if (groqResponse.ok) {
        const groqData = await groqResponse.json();
        const content = groqData.choices?.[0]?.message?.content;

        if (content) {
          const parsed = JSON.parse(content);
          if (
            parsed.selectedEvidence &&
            parsed.message &&
            parsed.action
          ) {
            return NextResponse.json({
              selectedEvidence: parsed.selectedEvidence,
              evidenceValue: Number(parsed.evidenceValue) || (reorderRate * 100),
              message: parsed.message,
              action: parsed.action,
              reasoningType: "live_ai",
            });
          }
        }
      }
    } catch (err) {
      console.warn("Live Stage 2 AI reasoning failed, returning safe fallback:", err);
    }
  }

  // Safe fallback if model call or API fails (never fabricate a message)
  return NextResponse.json({
    selectedEvidence: null,
    evidenceValue: 0,
    message: null,
    action: "no_action",
    reasoningType: "fallback_no_action",
  });
}
