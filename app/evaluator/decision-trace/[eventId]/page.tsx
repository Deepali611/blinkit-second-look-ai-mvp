import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { AIDecisionTraceConsole } from "@/components/evaluator/AIDecisionTraceConsole";

export default async function DecisionTraceConsolePage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const resolvedParams = await params;
  const eventId = resolvedParams.eventId || "evt_1";

  return (
    <div className="portal-layout" style={{ backgroundColor: "var(--evaluator-bg)", minHeight: "100vh" }}>
      <BlinkitHeader variant="evaluator" backHref="/evaluator" />
      <EnvironmentBadge />

      <main className="portal-container" style={{ maxWidth: "920px", paddingBottom: "60px" }}>
        <h1 className="type-display page-header-title" style={{ fontSize: "28px", color: "#FFF", marginBottom: "8px" }}>
          AI Decision Trace & Evaluator Console
        </h1>
        <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "24px" }}>
          Full diagnostic inspection panel for event <code>{eventId}</code>. Every metric and status below originates directly from operational DB logs.
        </p>

        <AIDecisionTraceConsole eventId={eventId} />
      </main>
    </div>
  );
}
