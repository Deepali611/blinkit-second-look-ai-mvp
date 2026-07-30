import { NextResponse } from "next/server";
import { computeExperimentSummary } from "@/lib/metrics/experimentSummary";

export async function GET() {
  try {
    const summary = computeExperimentSummary();
    return NextResponse.json({ summary: summary || [] }, { status: 200 });
  } catch (error) {
    console.error("Error computing experiment summary:", error);
    return NextResponse.json({ summary: [] }, { status: 200 });
  }
}
