import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { PhoneSession } from "@/components/customer/PhoneSession";
import { AIReasoningStrip } from "@/components/evaluator/AIReasoningStrip";
import { MeasureResultPanel } from "@/components/evaluator/MeasureResultPanel";

export default async function NotificationSimulationPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const resolvedParams = await params;
  const eventId = resolvedParams.eventId;

  return (
    <div className="portal-layout" style={{ backgroundColor: "var(--evaluator-bg)", minHeight: "100vh" }}>
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container" style={{ paddingBottom: "60px" }}>
        {/* Customer Phone World Container */}
        <div className="customer-phone-world-wrapper" style={{ margin: "20px 0 40px 0" }}>
          <PhoneSession eventId={eventId} initialStage={1} />
        </div>

        {/* Task 28: Condensed AI Reasoning Strip */}
        <AIReasoningStrip eventId={eventId} />

        {/* Task 25: Measure the Result Panel */}
        <MeasureResultPanel eventId={eventId} />
      </main>
    </div>
  );
}
