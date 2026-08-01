"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Store, ShieldCheck } from "lucide-react";

export interface ConfidenceCardProps {
  failureType?: string;
  evidencePrimitive?: { variant: string; factStatement: string } | null;
  action?: "act" | "suppress" | string;
  confidenceLevel?: "high" | "medium" | "low" | "below_threshold" | string;
  sellerName?: string;
  onOpenReviews?: () => void;
}

export function ConfidenceCard({
  failureType = "expiry_authenticity",
  evidencePrimitive,
  action = "act",
  confidenceLevel = "high",
  sellerName = "Appario Retail Pvt Ltd",
  onOpenReviews,
}: ConfidenceCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // BASELINE DEFAULT & SUPPRESSION RULE (Fail closed)
  if (
    action === "suppress" ||
    action === "no_action" ||
    confidenceLevel === "below_threshold" ||
    confidenceLevel === "unverified"
  ) {
    return null;
  }

  // LOW CONFIDENCE DISPLAY RULE: Seller information card only, NO AI-generated message shown
  if (confidenceLevel === "low") {
    return (
      <div
        className="confidence-card seller-only-card"
        style={{
          backgroundColor: "#F9FAFB",
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
          padding: "10px 14px",
          marginTop: "12px",
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          animation: "confidenceCardFadeIn 200ms ease-out forwards",
        }}
      >
        <Store size={18} style={{ color: "var(--text-muted, #6B7280)", flexShrink: 0 }} />
        <div style={{ flex: 1, fontSize: "12px", color: "var(--blinkit-near-black, #1F1F1F)" }}>
          Sold by verified partner <strong>{sellerName}</strong>
        </div>
        <ShieldCheck size={16} style={{ color: "var(--blinkit-green, #54B226)" }} />
      </div>
    );
  }

  // HIGH / MEDIUM CONFIDENCE DISPLAY RULE: Reassurance message + action
  if (!evidencePrimitive || !evidencePrimitive.factStatement || evidencePrimitive.factStatement.trim() === "") {
    return null;
  }

  const rawFact = evidencePrimitive.factStatement.trim();

  let headline = "Quality checked, order after order";
  let sourceReference = "Based on verified vendor compliance records";

  switch (failureType) {
    case "expiry_authenticity":
      headline = "Quality checked, order after order";
      sourceReference = "Based on verified vendor compliance records";
      break;
    case "missing_information":
      headline = "More people have reviewed this since";
      sourceReference = "Based on verified buyer reviews in this category";
      break;
    case "unresolved_support":
      headline = "Your last question, already answered";
      sourceReference = "Based on your recent support resolution record";
      break;
    case "high_value_hesitation":
      headline = "Covered if it's not right";
      sourceReference = "Based on standard category return policy";
      break;
    default:
      headline = "Quality checked for your order";
      sourceReference = "Based on verified operational records";
      break;
  }

  const words = rawFact.split(/\s+/);
  const supportingSentence =
    words.length <= 15 ? rawFact : words.slice(0, 15).join(" ") + "...";

  return (
    <div
      className="confidence-card"
      style={{
        backgroundColor: "#F4F9F2",
        border: confidenceLevel === "high" ? "1.5px solid var(--blinkit-green, #54B226)" : "1px solid rgba(84, 178, 38, 0.35)",
        borderRadius: "10px",
        padding: "12px 14px",
        marginTop: "12px",
        marginBottom: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        animation: "confidenceCardFadeIn 200ms ease-out forwards",
        transition: "all 200ms ease",
        boxShadow: confidenceLevel === "high" ? "0 2px 8px rgba(84, 178, 38, 0.12)" : "none",
      }}
    >
      {/* Collapsed Card Body */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <CheckCircle2
          size={18}
          style={{ color: "var(--blinkit-green, #54B226)", flexShrink: 0, marginTop: "1px" }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--blinkit-near-black, #1F1F1F)",
              lineHeight: "18px",
              marginBottom: "2px",
            }}
          >
            {headline}
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "var(--blinkit-near-black, #1F1F1F)",
              opacity: 0.85,
              lineHeight: "16px",
            }}
          >
            {supportingSentence}
          </div>
        </div>
      </div>

      {/* Action Specific Elements for Medium Level */}
      {confidenceLevel === "medium" && onOpenReviews && (
        <button
          type="button"
          onClick={onOpenReviews}
          style={{
            alignSelf: "flex-start",
            marginLeft: "28px",
            marginTop: "2px",
            background: "none",
            border: "none",
            color: "var(--blinkit-green, #54B226)",
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
          }}
        >
          Jump to verified customer reviews →
        </button>
      )}

      {/* Expandable Row Toggle Button */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: "none",
          border: "none",
          padding: "4px 0 0 28px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "11px",
          fontWeight: 700,
          color: "var(--blinkit-green, #54B226)",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <span>Why am I seeing this?</span>
        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {/* Expandable Details Container */}
      {isExpanded && (
        <div
          style={{
            marginTop: "6px",
            paddingTop: "8px",
            borderTop: "1px dashed rgba(84, 178, 38, 0.25)",
            paddingLeft: "28px",
            fontSize: "11px",
            color: "var(--blinkit-near-black, #1F1F1F)",
            lineHeight: "16px",
            animation: "confidenceCardFadeIn 200ms ease-out forwards",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "4px" }}>{rawFact}</div>
          <div style={{ color: "var(--text-muted, #666)", fontStyle: "italic", fontSize: "10px" }}>
            {sourceReference}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfidenceCard;
