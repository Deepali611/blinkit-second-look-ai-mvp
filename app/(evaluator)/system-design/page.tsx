import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { RationaleSection } from "@/components/evaluator/RationaleSection";
import {
  HYPOTHESIS_STATEMENT,
  INVISIBLE_AI_FRAMING,
  PROACTIVE_REUSE_EXPLANATION,
} from "@/lib/copy/canonical";

export default function SystemDesignPage() {
  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />
      <EnvironmentBadge />

      <main className="portal-container" style={{ paddingBottom: "60px" }}>
        <h1 className="type-display page-header-title">System Architecture & AI Safety Boundaries</h1>

        <div className="system-design-business-framing type-body" style={{ backgroundColor: "var(--surface-muted)", border: "1px solid var(--border-hairline)", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", lineHeight: "24px" }}>
          <p>
            Blinkit's growth goal is category breadth, not single-category retention. Shopping mission interruption is the starting problem; trust erosion is its downstream consequence. The customer never sees this reasoning happen — they simply experience Blinkit remembering where they got stuck and having the answer ready. {HYPOTHESIS_STATEMENT} {INVISIBLE_AI_FRAMING} Everything below explains how AI makes the test possible, and where AI genuinely does the work versus where it deliberately doesn't.
          </p>
        </div>

        {/* Six-Stage System Pipeline Spine */}
        <div
          className="causal-chain-container"
          style={{
            backgroundColor: "var(--surface-muted)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "12px",
            padding: "24px",
            margin: "24px 0",
          }}
        >
          <h2
            className="type-h1"
            style={{
              fontSize: "20px",
              fontWeight: 800,
              marginBottom: "16px",
              color: "var(--blinkit-near-black)",
            }}
          >
            The 6-Stage System Architecture Pipeline
          </h2>

          <div
            className="causal-chain-steps"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {[
              {
                stage: "Stage 1: Deterministic Behavioral Obstacle Detection",
                desc: "Fires when didOpenReviews === true AND reviewsDwellTimeSeconds > 15 AND didAddToCart === false. Zero AI, rule-based, fully auditable.",
                tech: "lib/detection/detectHesitation.ts",
              },
              {
                stage: "Stage 2: AI Reasoning Route (Evidence Selection & Grounded Messaging)",
                desc: "Invokes Groq LLM (llama-3.3-70b-versatile) over raw product operational metrics to select evidence, generate 1 grounded sentence, and pick an action.",
                tech: "app/api/reason/route.ts",
              },
              {
                stage: "Stage 3: Deterministic Confidence Gate",
                desc: "Computes high / medium / low / below_threshold using explicit numeric rules (reorderRate >= 0.9, returnRate <= 0.05). Completely separate from AI reasoning.",
                tech: "lib/decision/confidenceGate.ts & app/api/gate/route.ts",
              },
              {
                stage: "Stage 4: Verification Engine",
                desc: "Re-fetches fresh seed database records and fact-checks AI message text for unverified numbers. If verification fails, intervention is suppressed entirely.",
                tech: "lib/verification/verifyEvidence.ts",
              },
              {
                stage: "Stage 5: Mission Recovery Module (PDP Integration)",
                desc: "Renders inline between price block and Add to Cart button per confidence display rules (high = message + CTA; medium = message + reviews; low = seller info only).",
                tech: "components/customer/ConfidenceCard.tsx & BlinkitProductPage.tsx",
              },
              {
                stage: "Stage 6: Outcome Logging & CCER Metrics",
                desc: "Captures per-session outcomes (added_to_cart vs exited_without_purchase) and calculates 3-month trailing Cross-Category Exploration Rate against a 20% holdout group.",
                tech: "lib/db/outcomes.ts & app/api/log-outcome/route.ts",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "8px",
                  padding: "14px 16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "var(--blinkit-green)",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--blinkit-near-black)", marginBottom: "2px" }}>
                    {step.stage}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "18px", marginBottom: "4px" }}>
                    {step.desc}
                  </div>
                  <code style={{ fontSize: "11px", color: "var(--blinkit-green)", backgroundColor: "rgba(84, 178, 38, 0.08)", padding: "2px 6px", borderRadius: "4px" }}>
                    {step.tech}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Rationale Section (AI vs Deterministic Boundaries) */}
        <RationaleSection
          title="AI Safety Boundaries & Deterministic Verification Rules"
          mechanism="AI reasons over operational metrics to select evidence, generate grounded 1-sentence messages, and pick actions. Deterministic rules perform Stage 1 behavioral detection, Stage 3 confidence scoring, Stage 4 evidence verification, and Stage 6 outcome logging."
          whereAI="AI performs Stage 2 evidence selection and grounded message generation. AI cannot invent facts, cannot assume verification, and cannot override Stage 3 & 4 deterministic bounds."
          customerImpact="Customers experience Blinkit remembering where they got stuck and having the exact verified answer ready."
          growthImpact="Cross-Category Exploration Rate (CCER) tests whether removing reusable decision uncertainty makes first-time purchases in new categories more likely."
          isAI={true}
        />
      </main>
    </div>
  );
}
