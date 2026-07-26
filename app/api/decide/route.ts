import { NextRequest, NextResponse } from "next/server";
import { makeDecision } from "@/lib/decision/decide";
import { getTreatmentGroupForEvent } from "@/lib/db/decisionLogs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, failureType, confidence, verificationStatus, evidenceData } = body;

    if (eventId === undefined || eventId === null || eventId === "") {
      return NextResponse.json(
        { error: "missing_upstream_field", field: "eventId" },
        { status: 400 }
      );
    }

    if (failureType === undefined || failureType === null || failureType === "") {
      return NextResponse.json(
        { error: "missing_upstream_field", field: "failureType" },
        { status: 400 }
      );
    }

    if (confidence === undefined || confidence === null || confidence === "") {
      return NextResponse.json(
        { error: "missing_upstream_field", field: "confidence" },
        { status: 400 }
      );
    }

    if (verificationStatus === undefined || verificationStatus === null || verificationStatus === "") {
      return NextResponse.json(
        { error: "missing_upstream_field", field: "verificationStatus" },
        { status: 400 }
      );
    }

    if (evidenceData === undefined) {
      return NextResponse.json(
        { error: "missing_upstream_field", field: "evidenceData" },
        { status: 400 }
      );
    }

    const result = makeDecision(
      eventId,
      failureType,
      confidence,
      verificationStatus,
      evidenceData
    );

    const treatmentGroup = getTreatmentGroupForEvent(eventId, result.action);

    return NextResponse.json({ ...result, treatmentGroup }, { status: 200 });
  } catch (error) {
    console.error("Error processing decision request:", error);
    return NextResponse.json(
      { error: "decision_failed" },
      { status: 500 }
    );
  }
}
