import React from "react";
import Link from "next/link";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { PhaseSection } from "@/components/evaluator/PhaseSection";
import { ArrowRight } from "lucide-react";

export default function EvaluatorGuidePage() {
  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container" style={{ maxWidth: "840px" }}>
        <h1 className="type-display page-header-title">Evaluator Guide</h1>
        <p className="type-body guide-subtitle" style={{ marginBottom: "24px", color: "#444" }}>
          Does resolving a specific first-category failure bring a customer back — and does it change their willingness to try other new categories?
        </p>

        <ScopeBanner compact={false} />

        <div className="guide-phases-list" style={{ marginTop: "32px" }}>
          <PhaseSection
            phaseNumber={1}
            title="Start with the Workflow Inspector"
            description="See the AI reasoning before seeing the customer artifact — this makes the customer-facing screens legible once you reach them."
            checklist={[
              "Go to the Workflow Inspector and open one event of each failure type (use the filter chips)",
              "For each, watch Stage A classify the event, Stage B verify it, and Stage C decide the action",
              "Confirm the reasoning text in Stage A is specific to that event's actual text, not generic",
              "Confirm Stage B correctly labels itself as deterministic — it should never claim to be AI",
            ]}
          >
            <Link href="/inspector" className="guide-action-btn">
              <span>Open Workflow Inspector</span>
              <ArrowRight size={16} />
            </Link>
          </PhaseSection>

          <PhaseSection
            phaseNumber={2}
            title="Trigger the fail-safe branch deliberately"
            description="This is the most important thing to verify — that the system correctly does nothing when it shouldn't act."
            checklist={[
              "Open the low-confidence edge-case event (filter by 'Edge Cases')",
              "Confirm Stage A returns low confidence and the pipeline stops there — Stage B and C should not attempt a full classification-based action",
              "Confirm no fabricated notification is generated for this case",
              "Open the unverifiable edge-case event (the unresolved-support case with no ticket record) and confirm it falls to an acknowledgment-only message, never a false 'resolved' claim",
            ]}
          />

          <PhaseSection
            phaseNumber={3}
            title="Follow one event through to the customer screens"
            description="See the same artifact the pipeline just produced, rendered as a customer would actually see it."
            checklist={[
              "From the Inspector trace page for a verified/act event, click through to the simulated notification",
              "Tap the notification to reach the Second Look page",
              "Confirm the evidence shown matches exactly what Stage C decided, and that the CTA routes correctly for that failure type",
              "Try this for at least two different failure types and confirm the evidence card and CTA look structurally different, not just reworded",
            ]}
          />

          <PhaseSection
            phaseNumber={4}
            title="Review the Metrics Dashboard"
            description="Understand what this MVP is built to measure, not what it has already proven — the data here is illustrative, generated from your own testing."
            checklist={[
              "Open the Metrics Dashboard",
              "Note that Confidence-Transfer Rate is the metric most directly tied to the project's actual business goal, not just Same-Category Recovery Rate",
              "Confirm every tile is labeled as computed from simulated data",
            ]}
          >
            <Link href="/metrics" className="guide-action-btn">
              <span>Open Metrics Dashboard</span>
              <ArrowRight size={16} />
            </Link>
          </PhaseSection>
        </div>
      </main>
    </div>
  );
}
