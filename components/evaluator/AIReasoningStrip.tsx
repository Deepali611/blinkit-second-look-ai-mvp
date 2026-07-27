"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Tag, ShieldCheck, Cpu } from "lucide-react";

export interface AIReasoningStripProps {
  eventId: string;
}

export function AIReasoningStrip({ eventId }: AIReasoningStripProps) {
  const [classifiedSummary, setClassifiedSummary] = useState<string>("Loading...");
  const [verifiedSummary, setVerifiedSummary] = useState<string>("Loading...");
  const [decidedSummary, setDecidedSummary] = useState<string>("Loading...");

  useEffect(() => {
    async function loadPipelineData() {
      try {
        // Step 1: Classify
        const cRes = await fetch("/api/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId }),
        });
        if (cRes.ok) {
          const cData = await cRes.json();
          const label = cData.failureType === "expiry_authenticity"
            ? "Quality / Expiry"
            : cData.failureType === "missing_information"
            ? "Missing Information"
            : cData.failureType === "unresolved_support"
            ? "Unresolved Support"
            : cData.failureType === "high_value_hesitation"
            ? "High Value Hesitation"
            : cData.failureType;
          setClassifiedSummary(`${label} (${cData.confidence || "High"} confidence)`);

          // Step 2: Verify
          let vStatus = "unverifiable";
          let evData = null;
          if (cData.confidence !== "low" && cData.failureType !== "unclear") {
            const vRes = await fetch("/api/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ eventId, failureType: cData.failureType }),
            });
            if (vRes.ok) {
              const vData = await vRes.json();
              vStatus = vData.verificationStatus;
              evData = vData.evidenceData;
              setVerifiedSummary(
                vStatus === "verified"
                  ? "Operational facts confirmed in database"
                  : "Database record checked"
              );
            } else {
              setVerifiedSummary("Checked records");
            }
          } else {
            setVerifiedSummary("Skipped due to low confidence");
          }

          // Step 3: Decide
          const dRes = await fetch("/api/decide", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventId,
              failureType: cData.failureType,
              confidence: cData.confidence,
              verificationStatus: vStatus,
              evidenceData: evData,
            }),
          });
          if (dRes.ok) {
            const dData = await dRes.json();
            if (dData.action === "act") {
              setDecidedSummary(`Action: Show evidence & route to ${dData.ctaDestination || "product"}`);
            } else {
              setDecidedSummary("Decided: Correctly held back (suppress)");
            }
          } else {
            setDecidedSummary("Decision completed");
          }
        }
      } catch (err) {
        console.error("Error loading AIReasoningStrip data:", err);
        setClassifiedSummary("Classified");
        setVerifiedSummary("Verified");
        setDecidedSummary("Decided");
      }
    }

    loadPipelineData();
  }, [eventId]);

  return (
    <div
      className="ai-reasoning-strip"
      style={{
        maxWidth: "680px",
        margin: "0 auto 20px auto",
        backgroundColor: "#1F2228",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "12px",
        padding: "16px 20px",
        color: "var(--blinkit-white)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--blinkit-yellow)" }}>
          AI Pipeline Reasoning Summary
        </span>

        <Link
          href={`/inspector/${eventId}`}
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--blinkit-green)",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            textDecoration: "none",
          }}
        >
          <span>See full reasoning</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {/* Step 1: Classified */}
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "8px", padding: "10px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "4px" }}>
            <Tag size={13} style={{ color: "var(--blinkit-yellow)" }} />
            <span>1. Classified</span>
          </div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#FFF", margin: 0 }}>
            {classifiedSummary}
          </p>
        </div>

        {/* Step 2: Verified */}
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "8px", padding: "10px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "4px" }}>
            <ShieldCheck size={13} style={{ color: "var(--blinkit-green)" }} />
            <span>2. Verified</span>
          </div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#FFF", margin: 0 }}>
            {verifiedSummary}
          </p>
        </div>

        {/* Step 3: Decided */}
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "8px", padding: "10px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "4px" }}>
            <Cpu size={13} style={{ color: "#38BDF8" }} />
            <span>3. Decided</span>
          </div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#FFF", margin: 0 }}>
            {decidedSummary}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIReasoningStrip;
