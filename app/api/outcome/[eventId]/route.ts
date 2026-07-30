import { NextRequest, NextResponse } from "next/server";
import { getOutcomeByEventId } from "@/lib/db/outcomes";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const outcome = getOutcomeByEventId(eventId);
    return NextResponse.json({ outcome }, { status: 200 });
  } catch (error) {
    console.error("Error fetching outcome by event ID:", error);
    return NextResponse.json({ outcome: null }, { status: 500 });
  }
}
