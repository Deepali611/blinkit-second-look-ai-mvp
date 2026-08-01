import { NextRequest, NextResponse } from "next/server";
import { computeConfidence, ConfidenceLevel } from "@/lib/decision/confidenceGate";
import seedData from "@/data/seed.json";

export interface ReasonResponse {
  selectedEvidence?: string | null;
  evidenceValue?: number;
  message?: string | null;
  action?: string;
}

export async function POST(request: NextRequest) {
  let productId: string | undefined;
  let aiOutput: ReasonResponse | undefined;

  try {
    const body = await request.json();
    productId = body.productId || body.eventId;
    aiOutput = body.aiOutput;
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

  // Find product by ID or event ID
  const product =
    seedData.products.find((p) => p.productId === productId || p.name === productId) ||
    seedData.products.find((p) => productId.startsWith("evt_") && p.productId === "boat_airdopes_141");

  const reorderRate = product?.reorderRate ?? null;
  const returnRate = product?.returnRate ?? null;
  const sellerConsistency = product?.sellerConsistency ?? null;

  // Compute Stage 3 Deterministic Confidence
  const confidence: ConfidenceLevel = computeConfidence(
    reorderRate,
    returnRate,
    sellerConsistency
  );

  let displayRule = "no_intervention";
  let finalAction = "no_action";
  let showReassuranceMessage = false;
  let finalMessage: string | null = null;

  switch (confidence) {
    case "high":
      displayRule = "show_reassurance_emphasize_cta";
      finalAction = aiOutput?.action && aiOutput.action !== "no_action" ? aiOutput.action : "highlight_seller";
      showReassuranceMessage = true;
      finalMessage = aiOutput?.message || `Quality verified with ${(reorderRate! * 100).toFixed(0)}% reorder rate.`;
      break;

    case "medium":
      displayRule = "show_reassurance_open_reviews";
      finalAction = "jump_to_reviews";
      showReassuranceMessage = true;
      finalMessage = aiOutput?.message || `Verified product feedback with ${(reorderRate! * 100).toFixed(0)}% reorder rate.`;
      break;

    case "low":
      displayRule = "show_seller_info_only";
      finalAction = "highlight_seller";
      showReassuranceMessage = false;
      finalMessage = null; // Hard rule: do NOT show the AI-generated message for low confidence
      break;

    case "below_threshold":
    default:
      displayRule = "no_intervention";
      finalAction = "no_action";
      showReassuranceMessage = false;
      finalMessage = null;
      break;
  }

  return NextResponse.json({
    productId,
    confidence,
    displayRule,
    finalAction,
    showReassuranceMessage,
    finalMessage,
    evidenceMetrics: {
      reorderRate,
      returnRate,
      sellerConsistency,
    },
  });
}
