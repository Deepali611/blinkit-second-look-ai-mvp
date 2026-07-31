import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { RationaleSection } from "@/components/evaluator/RationaleSection";
import {
  HYPOTHESIS_STATEMENT,
  STAGE_TITLES,
  STAGE_TAGS,
} from "@/lib/copy/canonical";

export default function SystemDesignPage() {
  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />
      <EnvironmentBadge />

      <main className="portal-container">
        <h1 className="type-display page-header-title">How the AI Decides</h1>

        <div className="system-design-business-framing type-body" style={{ backgroundColor: "var(--surface-muted)", border: "1px solid var(--border-hairline)", borderRadius: "10px", padding: "16px 20px", marginBottom: "20px", lineHeight: "24px" }}>
          <p>
            Blinkit's growth goal is category breadth, not single-category retention. Shopping mission interruption is the starting problem; trust erosion is its downstream consequence. The bet behind this MVP is that identifying the specific obstacle that interrupted a first-time category purchase, resolving it credibly with real evidence, and letting the customer finish that mission restores not just that purchase, but their broader willingness to explore. {HYPOTHESIS_STATEMENT} Everything below explains how AI makes the test possible, and where AI genuinely does the work versus where it deliberately doesn't.
          </p>
        </div>

        {/* Six-Step Causal Chain (Organizing Spine) */}
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
            The Six-Step Mechanism Spine
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
              "AI Review Mining (1,176 reviews, 189 signals)",
              "Four recurring obstacle types surfaced repeatedly, confirmed independently in interviews",
              "These obstacle types are category-agnostic — the same fear shows up regardless of which category it's first observed in",
              "Mission Recovery resolves one obstacle type, in one category, with real evidence",
              "Hypothesis: proof of resolution for an obstacle type carries forward into the next unfamiliar category where that same obstacle type could appear",
              "Cross-Category Exploration Rate tests exactly this, with no further nudge or recommendation added",
            ].map((stepText, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
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
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "var(--blinkit-near-black)",
                    margin: 0,
                    lineHeight: "20px",
                  }}
                >
                  {stepText}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-muted)",
              marginTop: "16px",
              marginBottom: 0,
              lineHeight: "20px",
              fontStyle: "italic",
            }}
          >
            These four obstacle types were not invented during ideation. They emerged repeatedly during review mining and user interviews, and every recovery path in the MVP maps directly to one of them.
          </p>
        </div>

        <div className="system-design-sections-stack" style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Section 1: Stage A */}
          <RationaleSection
            title={`${STAGE_TITLES.stageA} — Classification ${STAGE_TAGS.stageA}`}
            mechanism="Given a return, rating, or support ticket's raw text, this step determines which of four evidenced failure types occurred, with a confidence level and a reasoning string grounded only in the input text."
            whereAI="The same underlying failure shows up in very different surface forms — a blank two-star rating, a rambling support message, a return reason that doesn't map cleanly to any category. A fixed keyword or rules table would have to enumerate every phrasing in advance and would break the moment a customer describes a known problem in an unanticipated way, which the underlying review data shows is the norm, not the exception."
            customerImpact="The acknowledgment a customer receives names the actual thing that happened to them, not a generic apology — because the system correctly identified what kind of problem it was. Getting this right is what makes the recovery message feel specific enough to matter — not just for this category, but potentially for how the customer sees Blinkit as a whole."
            isAI={true}
          />

          {/* Section 2: Stage B */}
          <RationaleSection
            title={`${STAGE_TITLES.stageB} — Verification ${STAGE_TAGS.stageB}`}
            mechanism="Before any resolution claim is shown to a customer, this step checks the relevant operational record for that specific failure type — vendor compliance status, review count, ticket resolution status, or category return policy — and returns verified, unverifiable, or not-yet-resolved."
            whereAI="This is deliberately not AI. A resolution claim this consequential should never depend on a probabilistic output — if a fact can be looked up directly, it should be, not inferred. This is what stops the recovery moment from becoming a second, worse trust failure."
            customerImpact="A customer is never told something was fixed unless that's actually and currently true. If it can't be verified, the message says so honestly instead of guessing."
            isAI={false}
          />

          {/* Section 3: Stage C */}
          <RationaleSection
            title={`${STAGE_TITLES.stageC} — Decision ${STAGE_TAGS.stageC}`}
            mechanism="Combines the classification, the verification result, and this customer's contact history to decide whether to act at all, which specific evidence to show, and which of a small set of existing destinations the recovery action should point to."
            whereAI="Today, this step could be implemented as a fixed decision table — four failure types, three confidence levels, three verification outcomes, and a rate-limit check is a small, static combination. Its AI-necessity is prospective: it becomes genuinely AI-driven once the learning loop has enough real outcome data to adjust which evidence and which action work best, per failure type and category — something no static table could do without being manually re-tuned. We're honest that this stage is rules-equivalent today."
            customerImpact="The recovery action a customer is offered matches the actual shape of their concern — a specific product page for a product-specific doubt, a category listing for a service concern that was never about one item."
            isAI={true}
          />

          {/* Section 4: Learning Loop */}
          <RationaleSection
            title="Learning Loop"
            mechanism="Every notification's outcome — same-category repurchase, cross-category attempt, or no response — is logged alongside which evidence primitive was shown, for which failure type. Over time this feeds back into the decision step's evidence-primitive selection."
            whereAI="Learning which evidence primitive actually correlates with recovery, per failure type and category, from real outcome data, is exactly the kind of pattern no one could hand-specify in advance."
            customerImpact="None yet, directly — this is future work. This prototype only demonstrates the schema and logging that would make it possible; it has not run on real outcome data and makes no live-learning claim."
            isAI={true}
          />

          {/* Section 5: Rejected Alternative Direction */}
          <div
            className="rationale-section-card"
            style={{
              backgroundColor: "var(--surface-muted)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <h2
              className="type-h1 rationale-title"
              style={{ fontSize: "20px", marginBottom: "12px", color: "var(--blinkit-near-black)" }}
            >
              An alternative direction we considered and rejected
            </h2>
            <p
              className="type-body"
              style={{ color: "var(--blinkit-near-black)", lineHeight: "24px", margin: 0, opacity: 0.9 }}
            >
              Before settling on this architecture, we developed an alternative Growth mechanism in real depth — one that targeted a broader customer population and a different point in the shopping journey. We rejected it, specifically, because it could not be traced back to our own validated research: building it responsibly would have required inferring customer behavior and life context that Parts 1–3 never measured or validated. Every component of the architecture on this page, by contrast, traces directly to a specific finding from our review-mining or interview research. We chose evidence-grounded scope over a theoretically larger opportunity.
            </p>
          </div>

          {/* Section 6: Two-Phase Product Roadmap */}
          <div
            className="rationale-section-card"
            style={{
              backgroundColor: "var(--surface-muted)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <h2
              className="type-h1 rationale-title"
              style={{ fontSize: "20px", marginBottom: "12px", color: "var(--blinkit-near-black)" }}
            >
              Two-Phase Product Roadmap
            </h2>
            <p
              className="type-body"
              style={{ color: "var(--blinkit-near-black)", lineHeight: "24px", margin: 0, opacity: 0.9 }}
            >
              Phase 1 (this MVP): recover shopping missions interrupted by evidenced, specific obstacles in first-time category purchases. Phase 2 (future direction, not built): reduce how often those interruptions occur in the first place, by surfacing relevant information earlier in the journey.
            </p>
          </div>

          {/* Section 7: Why we believe this generalizes across categories */}
          <div
            className="rationale-section-card"
            style={{
              backgroundColor: "var(--surface-muted)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <h2
              className="type-h1 rationale-title"
              style={{ fontSize: "20px", marginBottom: "12px", color: "var(--blinkit-near-black)" }}
            >
              Why we believe this generalizes across categories
            </h2>
            <p
              className="type-body"
              style={{ color: "var(--blinkit-near-black)", lineHeight: "24px", margin: 0, opacity: 0.9 }}
            >
              Obstacles in quick commerce are not category-bound — a customer who hesitates on a high-value item in Electronics experiences the same fundamental doubt (will it be authentic and returnable?) as when considering Personal Care or Pet Supplies. By resolving obstacle-types (quality doubts, missing information, unresolved support, high-value hesitation) rather than making product recommendations, Second Look addresses the underlying cause of mission abandonment. Credibly resolving an obstacle in one category signals to the customer that Blinkit handles that obstacle-type across all categories.
            </p>
          </div>
        </div>

        {/* Closing Section: What's simulated vs. real */}
        <div className="simulated-vs-real-section" style={{ backgroundColor: "var(--surface-muted)", border: "1px solid var(--border-hairline)", borderRadius: "12px", padding: "24px", marginTop: "32px", marginBottom: "48px" }}>
          <h2 className="type-h1" style={{ fontSize: "20px", marginBottom: "16px", color: "var(--blinkit-near-black)" }}>
            What's simulated vs. real
          </h2>
          <div className="type-body" style={{ display: "flex", flexDirection: "column", gap: "14px", lineHeight: "24px" }}>
            <p>
              Stage 1 makes a real, live call to an LLM. Stages 2 and 3 are real, deterministic and combinatorial code running against mock operational data. The trigger events, customer records, vendor compliance records, ticket records, and all outcome data in this prototype are synthetic, generated to demonstrate each failure type and edge case, not drawn from Blinkit's real systems.
            </p>
            <p>
              This prototype measures classification accuracy against pre-known correct labels in its sample data. Real-world accuracy, without pre-known correct answers, would need to be measured differently — for example, against downstream customer behavior as a proxy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
