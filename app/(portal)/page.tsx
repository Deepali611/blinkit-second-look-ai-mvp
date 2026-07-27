import React from "react";
import Link from "next/link";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { PortalCard } from "@/components/evaluator/PortalCard";
import {
  BarChart3,
  Smartphone,
  Activity,
  LayoutGrid,
  Zap,
  Sparkles,
  Heart,
  ArrowRight,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function EntryPortalPage() {
  return (
    <>
      <BlinkitHeader variant="evaluator" />
      <EnvironmentBadge />

      <main className="portal-container" style={{ maxWidth: "900px" }}>
        <section className="hero-section" style={{ textAlign: "center", margin: "20px 0 32px 0" }}>
          <div className="hero-brand-badges" style={{ justifyContent: "center", marginBottom: "12px" }}>
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

          <h1 className="hero-title type-display" style={{ fontSize: "36px", margin: "0 0 12px 0" }}>
            Second Look
          </h1>

          <p
            className="problem-statement-headline"
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--blinkit-near-black)",
              maxWidth: "600px",
              margin: "0 auto 16px auto",
              lineHeight: "28px",
            }}
          >
            A bad first order in a new category usually ends the relationship. Second Look fixes that.
          </p>

          <p
            className="business-goal-line"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--text-muted)",
              marginBottom: "28px",
            }}
          >
            Built to test whether resolving trust in one category increases exploration of others.
          </p>

          {/* Above-the-fold Static Phone Visual Preview Element */}
          <div
            className="phone-preview-above-fold"
            style={{
              width: "280px",
              height: "260px",
              margin: "0 auto 32px auto",
              backgroundColor: "#FFF",
              border: "8px solid var(--blinkit-near-black)",
              borderRadius: "28px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
              overflow: "hidden",
              position: "relative",
              textAlign: "left",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {/* Phone notch */}
            <div style={{ width: "80px", height: "12px", backgroundColor: "var(--blinkit-near-black)", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", margin: "0 auto" }} />

            <div style={{ padding: "10px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--blinkit-green)", fontWeight: 700, fontSize: "10px" }}>
                <Clock size={10} /> <span>Delivery in 10 mins</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: "13px", margin: "4px 0 2px 0", color: "var(--blinkit-near-black)" }}>
                boAt Airdopes 141 TWS Earbuds
              </div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--blinkit-green)", marginBottom: "6px" }}>
                ₹1,899
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "3px", backgroundColor: "rgba(84,178,38,0.1)", color: "var(--blinkit-green)", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 700 }}>
                <ShieldCheck size={10} /> Quality Verified
              </div>

              <div style={{ marginTop: "12px", backgroundColor: "var(--blinkit-green)", color: "#FFF", padding: "6px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, textAlign: "center" }}>
                Add to Cart • ₹1,899
              </div>
            </div>
          </div>
        </section>

        {/* 4 Cards Grid Below Fold */}
        <section className="portal-grid portal-grid-4" aria-label="Portal Navigation Cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <PortalCard
            href="/metrics"
            title="Does It Work? (Metrics)"
            description="The number that tests whether this actually grows category exploration."
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
        </section>

        {/* Demoted Single-Line Guide Link */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link
            href="/guide"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--blinkit-green)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
            }}
          >
            <span>New here? See the 60-second guide</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    </>
  );
}
