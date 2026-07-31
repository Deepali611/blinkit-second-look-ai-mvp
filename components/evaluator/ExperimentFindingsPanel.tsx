"use client";

import React, { useState, useEffect } from "react";
import { ExperimentSummaryRow } from "@/lib/metrics/experimentSummary";
import { LoadingState } from "@/components/shared/LoadingState";
import { Sparkles, Trophy, Info } from "lucide-react";

export function ExperimentFindingsPanel() {
  const [summary, setSummary] = useState<ExperimentSummaryRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/experiments/summary");
        if (res.ok) {
          const data = await res.json();
          setSummary(data.summary || []);
        }
      } catch (err) {
        console.error("Error loading experiment summary:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: "24px", backgroundColor: "#1F2228", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
        <LoadingState message="Calculating experimentation layer findings..." />
      </div>
    );
  }

  if (!summary || summary.length === 0) {
    return (
      <div
        className="experiment-findings-empty"
        style={{
          padding: "24px",
          backgroundColor: "#1F2228",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "12px",
          color: "rgba(255, 255, 255, 0.8)",
          fontSize: "13px",
          lineHeight: "20px",
          textAlign: "center",
          fontFamily: "var(--font-inter)",
        }}
      >
        <Info size={20} style={{ color: "var(--blinkit-yellow, #F8CB45)", marginBottom: "8px" }} />
        <p style={{ margin: 0 }}>
          No experiment data yet — run a few cases through the Mission Recovery Cases trace and simulate outcomes to see results here.
        </p>
      </div>
    );
  }

  // Group summary rows by failureType
  const groupedByFailureType = new Map<string, ExperimentSummaryRow[]>();
  summary.forEach((row) => {
    if (!groupedByFailureType.has(row.failureType)) {
      groupedByFailureType.set(row.failureType, []);
    }
    groupedByFailureType.get(row.failureType)!.push(row);
  });

  const getHumanFailureType = (type: string) => {
    switch (type) {
      case "expiry_authenticity":
        return "Quality / Expiry Hesitation";
      case "missing_information":
        return "Missing Product Information";
      case "unresolved_support":
        return "Unresolved Support Record";
      case "high_value_hesitation":
        return "High Value Category Hesitation";
      default:
        return type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }
  };

  return (
    <div
      className="experiment-findings-panel"
      style={{
        backgroundColor: "#1F2228",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "12px",
        padding: "24px",
        color: "var(--blinkit-white, #FFFFFF)",
        fontFamily: "var(--font-inter)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Top Persistent Caption */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          backgroundColor: "rgba(248, 203, 69, 0.08)",
          border: "1px solid rgba(248, 203, 69, 0.25)",
          borderRadius: "8px",
          padding: "12px 14px",
          marginBottom: "20px",
          fontSize: "12px",
          lineHeight: "18px",
          color: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Sparkles size={16} style={{ color: "var(--blinkit-yellow, #F8CB45)", flexShrink: 0, marginTop: "1px" }} />
        <div>
          <strong>Directional only at this sample size — not statistically conclusive.</strong> This shows the mechanism is running, not a finished result.
        </div>
      </div>

      {/* Grouped Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {Array.from(groupedByFailureType.entries()).map(([fType, rows]) => {
          // Find max non-null rate for "Leading" badge
          let maxRate: number | null = null;
          rows.forEach((r) => {
            if (r.rate !== null) {
              if (maxRate === null || r.rate > maxRate) {
                maxRate = r.rate;
              }
            }
          });

          return (
            <div
              key={fType}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: "0 0 12px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{getHumanFailureType(fType)}</span>
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {rows.map((row, idx) => {
                  const isLeading =
                    maxRate !== null &&
                    row.rate !== null &&
                    row.rate === maxRate &&
                    row.notifiedCount > 0;

                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        borderRadius: "6px",
                        padding: "10px 14px",
                        fontSize: "13px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontWeight: 600, color: "#FFFFFF" }}>{row.variant}</span>
                        {isLeading && (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "3px",
                              backgroundColor: "rgba(84, 178, 38, 0.2)",
                              color: "var(--blinkit-green, #54B226)",
                              border: "1px solid rgba(84, 178, 38, 0.4)",
                              borderRadius: "12px",
                              padding: "2px 8px",
                              fontSize: "10px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                            }}
                          >
                            <Trophy size={10} />
                            Leading
                          </span>
                        )}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
                          ({row.positiveOutcomeCount}/{row.notifiedCount})
                        </span>
                        <span
                          style={{
                            fontWeight: 700,
                            color:
                              row.rate !== null
                                ? "var(--blinkit-green, #54B226)"
                                : "rgba(255, 255, 255, 0.5)",
                          }}
                        >
                          {row.rate !== null
                            ? `${(row.rate * 100).toFixed(1)}%`
                            : "Not enough data yet"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExperimentFindingsPanel;
