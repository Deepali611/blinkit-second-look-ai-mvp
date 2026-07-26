import { NextResponse } from "next/server";
import { computeMetrics } from "@/lib/metrics/compute";

export async function GET() {
  try {
    const metrics = computeMetrics();
    return NextResponse.json(metrics, { status: 200 });
  } catch (error) {
    console.error("Error computing metrics:", error);
    return NextResponse.json(
      { error: "failed_to_compute_metrics" },
      { status: 500 }
    );
  }
}
