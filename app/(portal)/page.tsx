import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { PortalCard } from "@/components/evaluator/PortalCard";
import { Activity, Smartphone, BookOpen, LayoutGrid } from "lucide-react";

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

        <ScopeBanner compact={false} />

        <section className="portal-grid" aria-label="Portal Navigation Cards">
          <PortalCard
            href="/inspector"
            title="Workflow Inspector"
            description="See Stage A→B→C reasoning live"
            icon={<Activity size={24} />}
          />
          <PortalCard
            href="/second-look-demo"
            title="Customer Simulation"
            description="See the notification and Second Look page"
            icon={<Smartphone size={24} />}
          />
          <PortalCard
            href="/guide"
            title="Evaluator Guide"
            description="Phased test script"
            icon={<BookOpen size={24} />}
          />
          <PortalCard
            href="/system-design"
            title="System Design"
            description="Why AI is necessary at each stage"
            icon={<LayoutGrid size={24} />}
          />
        </section>
      </main>
    </>
  );
}
