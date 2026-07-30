"use client";

import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import ComplianceFactCard from "./evidence/ComplianceFactCard";
import ReviewCountCard from "./evidence/ReviewCountCard";
import TicketResolutionCard from "./evidence/TicketResolutionCard";
import ReturnPolicyCard from "./evidence/ReturnPolicyCard";
import AcknowledgmentOnlyCard from "./evidence/AcknowledgmentOnlyCard";

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
        position: "absolute",
        top: "10px",
        right: "12px",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "rgba(84, 178, 38, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--blinkit-green, #54B226)",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(84, 178, 38, 0.15)",
        }}
        aria-label="Verified Check"
      >
        <ShieldCheck size={15} fill="var(--blinkit-green, #54B226)" stroke="#FFFFFF" />
      </div>

      {showTooltip && (
        <div
          className="trust-badge-tooltip"
          style={{
            position: "absolute",
            top: "28px",
            right: 0,
            backgroundColor: "var(--blinkit-near-black, #1F1F1F)",
            color: "#FFFFFF",
            fontSize: "11px",
            fontWeight: 500,
            padding: "5px 9px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            zIndex: 20,
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

export function EvidenceBlock({ variant, factStatement }: EvidenceBlockProps) {
  const renderCard = () => {
    switch (variant) {
      case "expiry_authenticity":
        return <ComplianceFactCard factStatement={factStatement} />;
      case "missing_information":
        return <ReviewCountCard factStatement={factStatement} />;
      case "unresolved_support":
        return <TicketResolutionCard factStatement={factStatement} />;
      case "high_value_hesitation":
        return <ReturnPolicyCard factStatement={factStatement} />;
      case "acknowledgment_only":
      default:
        return <AcknowledgmentOnlyCard factStatement={factStatement} />;
    }
  };

  return (
    <div className="evidence-block-wrapper" style={{ position: "relative" }}>
      {renderCard()}
      <GlanceableTrustBadge />
    </div>
  );
}

export default EvidenceBlock;
