import React from "react";
import Link from "next/link";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { PortalCard } from "@/components/evaluator/PortalCard";
import { INVISIBLE_AI_FRAMING, PROACTIVE_REUSE_EXPLANATION } from "@/lib/copy/canonical";
import {
  BarChart3,
  Smartphone,
  Activity,
  LayoutGrid,
  ArrowLeft,
  BookOpen,
  ShoppingBag,
  GitBranch,
} from "lucide-react";

export default function EvaluatorModeHubPage() {
  return (
    <div className="portal-layout" style={{ backgroundColor: "var(--evaluator-bg)", minHeight: "100vh" }}>
      <BlinkitHeader variant="evaluator" backHref="/" />
      <EnvironmentBadge />

      <main className="portal-container" style={{ maxWidth: "900px", paddingBottom: "60px" }}>
        {/* Top return link to customer shopping mode */}
        <div style={{ marginBottom: "20px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--blinkit-green)",
              backgroundColor: "#FFF",
              padding: "8px 14px",
              borderRadius: "20px",
              border: "1px solid var(--border-hairline)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> Return to Blinkit Customer Shopping Experience
          </Link>
        </div>

        <section className="hero-section" style={{ textAlign: "left", margin: "10px 0 28px 0" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#FFF", padding: "4px 10px", borderRadius: "12px", border: "1px solid var(--border-hairline)", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "10px" }}>
            <ShoppingBag size={12} style={{ color: "var(--blinkit-green)" }} />
            <span>EVALUATOR MODE & INSPECTION PANEL</span>
          </div>

          <h1 className="hero-title type-display" style={{ fontSize: "32px", fontWeight: 800, margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>
            Mission Recovery System Architecture
          </h1>

          <p style={{ fontSize: "14px", color: "var(--text-muted)", maxWidth: "720px", lineHeight: "22px", margin: "0 0 16px 0" }}>
            Evaluation panel for reviewing AI classification, deterministic verification, metrics tracking, and decision logs.
          </p>

          <div style={{ backgroundColor: "#FFF", border: "1px solid var(--border-hairline)", borderRadius: "12px", padding: "14px 16px", marginBottom: "24px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--blinkit-near-black)", margin: "0 0 4px 0" }}>
              Hypothesis Statement
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, lineHeight: "18px" }}>
              {INVISIBLE_AI_FRAMING} {PROACTIVE_REUSE_EXPLANATION}
            </p>
          </div>
        </section>

        {/* Evaluator Navigation Cards Grid */}
        <section className="portal-grid" aria-label="Evaluator Navigation Cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          <PortalCard
            href="/metrics"
            title="Metrics Dashboard"
            description="Leading & lagging indicators (Cross-Category Exploration Rate, Recovery CTA Click Rate)."
            icon={<BarChart3 size={24} />}
          />
          <PortalCard
            href="/inspector"
            title="Customer Case Explorer"
            description="Explore every customer case filtered by obstacle type and behavioral trigger."
            icon={<Activity size={24} />}
          />
          <PortalCard
            href="/system-design"
            title="System Design & AI Logic"
            description="Complete 6-step causal chain, classification rationale, and verification rules."
            icon={<LayoutGrid size={24} />}
          />
          <PortalCard
            href="/guide"
            title="Evaluator Guide"
            description="Phase-by-phase evaluation guide & testing instructions."
            icon={<BookOpen size={24} />}
          />
          <PortalCard
            href="/evaluator/decision-trace/evt_1"
            title="AI Decision Trace Console"
            description="Full 10-section diagnostic panel for AI classification, verification, & variant explainability."
            icon={<GitBranch size={24} />}
          />
          <PortalCard
            href="/second-look-demo"
            title="Interactive Customer Case Flow"
            description="Step-through end-to-end customer simulation."
            icon={<Smartphone size={24} />}
          />
        </section>
      </main>
    </div>
  );
}
