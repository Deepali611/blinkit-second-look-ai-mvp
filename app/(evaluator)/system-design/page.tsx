import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { RationaleSection } from "@/components/evaluator/RationaleSection";

export default function SystemDesignPage() {
  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container" style={{ maxWidth: "840px" }}>
        <h1 className="type-display page-header-title">System Design</h1>
        <p className="type-body system-design-intro" style={{ marginBottom: "24px", color: "#444" }}>
          Each stage below either does something a fixed rule cannot, or is deliberately kept deterministic where a rule is the more honest and reliable choice. This page names which is which.
        </p>

        <ScopeBanner compact={false} />

        <div className="rationale-sections-list" style={{ marginTop: "32px" }}>
          <RationaleSection
            title="Stage A — Classification"
            isAI={true}
            mechanism="Given a return, rating, or support ticket's raw text, Stage A determines which of four evidenced failure types occurred, with a confidence level and a reasoning string grounded only in the input text."
            whereAI="The same underlying failure shows up in very different surface forms — a blank two-star rating, a rambling support message, a return reason that doesn't map cleanly to any category. A fixed keyword or rules table would have to enumerate every phrasing in advance and would break the moment a customer describes a known problem in an unanticipated way, which the underlying review data shows is the norm, not the exception."
            customerImpact="The acknowledgment a customer receives names the actual thing that happened to them, not a generic apology — because the system correctly identified what kind of problem it was."
          />

          <RationaleSection
            title="Stage B — Verification"
            isAI={false}
            mechanism="Before any resolution claim is shown to a customer, Stage B checks the relevant operational record for that specific failure type — vendor compliance status, review count, ticket resolution status, or category return policy — and returns verified, unverifiable, or not-yet-resolved."
            whereAI="This is a lookup against a known data source with a clear pass/fail rule, not a judgment call — so it runs as plain deterministic logic. Keeping this stage rule-based, rather than routing it through a model, is a deliberate choice: a verification claim this consequential should never depend on a probabilistic output. If a fact can be looked up directly, it should be, not inferred."
            customerImpact="A customer is never told something was fixed unless that's actually and currently true. If it can't be verified, the message says so honestly instead of guessing."
          />

          <RationaleSection
            title="Stage C — Decision"
            isAI={true}
            mechanism="Combines the classification, the verification result, and this customer's contact history to decide whether to act at all, which specific evidence to show, and which of a small set of existing destinations the recovery action should point to."
            whereAI="Four failure types, three confidence levels, three verification outcomes, and a rate-limit check combine into more cases than a flat decision table handles gracefully — and the right evidence-to-show and right destination-to-route-to genuinely differ by failure type in ways grounded in research, not guessed. This is a judgment across several inputs, not a single lookup."
            customerImpact="The recovery action a customer is offered matches the actual shape of their concern — a specific product page for a product-specific doubt, a category listing for a service concern that was never about one item."
          />

          <RationaleSection
            title="Learning Loop"
            isAI={true}
            mechanism="Every notification's outcome — same-category repurchase, cross-category attempt, or no response — is logged alongside which evidence primitive was shown, for which failure type. Over time this feeds back into Stage C's evidence-primitive selection."
            whereAI="Learning which evidence primitive actually correlates with recovery, per failure type and category, from real outcome data, is exactly the kind of pattern no one could hand-specify in advance."
            customerImpact="None yet, directly — this is a Phase 1+ mechanism. This prototype only demonstrates the schema and logging that would make it possible; it has not run on real outcome data and makes no live-learning claim."
          />

          <div className="simulated-vs-real-section">
            <h2 className="type-h1" style={{ fontSize: "22px", marginBottom: "12px" }}>
              What's simulated vs. real
            </h2>

            <p className="type-body" style={{ marginBottom: "16px", color: "#333" }}>
              Stage A makes a real, live call to an LLM (Groq). Stage B and Stage C are real, deterministic code running against mock operational data. The trigger events, customer records, vendor compliance records, ticket records, and all outcome data in this prototype are synthetic, generated to demonstrate each failure type and edge case, not drawn from Blinkit's real systems.
            </p>

            <p className="type-body" style={{ color: "#333" }}>
              This prototype measures classification precision against seeded ground-truth labels, which is only possible because the sample data was constructed with known correct answers. Real-world precision, without pre-known ground truth, would need to be measured differently — for example, against downstream customer behavior as a proxy.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
