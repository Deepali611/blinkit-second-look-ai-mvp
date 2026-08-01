import { NextRequest, NextResponse } from "next/server";
import { logSessionOutcome } from "@/lib/db/outcomes";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productId,
      obstacleDetected,
      obstacleType,
      selectedEvidence,
      confidenceLevel,
      verificationPassed,
      actionShown,
      finalOutcome,
    } = body;

    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { error: "product_id_required" },
        { status: 400 }
      );
    }

    if (!finalOutcome || (finalOutcome !== "added_to_cart" && finalOutcome !== "exited_without_purchase")) {
      return NextResponse.json(
        { error: "valid_final_outcome_required" },
        { status: 400 }
      );
    }

    const record = logSessionOutcome({
      productId,
      obstacleDetected: Boolean(obstacleDetected),
      obstacleType: obstacleType || "quality_authenticity",
      selectedEvidence: selectedEvidence || "reorder_rate",
      confidenceLevel: confidenceLevel || "high",
      verificationPassed: verificationPassed !== false,
      actionShown: actionShown || "highlight_seller",
      finalOutcome,
    });

    return NextResponse.json({
      success: true,
      outcomeId: record.outcomeId,
      record,
    });
  } catch (err) {
    console.error("Error logging session outcome:", err);
    return NextResponse.json(
      { error: "failed_to_log_outcome" },
      { status: 500 }
    );
  }
}
