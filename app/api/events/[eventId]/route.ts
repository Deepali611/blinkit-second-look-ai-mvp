import { NextRequest, NextResponse } from "next/server";
import { getEventById } from "@/lib/db/events";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params;
    const event = getEventById(eventId);

    if (!event) {
      return NextResponse.json(
        { error: "event_not_found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error retrieving event by ID:", error);
    return NextResponse.json(
      { error: "failed_to_load_events" },
      { status: 500 }
    );
  }
}
