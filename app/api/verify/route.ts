import { NextRequest, NextResponse } from "next/server";
import { verifyFailure } from "@/lib/rules/verify";

const VALID_FAILURE_TYPES = new Set([
  "expiry_authenticity",
  "missing_information",
  "unresolved_support",
  "high_value_hesitation",
  "unclear",
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, failureType } = body;

    if (!eventId || typeof eventId !== "string") {
      return NextResponse.json(
        { error: "event_id_required" },
        { status: 400 }
      );
    }

    if (!failureType || !VALID_FAILURE_TYPES.has(failureType)) {
      return NextResponse.json(
        { error: "invalid_failure_type" },
        { status: 400 }
      );
    }

    const result = verifyFailure(eventId, failureType);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error processing verification request:", error);
    return NextResponse.json(
      { error: "verification_failed" },
      { status: 500 }
    );
  }
}
