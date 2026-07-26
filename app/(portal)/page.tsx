import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { PortalCard } from "@/components/evaluator/PortalCard";

export default function EntryPortalPage() {
  return (
    <>
      <BlinkitHeader variant="evaluator" />
      <main className="portal-container">
        <section className="hero-section">
          <h1 className="hero-title type-display">
            Second Look — Evaluator Portal
          </h1>
          <p className="hero-description type-body">
            Does resolving a specific first-category failure bring a customer back — and does it change their willingness to try other new categories?
          </p>
        </section>

        <ScopeBanner />

        <section className="portal-grid" aria-label="Portal Navigation Cards">
          <PortalCard
            href="/inspector"
            title="Workflow Inspector"
            description="See Stage A→B→C reasoning live"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            }
          />
          <PortalCard
            href="/second-look-demo"
            title="Customer Simulation"
            description="See the notification and Second Look page"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            }
          />
          <PortalCard
            href="/guide"
            title="Evaluator Guide"
            description="Phased test script"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            }
          />
          <PortalCard
            href="/system-design"
            title="System Design"
            description="Why AI is necessary at each stage"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="8" height="8" rx="1"></rect>
                <rect x="14" y="2" width="8" height="8" rx="1"></rect>
                <rect x="14" y="14" width="8" height="8" rx="1"></rect>
                <rect x="2" y="14" width="8" height="8" rx="1"></rect>
              </svg>
            }
          />
        </section>
      </main>
    </>
  );
}
