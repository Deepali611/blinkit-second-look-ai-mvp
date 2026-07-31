import React from "react";
import Link from "next/link";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { PhaseSection } from "@/components/evaluator/PhaseSection";
import {
  HYPOTHESIS_STATEMENT,
  STAGE_TAGS,
} from "@/lib/copy/canonical";

export default function EvaluatorGuidePage() {
  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />
      <EnvironmentBadge />

      <main className="portal-container">
        <h1 className="type-display page-header-title">How to Evaluate This</h1>
        <p className="type-body guide-intro" style={{ color: "var(--blinkit-near-black)", marginBottom: "24px", opacity: 0.9 }}>
          Does resolving a specific first-category failure bring a customer back — and does it change their willingness to try other new categories? {HYPOTHESIS_STATEMENT}
        </p>

        <div className="guide-phases-container" style={{ marginTop: "24px" }}>
          {/* Phase 1 */}
          <PhaseSection
            phaseNumber={1}
            title="Understand what's being tested"
            description="Start here before looking at any mechanics."
            checklist={[
              "Open the Metrics page and read what Cross-Category Exploration Rate measures",
              "Note that this is a hypothesis this MVP tests — not a result it has already proven",
              "This segment already showed exploratory intent once, by trying a new category. The metrics are designed to partially account for this through a comparison group, though it can't be fully ruled out as a factor.",
            ]}
          >
            <Link href="/metrics" className="guide-action-btn">
              <span>Open Metrics →</span>
            </Link>
          </PhaseSection>

          {/* Phase 2 */}
          <PhaseSection
            phaseNumber={2}
            title="See a customer case end-to-end"
            description="Follow one real case exactly as the customer would experience it."
            checklist={[
              "Open the Customer Case simulation and view the notification",
              "Tap through to the Second Look page",
              "Notice that if this notification is ignored, there is no follow-up message — this is a deliberate choice to avoid over-contacting customers, not an oversight",
              "Try this for at least two different failure types and confirm the evidence and CTA look structurally different, not just reworded",
            ]}
          >
            <Link href="/second-look-demo" className="guide-action-btn">
              <span>Open Customer Case →</span>
            </Link>
          </PhaseSection>

          {/* Phase 3 */}
          <PhaseSection
            phaseNumber={3}
            title="See how Blinkit decided what to do"
            description="Here's the reasoning behind what you just saw. You'll see three steps — one uses AI, one is deliberately rules-based, and one is AI-assisted and improves over time."
            checklist={[
              "Go to Mission Recovery Cases and open the same case type you just saw",
              "Confirm the reasoning in step 1 is specific to that event's actual text, not generic",
              `Confirm step 2 is clearly labeled ${STAGE_TAGS.stageB} and never claims to be AI`,
            ]}
          >
            <Link href="/inspector" className="guide-action-btn">
              <span>Open Mission Recovery Cases →</span>
            </Link>
          </PhaseSection>

          {/* Phase 4 */}
          <PhaseSection
            phaseNumber={4}
            title="Check the fail-safe behaviour"
            description="This is the most important thing to verify — that the system correctly does nothing when it shouldn't act."
            checklist={[
              "Open the 'Cases we correctly held back on' filter and select a case",
              "Confirm the pipeline stops after step 1 with a low-confidence result, and no fabricated notification is generated",
              "Open the unresolved-support case with no ticket record and confirm it falls to an acknowledgment-only message, never a false 'resolved' claim",
            ]}
          />

          {/* Phase 5 */}
          <PhaseSection
            phaseNumber={5}
            title="Review the results"
            description="Understand what this MVP is built to measure, not what it has already proven — the data here is illustrative, generated from your own testing."
            checklist={[
              "Return to the Metrics page",
              "Confirm Cross-Category Exploration Rate is visually the most prominent tile, not just first in order",
              "Confirm every tile is labeled as computed from simulated data",
            ]}
          >
            <Link href="/metrics" className="guide-action-btn">
              <span>Open Metrics →</span>
            </Link>
          </PhaseSection>
        </div>
      </main>
    </div>
  );
}
