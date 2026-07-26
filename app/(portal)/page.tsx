import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { PortalCard } from "@/components/evaluator/PortalCard";
import {
  Activity,
  Smartphone,
  BarChart3,
  BookOpen,
  LayoutGrid,
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

          <p className="hero-opener type-body" style={{ fontWeight: 600, color: "var(--blinkit-near-black)", marginBottom: "12px" }}>
            When a customer's first order in a new category goes wrong, they usually don't come back — to that category, or maybe any other. This is Blinkit's fix.
          </p>

          <p className="hero-description type-body" style={{ opacity: 0.85 }}>
            Does resolving a specific first-category failure bring a customer back — and does it change their willingness to try other new categories?
          </p>
        </section>

        <ScopeBanner compact={false} />

        <section className="portal-grid portal-grid-5" aria-label="Portal Navigation Cards">
          <PortalCard
            href="/inspector"
            title="Customer Recovery Cases"
            description="See live customer failure classifications & actions"
            icon={<Activity size={24} />}
          />
          <PortalCard
            href="/second-look-demo"
            title="Customer Simulation"
            description="See the notification and Second Look page"
            icon={<Smartphone size={24} />}
          />
          <PortalCard
            href="/metrics"
            title="Growth Impact"
            description="Measure recovery rate & confidence transfer"
            icon={<BarChart3 size={24} />}
          />
          <PortalCard
            href="/guide"
            title="Evaluator Guide"
            description="Phased test script"
            icon={<BookOpen size={24} />}
          />
          <PortalCard
            href="/system-design"
            title="How the AI Decides"
            description="Why AI is necessary at each stage"
            icon={<LayoutGrid size={24} />}
          />
        </section>
      </main>
    </>
  );
}
