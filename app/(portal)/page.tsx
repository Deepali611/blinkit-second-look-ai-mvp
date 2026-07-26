import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { PortalCard } from "@/components/evaluator/PortalCard";
import { HYPOTHESIS_STATEMENT } from "@/lib/copy/canonical";
import {
  BarChart3,
  Smartphone,
  Activity,
  LayoutGrid,
  BookOpen,
  Zap,
  Sparkles,
  Heart,
} from "lucide-react";

export default function EntryPortalPage() {
  return (
    <>
      <BlinkitHeader variant="evaluator" />
      <main className="portal-container">
        <section className="hero-section">
          <div className="hero-brand-badges">
            <span className="hero-category-chip">
              <Zap size={14} /> Electronics
            </span>
            <span className="hero-category-chip">
              <Sparkles size={14} /> Personal Care
            </span>
            <span className="hero-category-chip">
              <Heart size={14} /> Pet Supplies
            </span>
          </div>

          <h1 className="hero-title type-display">
            Second Look — Evaluator Portal
          </h1>

          <div className="hypothesis-prominent-block" style={{ margin: "16px 0 24px 0", padding: "20px 24px", backgroundColor: "var(--surface-muted)", borderRadius: "12px", borderLeft: "4px solid var(--blinkit-green)" }}>
            <p className="type-h1" style={{ fontSize: "18px", lineHeight: "26px", fontWeight: 600, color: "var(--blinkit-near-black)" }}>
              "{HYPOTHESIS_STATEMENT}"
            </p>
          </div>
        </section>

        <ScopeBanner variant="full" />

        <section className="portal-grid portal-grid-5" aria-label="Portal Navigation Cards">
          <PortalCard
            href="/metrics"
            title="Does It Work? (Metrics)"
            description="The number that tests whether this actually grows category exploration."
            extraLine="This is the metric that matters most — everything else is supporting detail."
            icon={<BarChart3 size={24} />}
          />
          <PortalCard
            href="/second-look-demo"
            title="See a Customer Case"
            description="Follow one real case from problem to resolution."
            icon={<Smartphone size={24} />}
          />
          <PortalCard
            href="/inspector"
            title="Customer Recovery Cases"
            description="Explore every case, filtered by what went wrong."
            icon={<Activity size={24} />}
          />
          <PortalCard
            href="/system-design"
            title="How the AI Decides"
            description="The reasoning behind each decision — and where it's rules, not AI."
            icon={<LayoutGrid size={24} />}
          />
          <PortalCard
            href="/guide"
            title="How to Evaluate This"
            description="A guided phase-by-phase test script."
            icon={<BookOpen size={24} />}
          />
        </section>
      </main>
    </>
  );
}
