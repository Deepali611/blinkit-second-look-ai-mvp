import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { PhoneSession } from "@/components/customer/PhoneSession";
import { SimulateOutcomeButton } from "@/components/customer/SimulateOutcomeButton";
import { METRIC_NAMES } from "@/lib/copy/canonical";

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
        <ScopeBanner variant="compact" />

        {/* Customer Phone World Container */}
        <div className="customer-phone-world-wrapper" style={{ margin: "20px 0 40px 0" }}>
          <PhoneSession eventId={eventId} initialStage={1} />
        </div>

        {/* STAGE 4 — Evaluator Handoff (Structural Separation Canvas Outside Phone Frame) */}
        <div
          className="evaluator-handoff-canvas"
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            backgroundColor: "#1F2228",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            color: "var(--blinkit-white)",
          }}
        >
          <p
            className="type-body evaluator-framing-line"
            style={{
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "22px",
              color: "var(--blinkit-white)",
              marginBottom: "20px",
              opacity: 0.95,
            }}
          >
            You've just followed the same path this customer would. What they do next is exactly what this MVP is trying to learn.
          </p>

          <div
            className="evaluator-tools-card"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h4
              className="type-h1 evaluator-panel-title"
              style={{
                fontSize: "16px",
                marginBottom: "16px",
                color: "var(--blinkit-white)",
                letterSpacing: "0.2px",
              }}
            >
              Evaluator Tools
            </h4>

            <div className="evaluator-buttons-stack" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <SimulateOutcomeButton
                eventId={eventId}
                outcomeType="same_category_repurchase"
                label="This customer buys again in this category"
                caption={"Feeds: " + METRIC_NAMES.sameCategoryReturnRate + " (operational health check)"}
              />

              <SimulateOutcomeButton
                eventId={eventId}
                outcomeType="cross_category_attempt"
                label="This customer also tries a different new category"
                caption={"Feeds: " + METRIC_NAMES.crossCategoryExplorationRate + " — the metric that actually tests Blinkit's goal"}
                isProminent={true}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
