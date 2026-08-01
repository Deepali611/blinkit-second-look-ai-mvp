"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

export interface ConfidenceCardProps {
  failureType?: string;
  evidencePrimitive?: { variant: string; factStatement: string } | null;
  action?: "act" | "suppress";
}

export function ConfidenceCard({
  failureType = "expiry_authenticity",
  evidencePrimitive,
  action = "act",
}: ConfidenceCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // EDGE CASE 1 & 2: Hard Suppression Rule (Fail closed)
  if (
    action === "suppress" ||
    !evidencePrimitive ||
    !evidencePrimitive.factStatement ||
    evidencePrimitive.factStatement.trim() === ""
  ) {
    return null;
  }

  const rawFact = evidencePrimitive.factStatement.trim();

  // COPY TABLE — Headline Selection (max 8 words)
  let headline = "Quality checked for your order";
  let sourceReference = "Based on verified operational records";

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

  // Supporting sentence — max 15 words limit, truncated at nearest word boundary
  const words = rawFact.split(/\s+/);
  const supportingSentence =
    words.length <= 15 ? rawFact : words.slice(0, 15).join(" ") + "...";

  return (
    <div
      className="confidence-card"
      style={{
        backgroundColor: "#F4F9F2",
        border: "1px solid rgba(84, 178, 38, 0.35)",
        borderRadius: "10px",
        padding: "12px 14px",
        marginTop: "12px",
        marginBottom: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        animation: "confidenceCardFadeIn 200ms ease-out forwards",
        transition: "all 200ms ease",
      }}
    >
      {/* Collapsed Card Body */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        <CheckCircle2
          size={18}
          style={{ color: "var(--blinkit-green, #54B226)", flexShrink: 0, marginTop: "1px" }}
        />
        <div style={{ flex: 1 }}>
          {/* Headline (max 8 words) */}
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

          {/* Supporting Sentence (max 15 words) */}
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
