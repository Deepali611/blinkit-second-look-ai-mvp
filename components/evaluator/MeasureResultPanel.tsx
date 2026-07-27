"use client";

import React, { useState } from "react";
import { METRIC_NAMES } from "@/lib/copy/canonical";
import { CheckCircle2, AlertCircle } from "lucide-react";

export interface MeasureResultPanelProps {
  eventId: string;
  productName?: string;
}

export function MeasureResultPanel({
  eventId,
  productName = "boAt Airdopes 141 TWS Earbuds",
}: MeasureResultPanelProps) {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [revealStep, setRevealStep] = useState<"hidden" | "time_passage" | "complete">("hidden");
  const [metricReadout, setMetricReadout] = useState<string | null>(null);

  const handleSimulate = async (outcomeType: "same_category_repurchase" | "cross_category_attempt" | "dismissed") => {
    setActiveSimulation(outcomeType);
    setIsLoading(true);
    setRevealStep("time_passage");
    setMetricReadout(null);

    // 1. Fetch initial metrics before logging
    let oldMetrics = { sameCategoryRate: 0.65, crossCategoryRate: 0.42, sameNumerator: 13, sameDenominator: 20, crossNumerator: 8, crossDenominator: 20 };
    try {
      const res = await fetch("/api/metrics");
      if (res.ok) {
        const data = await res.json();
        if (data.metrics) {
          oldMetrics = {
            sameCategoryRate: data.metrics.sameCategoryReturnRate || 0,
            crossCategoryRate: data.metrics.crossCategoryExplorationRate || 0,
            sameNumerator: data.raw?.sameCategoryRepurchases || 13,
            sameDenominator: data.raw?.totalInterventions || 20,
            crossNumerator: data.raw?.crossCategoryAttempts || 8,
            crossDenominator: data.raw?.totalInterventions || 20,
          };
        }
      }
    } catch (e) {
      console.error("Error fetching initial metrics:", e);
    }

    // 2. Brief time-passage reveal delay (600ms)
    setTimeout(async () => {
      setRevealStep("complete");

      // 3. Post outcome to API
      try {
        await fetch("/api/outcome", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, outcomeType }),
        });

        // 4. Fetch updated metrics after logging
        const res2 = await fetch("/api/metrics");
        if (res2.ok) {
          const data2 = await res2.json();
          const newRaw = data2.raw || {};

          if (outcomeType === "same_category_repurchase") {
            const oldNum = oldMetrics.sameNumerator;
            const oldDen = oldMetrics.sameDenominator;
            const newNum = newRaw.sameCategoryRepurchases ?? (oldNum + 1);
            const newDen = newRaw.totalInterventions ?? oldDen;
            setMetricReadout(
              `${METRIC_NAMES.sameCategoryReturnRate}: ${oldNum}/${oldDen} → ${newNum}/${newDen}`
            );
          } else if (outcomeType === "cross_category_attempt") {
            const oldNum = oldMetrics.crossNumerator;
            const oldDen = oldMetrics.crossDenominator;
            const newNum = newRaw.crossCategoryAttempts ?? (oldNum + 1);
            const newDen = newRaw.totalInterventions ?? oldDen;
            setMetricReadout(
              `${METRIC_NAMES.crossCategoryExplorationRate}: ${oldNum}/${oldDen} → ${newNum}/${newDen}`
            );
          } else {
            setMetricReadout(null);
          }
        }
      } catch (err) {
        console.error("Error updating outcome:", err);
      } finally {
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div
      className="measure-result-panel"
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
      <h3
        className="type-h1 panel-title"
        style={{
          fontSize: "18px",
          fontWeight: 700,
          marginBottom: "12px",
          color: "var(--blinkit-white)",
        }}
      >
        Measure the Result
      </h3>

      <p
        className="type-body panel-framing-line"
        style={{
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: "22px",
          color: "rgba(255, 255, 255, 0.9)",
          marginBottom: "10px",
        }}
      >
        Once this recovery experience is delivered, Blinkit sends nothing further. No follow-up, no reminder — per Second Look's design, one message only. Over the following weeks, Blinkit simply observes: does this customer return to this category, explore a different one, or do neither? Simulate a possible outcome below to see how that observation becomes measurement.
      </p>

      <p
        className="type-body-sm panel-subtitle"
        style={{
          fontSize: "12px",
          color: "rgba(255, 255, 255, 0.55)",
          marginBottom: "24px",
          fontStyle: "italic",
        }}
      >
        These buttons simulate future customer behavior for demonstration purposes — real customers never see this panel.
      </p>

      {/* Outcome Simulation Buttons Stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSimulate("same_category_repurchase")}
          style={{
            padding: "14px 18px",
            backgroundColor: activeSimulation === "same_category_repurchase" ? "rgba(84, 178, 38, 0.2)" : "rgba(255, 255, 255, 0.06)",
            border: activeSimulation === "same_category_repurchase" ? "1.5px solid var(--blinkit-green)" : "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "10px",
            color: "var(--blinkit-white)",
            fontSize: "14px",
            fontWeight: 600,
            textAlign: "left",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Simulate: Returns to this category
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSimulate("cross_category_attempt")}
          style={{
            padding: "14px 18px",
            backgroundColor: activeSimulation === "cross_category_attempt" ? "rgba(84, 178, 38, 0.2)" : "rgba(255, 255, 255, 0.06)",
            border: activeSimulation === "cross_category_attempt" ? "1.5px solid var(--blinkit-green)" : "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "10px",
            color: "var(--blinkit-white)",
            fontSize: "14px",
            fontWeight: 600,
            textAlign: "left",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Simulate: Explores a different new category
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSimulate("dismissed")}
          style={{
            padding: "14px 18px",
            backgroundColor: activeSimulation === "dismissed" ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.06)",
            border: activeSimulation === "dismissed" ? "1.5px solid rgba(255, 255, 255, 0.4)" : "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "10px",
            color: "var(--blinkit-white)",
            fontSize: "14px",
            fontWeight: 600,
            textAlign: "left",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Simulate: No response
        </button>
      </div>

      {/* Reveal & Metric Readout Block */}
      {revealStep !== "hidden" && (
        <div
          className="time-passage-reveal-card"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "12px",
            padding: "18px 20px",
            marginBottom: "24px",
            transition: "opacity 0.2s ease",
            opacity: revealStep === "time_passage" ? 0.6 : 1,
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--blinkit-green)", letterSpacing: "0.5px", marginBottom: "6px" }}>
            14 days later...
          </div>

          {revealStep === "complete" && (
            <>
              {activeSimulation === "same_category_repurchase" && (
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 6px 0", color: "#FFF" }}>
                    Customer repurchased: {productName} (Same Category)
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--blinkit-green)", fontWeight: 700, fontSize: "13px" }}>
                    <CheckCircle2 size={16} />
                    <span>✓ Same-Category Return Recorded</span>
                  </div>
                </div>
              )}

              {activeSimulation === "cross_category_attempt" && (
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 6px 0", color: "#FFF" }}>
                    Customer purchased: Minimalist Niacinamide Serum (New Category)
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--blinkit-green)", fontWeight: 700, fontSize: "13px" }}>
                    <CheckCircle2 size={16} />
                    <span>✓ Cross-Category Exploration Recorded</span>
                  </div>
                </div>
              )}

              {activeSimulation === "dismissed" && (
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 6px 0", color: "rgba(255, 255, 255, 0.8)" }}>
                    No purchase activity detected
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255, 255, 255, 0.6)", fontWeight: 600, fontSize: "13px" }}>
                    <AlertCircle size={16} />
                    <span>No behavioral signal recorded</span>
                  </div>
                </div>
              )}

              {metricReadout && (
                <div
                  style={{
                    marginTop: "14px",
                    paddingTop: "12px",
                    borderTop: "1px stroke rgba(255, 255, 255, 0.1)",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "var(--blinkit-yellow)",
                  }}
                >
                  {metricReadout}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Bottom Process Chain Footer Line */}
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.6px",
          color: "rgba(255, 255, 255, 0.4)",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: "16px",
        }}
      >
        Bad first experience → Second Look → trust restored → behavior observed → metrics updated.
      </div>
    </div>
  );
}

export default MeasureResultPanel;
