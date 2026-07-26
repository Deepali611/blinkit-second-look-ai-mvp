import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { RationaleSection } from "@/components/evaluator/RationaleSection";

export default function SystemDesignPage() {
  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container">
        <h1 className="type-display page-header-title">System Architecture & AI Rationale</h1>

        <div className="system-design-business-framing type-body">
          <p>
            <strong>Business Purpose:</strong> Blinkit's Second Look system is built to test a specific growth hypothesis: when a customer experiences a first-order failure in a new category, restoring their trust immediately with verified factual evidence prevents category churn and encourages them to explore additional new categories. The technical architecture below balances LLM natural language understanding with strict deterministic operational verification to ensure no customer receives an unverified or hallucinated claim.
          </p>
        </div>

        <ScopeBanner compact={false} />

        <div className="system-design-sections-stack">
          {/* Section 1: Stage A */}
          <RationaleSection
            title="Stage A: AI Failure Classification"
            mechanism="Receives raw, unstructured customer signals (returns, ratings, support tickets) and classifies the root failure mode into a structured taxonomy: expiry_authenticity, missing_information, unresolved_support, or high_value_hesitation."
            whereAI="LLMs excel at deciphering messy, unformatted human language in customer feedback, extracting intent and implicit dissatisfaction that rigid keyword matchers miss."
            customerImpact="Ensures the customer's actual complaint is accurately pinpointed without forcing them through tedious manual survey forms."
            growthImpact="Accurate failure classification is the essential first step to recovery; misidentifying a customer's issue guarantees an irrelevant recovery attempt that worsens category churn."
            isAI={true}
          />

          {/* Section 2: Stage B */}
          <RationaleSection
            title="Stage B: Deterministic Verification"
            mechanism="Queries live operational databases (vendor audit tables, review stores, support ticket systems) to check whether the underlying root cause has actually been resolved."
            whereAI="Stage B is purely rule-based code. AI is deliberately excluded here because operational verification requires absolute ground truth against database records, not statistical probability."
            customerImpact="Protects customers from receiving hollow or false assurances about products that haven't actually been fixed."
            growthImpact="Verification ensures Blinkit only reaches out when trust can be legitimately restored, preserving customer trust and avoiding brand damage."
            isAI={false}
          />

          {/* Section 3: Stage C */}
          <RationaleSection
            title="Stage C: Decision & Artifact Selection"
            mechanism="Applies deterministic business rules to select the appropriate recovery action (Act vs Suppress) and maps the verified evidence into a pre-approved UI primitive card."
            whereAI="Stage C uses deterministic decision matrices. Rules enforce that low-confidence or unverified cases are immediately suppressed without AI hallucination risk."
            customerImpact="Delivers a clean, concise, non-intrusive recovery message directly inside the Blinkit mobile application."
            growthImpact="By presenting transparent, verified facts, Second Look converts a potential lost customer into a repeat buyer across multiple categories."
            isAI={false}
          />

          {/* Section 4: Stage D */}
          <RationaleSection
            title="Stage D: Outcome Logging & Metrics"
            mechanism="Logs customer post-recovery interactions (same-category repurchases, cross-category attempts, dismissals) against control groups to compute statistical recovery lift."
            whereAI="Stage D uses deterministic metric aggregation. Standard telemetry logs track conversion events to maintain unbiased measurement."
            customerImpact="Creates a feedback loop that continuously improves product quality and customer experience across all Blinkit categories."
            growthImpact="Provides clear quantitative proof of confidence transfer, demonstrating how customer recovery directly drives multi-category gross merchandise value (GMV)."
            isAI={false}
          />
        </div>

        {/* Real vs Simulated Comparison */}
        <div className="simulated-vs-real-section">
          <h2 className="type-h1" style={{ marginBottom: "12px" }}>
            Real Architecture vs. Prototype Implementation
          </h2>
          <div className="type-body" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p>
              • <strong>Stage A (Classification):</strong> Uses a live AI model call via Google Gemini SDK (with instant fallback to pre-cached seed reasoning when API keys are unconfigured).
            </p>
            <p>
              • <strong>Stage B (Verification):</strong> Checks structured mock data records mimicking Blinkit's operational SQL tables.
            </p>
            <p>
              • <strong>Stage C (Decision):</strong> Implements full deterministic decision logic producing production-ready UI card primitives.
            </p>
            <p>
              • <strong>Stage D (Metrics):</strong> Aggregates simulated outcome events in memory to demonstrate the exact mathematical formulas for Confidence-Transfer Rate and Lift over Control.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
