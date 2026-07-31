"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle2,
  RotateCcw,
  HelpCircle,
} from "lucide-react";

export interface EvidenceBlockProps {
  variant: string;
  factStatement: string;
}

export function GlanceableTrustBadge() {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div
      className="glanceable-trust-badge-wrapper"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={(e) => {
        e.stopPropagation();
        setShowTooltip(!showTooltip);
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          backgroundColor: "rgba(84, 178, 38, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--blinkit-green, #54B226)",
          cursor: "pointer",
          boxShadow: "0 1px 4px rgba(84, 178, 38, 0.15)",
          flexShrink: 0,
        }}
        aria-label="Verified Check"
      >
        <ShieldCheck size={14} fill="var(--blinkit-green, #54B226)" stroke="#FFFFFF" />
      </div>

      {showTooltip && (
        <div
          className="trust-badge-tooltip"
          style={{
            position: "absolute",
            top: "26px",
            right: 0,
            backgroundColor: "var(--blinkit-near-black, #1F1F1F)",
            color: "#FFFFFF",
            fontSize: "11px",
            fontWeight: 500,
            padding: "5px 9px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            zIndex: 30,
            animation: "fadeIn 0.15s ease-out",
            pointerEvents: "none",
          }}
        >
          Checked the same way, every time.
        </div>
      )}
    </div>
  );
}

export function BlinkitExpandableEvidenceRow({
  variant,
  factStatement,
}: EvidenceBlockProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const getRowMeta = () => {
    switch (variant) {
      case "expiry_authenticity":
        return {
          label: "Quality check details",
          icon: <ShieldCheck size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />,
        };
      case "missing_information":
        return {
          label: "Reviews since your order",
          icon: <Star size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />,
        };
      case "unresolved_support":
        return {
          label: "Your support update",
          icon: <CheckCircle2 size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />,
        };
      case "high_value_hesitation":
        return {
          label: "Replacement & protection details",
          icon: <RotateCcw size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />,
        };
      case "acknowledgment_only":
      default:
        return {
          label: "Order resolution details",
          icon: <HelpCircle size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />,
        };
    }
  };

  const meta = getRowMeta();

  return (
    <div
      className="blinkit-expandable-evidence-row"
      style={{
        backgroundColor: "var(--blinkit-white, #FFFFFF)",
        border: "1px solid var(--border-hairline, #E5E5E2)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
        margin: "12px 0",
      }}
    >
      {/* Clickable Row Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        style={{
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          userSelect: "none",
          backgroundColor: isExpanded ? "#F9F9F8" : "var(--blinkit-white, #FFFFFF)",
          transition: "background-color 0.15s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {meta.icon}
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--blinkit-near-black, #1F1F1F)",
            }}
          >
            {meta.label}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <GlanceableTrustBadge />
          {isExpanded ? (
            <ChevronUp size={18} style={{ color: "var(--text-muted, #666666)" }} />
          ) : (
            <ChevronDown size={18} style={{ color: "var(--text-muted, #666666)" }} />
          )}
        </div>
      </div>

      {/* Expanded Specific Evidence Fact Statement */}
      {isExpanded && (
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid var(--border-hairline, #E5E5E2)",
            backgroundColor: "#FAF9F8",
            fontSize: "12px",
            color: "var(--blinkit-near-black, #1F1F1F)",
            lineHeight: "18px",
          }}
        >
          <p style={{ margin: 0, fontWeight: 500 }}>{factStatement}</p>
        </div>
      )}
    </div>
  );
}

export function EvidenceBlock(props: EvidenceBlockProps) {
  return <BlinkitExpandableEvidenceRow {...props} />;
}

export default EvidenceBlock;
