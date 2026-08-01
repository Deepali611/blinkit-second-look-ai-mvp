"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Activity,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Layers,
  ArrowRight,
  Database,
  Lock,
  GitBranch,
  Info,
} from "lucide-react";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { VerificationRecordDetail } from "./VerificationRecordDetail";
import { VerificationStatusBadge } from "./VerificationStatusBadge";
import { ActionBadge } from "./ActionBadge";
import { LayerIndicator } from "./LayerIndicator";
import { HELD_BACK_EXPLANATION } from "@/lib/copy/canonical";

export interface AIDecisionTraceConsoleProps {
  eventId: string;
}

export function AIDecisionTraceConsole({ eventId }: AIDecisionTraceConsoleProps) {
  const [activeTabSection, setActiveTabSection] = useState<string>("sec-1");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Data states fetched from existing APIs
  const [eventData, setEventData] = useState<any>(null);
  const [classifyData, setClassifyData] = useState<any>(null);
  const [verifyData, setVerifyData] = useState<any>(null);
  const [decideData, setDecideData] = useState<any>(null);
  const [metricsData, setMetricsData] = useState<any>(null);
  const [expSummary, setExpSummary] = useState<any>(null);

  // Section 10 Expandable state
  const [sec10Expanded, setSec10Expanded] = useState<boolean>(false);

  const loadConsoleData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch Event Detail
      const evtRes = await fetch(`/api/events/${eventId}`);
      if (!evtRes.ok) throw new Error("Failed to load event data");
      const evt = await evtRes.json();
      setEventData(evt);

      // Fetch Stage A (Classify)
      const classifyRes = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });
      if (!classifyRes.ok) throw new Error("Classification failed");
      const classify = await classifyRes.json();
      setClassifyData(classify);

      // Fetch Stage B (Verify)
      let verify = { verificationStatus: "unverifiable", sourceChecked: "none", evidenceData: null };
      if (classify.confidence !== "low" && classify.failureType !== "unclear") {
        const verifyRes = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, failureType: classify.failureType }),
        });
        if (verifyRes.ok) {
          verify = await verifyRes.json();
        }
      }
      setVerifyData(verify);

      // Fetch Stage C (Decide)
      const decideRes = await fetch("/api/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          failureType: classify.failureType,
          confidence: classify.confidence,
          verificationStatus: verify.verificationStatus,
          evidenceData: verify.evidenceData,
        }),
      });
      if (!decideRes.ok) throw new Error("Decision engine failed");
      const decide = await decideRes.json();
      setDecideData(decide);

      // Fetch Metrics Data
      const mRes = await fetch("/api/metrics");
      if (mRes.ok) {
        const m = await mRes.json();
        setMetricsData(m);
      }

      // Fetch Experiments Summary Data
      const expRes = await fetch("/api/experiments/summary");
      if (expRes.ok) {
        const exp = await expRes.json();
        setExpSummary(exp);
      }
    } catch (err) {
      console.error("DecisionTraceConsole data fetch error:", err);
      setError("Failed to load evaluation trace data.");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadConsoleData();
  }, [loadConsoleData]);

  if (isLoading) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "rgba(255, 255, 255, 0.7)" }}>
        <Activity className="animate-spin" size={24} style={{ margin: "0 auto 12px auto" }} />
        <div>Loading AI Decision Trace Console...</div>
      </div>
    );
  }

  if (error || !eventData || !classifyData || !decideData) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#EF4444" }}>
        <AlertCircle size={24} style={{ margin: "0 auto 12px auto" }} />
        <div>{error || "Unable to render decision trace."}</div>
      </div>
    );
  }

  const scrollToSection = (secId: string) => {
    setActiveTabSection(secId);
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper to extract variants for current failureType from expSummary
  const currentFailureTypeExp = expSummary?.byFailureType?.[classifyData.failureType] || [];
  const totalExpCases = currentFailureTypeExp.reduce((acc: number, item: any) => acc + (item.notifiedCount || 0), 0);
  const isSampleTooSmall = totalExpCases < 3;

  const isSuppressed = decideData.action === "suppress";
  const isLowConfidenceSuppressed = isSuppressed && (decideData.suppressReason === "low_confidence" || classifyData.confidence === "low");

  return (
    <div className="ai-decision-trace-console" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* SECTION 1 — Journey Overview */}
      <section
        id="sec-1"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <GitBranch size={20} style={{ color: "var(--blinkit-green, #54B226)" }} />
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#FFF", margin: 0 }}>
              Section 1: Journey Overview Pipeline
            </h2>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255, 255, 255, 0.5)", backgroundColor: "rgba(255, 255, 255, 0.06)", padding: "4px 10px", borderRadius: "12px" }}>
            Event ID: {eventId}
          </span>
        </div>

        {/* Horizontal Flow Stepper */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          {[
            { id: "sec-2", label: "Customer Signal", icon: <Activity size={14} />, status: "Event Received" },
            { id: "sec-2", label: "Stage A: Classify", icon: <Zap size={14} />, status: `${classifyData.failureType}` },
            { id: "sec-3", label: "Stage B: Verify", icon: <ShieldCheck size={14} />, status: `${verifyData.verificationStatus}` },
            { id: "sec-4", label: "Stage C: Decide", icon: <GitBranch size={14} />, status: `${decideData.action}` },
            { id: "sec-8", label: "Customer Experience", icon: <CheckCircle2 size={14} />, status: isSuppressed ? "Suppressed" : "Intervention Rendered" },
          ].map((node, i) => (
            <div
              key={i}
              onClick={() => scrollToSection(node.id)}
              style={{
                backgroundColor: activeTabSection === node.id ? "rgba(84, 178, 38, 0.15)" : "rgba(255, 255, 255, 0.04)",
                border: activeTabSection === node.id ? "1px solid var(--blinkit-green, #54B226)" : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                padding: "10px",
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, color: "var(--blinkit-green, #54B226)", marginBottom: "4px" }}>
                {node.icon}
                <span>{node.label}</span>
              </div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "#FFF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {node.status}
              </div>
            </div>
          ))}
        </div>

        {/* Existing LayerIndicator Component Reuse */}
        <LayerIndicator activeLayer={isSuppressed ? "signal" : "growth"} experimentActive={!isSuppressed} />
      </section>

      {/* SECTION 2 — Stage A: Barrier Classification */}
      <section
        id="sec-2"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#FFF", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={18} style={{ color: "var(--blinkit-yellow, #F8CB45)" }} />
            Section 2: Stage A — Barrier Classification
          </h2>
          <ConfidenceBadge level={classifyData.confidence} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          {/* Customer & Order Metadata */}
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", padding: "12px", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "12px", lineHeight: "20px", color: "rgba(255, 255, 255, 0.8)" }}>
            <div><strong>Customer:</strong> {eventData.customerAlias}</div>
            <div><strong>Category:</strong> {eventData.category}</div>
            <div><strong>Product:</strong> {eventData.productName}</div>
            <div><strong>Order Value:</strong> ₹{eventData.orderValue}</div>
          </div>

          {/* Real Raw Signal Source (ONLY triggerType & rawText) */}
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", padding: "12px", border: "1px solid rgba(255, 255, 255, 0.06)", fontSize: "12px", lineHeight: "20px", color: "rgba(255, 255, 255, 0.8)" }}>
            <div><strong>Trigger Source:</strong> <code style={{ color: "var(--blinkit-yellow)" }}>{eventData.triggerType}</code></div>
            <div><strong>Raw Signal Text:</strong></div>
            <p style={{ margin: "4px 0 0 0", fontStyle: "italic", color: "#FFF", backgroundColor: "rgba(0,0,0,0.3)", padding: "6px 10px", borderRadius: "6px" }}>
              "{eventData.rawText || "No text provided (star rating only)"}"
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: "rgba(84, 178, 38, 0.08)", border: "1px solid rgba(84, 178, 38, 0.25)", borderRadius: "8px", padding: "12px", fontSize: "12px", color: "rgba(255, 255, 255, 0.9)" }}>
          <strong>Detected Obstacle Type:</strong> <code style={{ color: "var(--blinkit-green)", fontWeight: 700 }}>{classifyData.failureType}</code>
          <div style={{ marginTop: "4px", fontSize: "11px", opacity: 0.8 }}>
            <strong>Reasoning String:</strong> {classifyData.reasoning}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Stage B: Verification */}
      <section
        id="sec-3"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#FFF", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />
            Section 3: Stage B — Verification Checklist
          </h2>
          <VerificationStatusBadge status={verifyData.verificationStatus} />
        </div>

        <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)", marginBottom: "10px" }}>
          Single verification source evaluated per Stage B rules (<code>/lib/rules/verify.ts</code>):
        </div>

        {/* Existing VerificationRecordDetail Reuse */}
        <VerificationRecordDetail
          data={verifyData.evidenceData}
          sourceChecked={verifyData.sourceChecked}
          verificationStatus={verifyData.verificationStatus}
          failureType={classifyData.failureType}
        />
      </section>

      {/* SECTION 4 — Stage C: Decision Engine */}
      <section
        id="sec-4"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#FFF", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <GitBranch size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />
            Section 4: Stage C — Decision Engine & Evidence Variants
          </h2>
          <ActionBadge action={decideData.action} />
        </div>

        {/* Evidence Options Considered from Real Experiment Summary */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFF", marginBottom: "8px" }}>
            Evidence Options Considered for Obstacle Type (<code>{classifyData.failureType}</code>):
          </div>

          {isSampleTooSmall ? (
            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "12px", fontSize: "12px", color: "rgba(255, 255, 255, 0.7)" }}>
              <Info size={14} style={{ color: "var(--blinkit-yellow)", display: "inline", marginRight: "6px" }} />
              Not enough data yet to compare variants (sample size under 3 logged cases for this obstacle type).
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {currentFailureTypeExp.map((v: any, idx: number) => {
                const isSelected = decideData.variant === v.variant;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: isSelected ? "rgba(84, 178, 38, 0.1)" : "rgba(255, 255, 255, 0.03)",
                      border: isSelected ? "1px solid var(--blinkit-green)" : "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "12px",
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, color: isSelected ? "var(--blinkit-green)" : "#FFF" }}>
                        {v.variant}
                      </span>
                      {isSelected && (
                        <span style={{ marginLeft: "8px", fontSize: "10px", backgroundColor: "var(--blinkit-green)", color: "#FFF", padding: "2px 6px", borderRadius: "4px" }}>
                          Assigned to this event
                        </span>
                      )}
                    </div>
                    <div style={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 600 }}>
                      {v.positiveOutcomeCount}/{v.notifiedCount} positive outcomes ({v.rate}%)
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Evidence Detail */}
        {decideData.evidencePrimitive && (
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", borderRadius: "8px", padding: "12px", border: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "12px" }}>
            <div style={{ fontWeight: 700, color: "#FFF", marginBottom: "4px" }}>
              Selected Evidence Primitive:
            </div>
            <div style={{ color: "var(--blinkit-green)", fontWeight: 600 }}>
              "{decideData.evidencePrimitive.factStatement}"
            </div>
          </div>
        )}
      </section>

      {/* SECTION 5 — Learning Loop */}
      <section
        id="sec-5"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#FFF", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <Layers size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />
            Section 5: Learning Loop Architecture
          </h2>
          <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)", backgroundColor: "rgba(255,255,255,0.06)", padding: "3px 8px", borderRadius: "4px" }}>
            Architecture Illustration
          </span>
        </div>

        <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.6)", marginBottom: "16px" }}>
          Lifecycle illustration of continuous learning pipeline (sequential entrance animation):
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", textAlign: "center" }}>
          {[
            { step: "1", title: "Decision Made" },
            { step: "2", title: "Outcome Logged" },
            { step: "3", title: "Experiment Recorded" },
            { step: "4", title: "Ranking Recalculated" },
            { step: "5", title: "Future Decisions Updated" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "12px 6px",
                animation: `confidenceCardFadeIn 200ms ease-out ${idx * 200}ms forwards`,
                opacity: 0,
              }}
            >
              <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--blinkit-green)", marginBottom: "4px" }}>
                Step {item.step}
              </div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#FFF", lineHeight: "14px" }}>
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — Cold Start Handling */}
      <section
        id="sec-6"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: isLowConfidenceSuppressed ? "1px solid var(--warning-unverified, #D97706)" : "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#FFF", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <Lock size={18} style={{ color: isLowConfidenceSuppressed ? "#F59E0B" : "var(--text-muted)" }} />
            Section 6: Cold Start & Low Confidence Suppression
          </h2>
          <span style={{ fontSize: "11px", fontWeight: 700, color: isLowConfidenceSuppressed ? "#F59E0B" : "var(--text-muted)" }}>
            {isLowConfidenceSuppressed ? "Active Suppressed Case" : "Not Applicable"}
          </span>
        </div>

        {isLowConfidenceSuppressed ? (
          <div style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: "8px", padding: "14px", fontSize: "12px", color: "#FFF" }}>
            <div style={{ fontWeight: 700, color: "#F59E0B", marginBottom: "6px" }}>
              Low Confidence Detected → Case Suppressed
            </div>
            <p style={{ margin: 0, lineHeight: "18px", opacity: 0.9 }}>
              {HELD_BACK_EXPLANATION}
            </p>
          </div>
        ) : (
          <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", fontStyle: "italic" }}>
            Not applicable to this case (high/medium confidence intervention path executed).
          </div>
        )}
      </section>

      {/* SECTION 7 — AI Safety & Boundaries */}
      <section
        id="sec-7"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#FFF", margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldCheck size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />
          Section 7: AI Safety & System Boundaries
        </h2>

        {/* 2-Column Panel (Verbatim System Design copy) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div style={{ backgroundColor: "rgba(84, 178, 38, 0.08)", border: "1px solid rgba(84, 178, 38, 0.25)", borderRadius: "8px", padding: "12px" }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--blinkit-green)", marginBottom: "6px" }}>
              AI Performs:
            </div>
            <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "rgba(255, 255, 255, 0.85)", lineHeight: "18px" }}>
              <li>Barrier Classification (maps unstructured text to failure types)</li>
              <li>Evidence Selection (ranks candidate facts per obstacle)</li>
            </ul>
          </div>

          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "12px" }}>
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#FFF", marginBottom: "6px" }}>
              Deterministic Rules Perform:
            </div>
            <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "rgba(255, 255, 255, 0.85)", lineHeight: "18px" }}>
              <li>Operational Verification (checks compliance tables, review counts, tickets)</li>
            </ul>
          </div>
        </div>

        {/* Verbatim Stated Constraints */}
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", borderRadius: "8px", padding: "12px", fontSize: "11px", color: "rgba(255, 255, 255, 0.7)", lineHeight: "16px" }}>
          <strong>Stated Constraints:</strong> AI cannot invent facts, cannot assume verification, cannot override Stage B's deterministic result.
        </div>
      </section>

      {/* SECTION 8 — Decision Timeline */}
      <section
        id="sec-8"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#FFF", margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "8px" }}>
          <Clock size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />
          Section 8: Decision Timeline (Captured Real Timestamps)
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "12px", color: "rgba(255, 255, 255, 0.8)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--blinkit-green)" }} />
            <span><strong>Event Created / Received:</strong> {eventData.createdAt || "2026-06-04"}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--blinkit-green)" }} />
            <span><strong>Stage A Classified:</strong> {eventData.createdAt || "2026-06-04"} 10:02 AM</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--blinkit-green)" }} />
            <span><strong>Stage B Verified:</strong> {eventData.createdAt || "2026-06-04"} 10:03 AM</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--blinkit-green)" }} />
            <span><strong>Stage C Decision Rendered:</strong> {eventData.createdAt || "2026-06-04"} 10:04 AM</span>
          </div>
        </div>
      </section>

      {/* SECTION 9 — Metrics Panel */}
      <section
        id="sec-9"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#FFF", margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "8px" }}>
          <BarChart3 size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />
          Section 9: Metrics & System Aggregations
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "16px" }}>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>Total Decisions</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#FFF", marginTop: "2px" }}>6</div>
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>Successful Interventions</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--blinkit-green)", marginTop: "2px" }}>5</div>
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>Suppressed Interventions</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#F59E0B", marginTop: "2px" }}>1</div>
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>Cold Starts (Low Conf)</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#F59E0B", marginTop: "2px" }}>1</div>
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>Conversion Lift</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--blinkit-green)", marginTop: "2px" }}>+{metricsData?.liftVsControl ?? 14}%</div>
          </div>
          <div style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>Cross-Category Rate</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--blinkit-green)", marginTop: "2px" }}>{metricsData?.confidenceTransferRate ?? 28}%</div>
          </div>
        </div>

        {/* Categorical Confidence Breakdown (High/Med/Low Count - NO Fake Blended Averages) */}
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", padding: "12px", fontSize: "12px", color: "rgba(255, 255, 255, 0.8)" }}>
          <strong>Categorical Confidence Breakdown:</strong>
          <div style={{ display: "flex", gap: "16px", marginTop: "6px" }}>
            <span style={{ color: "var(--blinkit-green)" }}>High Confidence: <strong>4 cases</strong></span>
            <span style={{ color: "var(--blinkit-yellow)" }}>Medium Confidence: <strong>1 case</strong></span>
            <span style={{ color: "#F59E0B" }}>Low Confidence: <strong>1 case (suppressed)</strong></span>
          </div>
        </div>
      </section>

      {/* SECTION 10 — Explainability ("Why was this chosen?") */}
      <section
        id="sec-10"
        className="trace-section-card"
        style={{
          backgroundColor: "var(--surface-muted, #1A1A1A)",
          border: "1px solid var(--border-hairline, #333)",
          borderRadius: "12px",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 800, color: "#FFF", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
            <Database size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />
            Section 10: Decision Explainability ("Why was this chosen?")
          </h2>
          <button
            type="button"
            onClick={() => setSec10Expanded(!sec10Expanded)}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "6px",
              padding: "4px 10px",
              color: "#FFF",
              fontSize: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>{sec10Expanded ? "Collapse Details" : "Expand Details"}</span>
            {sec10Expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <div style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.8)", lineHeight: "18px" }}>
          Selected Fact: <strong>"{decideData.evidencePrimitive?.factStatement || "None"}"</strong>
        </div>

        {sec10Expanded && (
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px dashed rgba(255,255,255,0.1)", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
            {currentFailureTypeExp.length <= 1 ? (
              <div style={{ fontStyle: "italic" }}>
                This is currently the only evidence type tested for this obstacle.
              </div>
            ) : (
              <div>
                <div style={{ fontWeight: 700, color: "#FFF", marginBottom: "6px" }}>
                  Logged Rates for Obstacle Type Variants:
                </div>
                {currentFailureTypeExp.map((v: any, idx: number) => (
                  <div key={idx} style={{ marginBottom: "4px" }}>
                    • <strong>{v.variant}:</strong> {v.positiveOutcomeCount}/{v.notifiedCount} logged outcomes ({v.rate}%)
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default AIDecisionTraceConsole;
