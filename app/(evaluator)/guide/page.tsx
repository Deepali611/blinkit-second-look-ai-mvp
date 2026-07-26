import React from "react";
import Link from "next/link";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { PhaseSection } from "@/components/evaluator/PhaseSection";

export default function EvaluatorGuidePage() {
  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container">
        <h1 className="type-display page-header-title">Evaluator Guide</h1>
        <p className="type-body guide-intro" style={{ marginBottom: "24px" }}>
          This guide provides a structured 4-phase evaluation walkthrough for testing Blinkit's Second Look customer recovery system.
        </p>

        <ScopeBanner compact={false} />

        <div className="guide-phases-container">
          {/* Phase 1 */}
          <PhaseSection
            phaseNumber={1}
            title="Business Hypothesis & Growth Impact"
            description="Start by understanding the business question: Does resolving a first-category failure bring a customer back, and increase their willingness to try other new categories?"
            checklist={[
              "Review the Growth Impact dashboard metrics",
              "Understand the primary metric: 'Customers who explored a new category after recovery'",
              "Observe how treatment vs. control group outcomes are computed",
            ]}
          >
            <Link href="/metrics" className="guide-action-btn">
              <span>View Growth Impact Metrics</span>
            </Link>
          </PhaseSection>

          {/* Phase 2 */}
          <PhaseSection
            phaseNumber={2}
            title="Customer Recovery Journey"
            description="Experience what the customer sees when an order issue is verified and fixed. See the phone notification and the transparent Second Look recovery card."
            checklist={[
              "Open the simulated customer push notification",
              "Tap the notification to open the Second Look screen",
              "Verify the quality/authenticity trust badge and evidence statement",
              "Test the CTA navigation to product & category pages",
              "Use the Evaluator Control Panel on destination pages to simulate outcomes",
            ]}
          >
            <Link href="/second-look/evt_1" className="guide-action-btn">
              <span>Launch Customer Recovery Simulation</span>
            </Link>
          </PhaseSection>

          {/* Phase 3 */}
          <PhaseSection
            phaseNumber={3}
            title="AI Reasoning & Case Trace"
            description="Inspect how Blinkit's system processes customer feedback step-by-step: AI failure classification, deterministic operational verification, and decision selection."
            checklist={[
              "Browse the Customer Recovery Cases list filtered by customer situation",
              "Open an individual Case Trace (e.g. evt_1)",
              "Inspect 1. What went wrong (Stage A AI classification reasoning)",
              "Inspect 2. Is it actually fixed? (Stage B deterministic table check)",
              "Inspect 3. What we do about it (Stage C action & evidence selection)",
              "Check the growth hypothesis tie-back line at the bottom of the trace",
            ]}
          >
            <Link href="/inspector" className="guide-action-btn">
              <span>Open Customer Recovery Cases</span>
            </Link>
          </PhaseSection>

          {/* Phase 4 */}
          <PhaseSection
            phaseNumber={4}
            title="Edge Cases & System Boundaries"
            description="Verify fail-safe suppression logic when customer feedback is unclear, unverified, or low-confidence."
            checklist={[
              "Filter Customer Recovery Cases by 'System correctly held back'",
              "Open an unverified or unclear case (e.g. evt_5 or evt_6)",
              "Confirm Stage B/C correctly suppresses notification (Action: Suppress)",
              "Verify that no notification or Second Look page is sent to the customer",
            ]}
          >
            <Link href="/inspector?failureType=unclear" className="guide-action-btn">
              <span>Inspect Suppressed Edge Cases</span>
            </Link>
          </PhaseSection>
        </div>
      </main>
    </div>
  );
}
