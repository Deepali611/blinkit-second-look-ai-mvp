import { NextRequest, NextResponse } from "next/server";
import { getAllEvents } from "@/lib/db/events";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const failureType = searchParams.get("failureType") ?? undefined;

    const events = getAllEvents(failureType);
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Error loading events:", error);
    return NextResponse.json(
      { error: "failed_to_load_events" },
      { status: 500 }
    );
  }
}
