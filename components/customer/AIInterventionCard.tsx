"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, RotateCcw, MessageSquare } from "lucide-react";

export interface AIInterventionCardProps {
  failureType?: string;
  factStatement?: string;
  isFirstCategoryVisit?: boolean;
}

export function AIInterventionCard({
  failureType = "expiry_authenticity",
  factStatement,
  isFirstCategoryVisit = false,
}: AIInterventionCardProps) {
  // 1 Headline (max 8 words)
  let headline = "Verified before you ask";
  let icon = <ShieldCheck size={18} style={{ color: "var(--blinkit-green)", flexShrink: 0 }} />;

  if (isFirstCategoryVisit) {
    headline = "Verified before you ask";
    icon = <ShieldCheck size={18} style={{ color: "var(--blinkit-green)", flexShrink: 0 }} />;
  } else {
    switch (failureType) {
      case "expiry_authenticity":
        headline = "Quality check details verified";
        icon = <CheckCircle2 size={18} style={{ color: "var(--blinkit-green)", flexShrink: 0 }} />;
        break;
      case "missing_information":
        headline = "Verified customer reviews added";
        icon = <MessageSquare size={18} style={{ color: "var(--blinkit-green)", flexShrink: 0 }} />;
        break;
      case "unresolved_support":
        headline = "Your support request resolved";
        icon = <RotateCcw size={18} style={{ color: "var(--blinkit-green)", flexShrink: 0 }} />;
        break;
      case "high_value_hesitation":
        headline = "7-day replacement guarantee active";
        icon = <ShieldCheck size={18} style={{ color: "var(--blinkit-green)", flexShrink: 0 }} />;
        break;
    }
  }

  // 1 Supporting sentence (max 15 words)
  let sentence = factStatement;
  if (!sentence) {
    switch (failureType) {
      case "expiry_authenticity":
        sentence = "Vendor passed quality verification on every order since June 15.";
        break;
      case "missing_information":
        sentence = "Over 12 verified buyers have reviewed this product since your last visit.";
        break;
      case "unresolved_support":
        sentence = "Your complaint was resolved on June 14 with a replacement reshipped.";
        break;
      case "high_value_hesitation":
        sentence = "Items in this category are eligible for 7-day hassle-free replacement.";
        break;
      default:
        sentence = "Verified operational record updated for your account peace of mind.";
        break;
    }
  }

  return (
    <div
      className="ai-intervention-card"
      style={{
        backgroundColor: "#F4F9F2",
        border: "1px solid rgba(84, 178, 38, 0.35)",
        borderRadius: "10px",
        padding: "12px 14px",
        marginTop: "12px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
      }}
    >
      <div style={{ marginTop: "1px" }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--blinkit-near-black)",
            lineHeight: "18px",
            marginBottom: "2px",
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "var(--blinkit-near-black)",
            opacity: 0.85,
            lineHeight: "16px",
          }}
        >
          {sentence}
        </div>
      </div>
    </div>
  );
}

export default AIInterventionCard;
