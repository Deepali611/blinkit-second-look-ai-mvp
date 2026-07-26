import { NextRequest, NextResponse } from "next/server";
import { logOutcome } from "@/lib/db/outcomes";

const VALID_OUTCOME_TYPES = new Set([
  "same_category_repurchase",
  "cross_category_attempt",
  "dismissed",
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, outcomeType } = body;

    if (!eventId || typeof eventId !== "string") {
      return NextResponse.json(
        { error: "event_id_required" },
        { status: 400 }
      );
    }

    if (!outcomeType || !VALID_OUTCOME_TYPES.has(outcomeType)) {
      return NextResponse.json(
        { error: "invalid_outcome_type" },
        { status: 400 }
      );
    }

    logOutcome(
      eventId,
      outcomeType as "same_category_repurchase" | "cross_category_attempt" | "dismissed"
    );

    return NextResponse.json({ logged: true }, { status: 200 });
  } catch (error) {
    console.error("Error logging outcome:", error);
    return NextResponse.json(
      { error: "failed_to_log_outcome" },
      { status: 500 }
    );
  }
}
