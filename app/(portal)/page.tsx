import React from "react";
import Link from "next/link";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { PortalCard } from "@/components/evaluator/PortalCard";
import { INVISIBLE_AI_FRAMING } from "@/lib/copy/canonical";
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
  Star,
} from "lucide-react";

export default function EntryPortalPage() {
  return (
    <>
      <BlinkitHeader variant="evaluator" />
      <EnvironmentBadge />

      <main className="portal-container" style={{ maxWidth: "900px" }}>
        <section className="hero-section" style={{ textAlign: "center", margin: "20px 0 36px 0" }}>
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

          <h1 className="hero-title type-display" style={{ fontSize: "38px", fontWeight: 800, margin: "0 0 4px 0", letterSpacing: "-0.5px" }}>
            Second Look
          </h1>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--blinkit-green)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Recovering interrupted shopping missions
          </p>

          {/* 1. Single-line problem statement */}
          <p
            className="problem-statement-headline"
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--blinkit-near-black)",
              maxWidth: "640px",
              margin: "0 auto 12px auto",
              lineHeight: "28px",
            }}
          >
            A customer hits an obstacle mid-shopping mission and abandons it. Second Look resolves the obstacle so they can finish.
          </p>

          {/* 3. One line connecting to the business goal */}
          <p
            className="business-goal-line"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--text-muted)",
              marginBottom: "8px",
            }}
          >
            Built to test whether recovering an interrupted mission in one category increases willingness to start missions in others.
          </p>

          <p
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--blinkit-green)",
              maxWidth: "600px",
              margin: "0 auto 24px auto",
              lineHeight: "18px",
              fontStyle: "italic",
            }}
          >
            {INVISIBLE_AI_FRAMING}
          </p>

          {/* 2. Static Visual Preview Element Above the Fold */}
          <div
            className="phone-preview-above-fold"
            style={{
              width: "300px",
              height: "330px",
              margin: "0 auto 36px auto",
              backgroundColor: "#FFF",
              border: "10px solid var(--blinkit-near-black)",
              borderRadius: "32px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
              overflow: "hidden",
              position: "relative",
              textAlign: "left",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {/* Phone Hardware Notch */}
            <div style={{ width: "90px", height: "14px", backgroundColor: "var(--blinkit-near-black)", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", margin: "0 auto" }} />

            {/* Simulated Phone Content Snapshot */}
            <div style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--blinkit-green)", fontWeight: 800, fontSize: "11px" }}>
                  <Clock size={12} /> <span>⚡ Delivery in 10 mins</span>
                </div>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--blinkit-green)", backgroundColor: "rgba(84,178,38,0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                  Verified
                </span>
              </div>

              {/* Product Photo Thumbnail */}
              <div style={{ width: "100%", height: "120px", backgroundColor: "#F8F8F6", borderRadius: "8px", overflow: "hidden", marginBottom: "10px" }}>
                <img
                  src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80"
                  alt="Earbuds"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ fontWeight: 800, fontSize: "13px", color: "var(--blinkit-near-black)", lineHeight: "17px" }}>
                boAt Airdopes 141 TWS Earbuds
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--blinkit-green)" }}>₹1,899</span>
                <span style={{ fontSize: "10px", color: "var(--text-muted)", textDecoration: "line-through" }}>MRP ₹4,490</span>
                <span style={{ fontSize: "10px", color: "var(--blinkit-near-black)", display: "flex", alignItems: "center", gap: "2px" }}>
                  <Star size={10} fill="#F8CB45" stroke="#F8CB45" /> 4.4
                </span>
              </div>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: "rgba(84,178,38,0.1)", color: "var(--blinkit-green)", padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 700, marginBottom: "10px" }}>
                <ShieldCheck size={12} /> Quality Verified
              </div>

              <div style={{ backgroundColor: "var(--blinkit-green)", color: "#FFF", padding: "8px", borderRadius: "8px", fontSize: "12px", fontWeight: 800, textAlign: "center" }}>
                ADD TO CART • ₹1,899
              </div>
            </div>
          </div>
        </section>

        {/* 4 Cards Navigation Grid Below Fold */}
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
            title="Mission Recovery Cases"
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
        <div style={{ textAlign: "center", marginTop: "36px" }}>
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
