"use client";

import React from "react";
import { Activity } from "lucide-react";

export interface OutcomeData {
  outcomeType: string;
  loggedAt: string;
}

export interface CustomerOutcomePanelProps {
  outcome: OutcomeData | null;
}

export function CustomerOutcomePanel({ outcome }: CustomerOutcomePanelProps) {
  if (!outcome) {
    return null;
  }

  const getHumanReadableType = (type: string) => {
    switch (type) {
      case "same_category_repurchase":
        return "returned to same category";
      case "cross_category_attempt":
        return "explored a different new category";
      case "dismissed":
        return "no response";
      default:
        return type;
    }
  };

  const formattedDate = new Date(outcome.loggedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="customer-outcome-panel-card"
      style={{
        backgroundColor: "rgba(84, 178, 38, 0.1)",
        border: "1px solid rgba(84, 178, 38, 0.3)",
        borderRadius: "12px",
        padding: "14px 18px",
        marginTop: "20px",
        marginBottom: "20px",
        color: "var(--blinkit-white, #FFFFFF)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontFamily: "var(--font-inter)",
      }}
    >
      <Activity size={18} style={{ color: "var(--blinkit-green, #54B226)", flexShrink: 0 }} />
      <div style={{ fontSize: "13px", lineHeight: "18px" }}>
        <strong>Customer outcome recorded:</strong>{" "}
        <span style={{ color: "var(--blinkit-green, #54B226)", fontWeight: 700 }}>
          {getHumanReadableType(outcome.outcomeType)}
        </span>
        , logged {formattedDate}
      </div>
    </div>
  );
}

export default CustomerOutcomePanel;
