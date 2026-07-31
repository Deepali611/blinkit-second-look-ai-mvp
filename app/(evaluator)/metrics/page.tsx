"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { MetricTile } from "@/components/evaluator/MetricTile";
import { ExperimentFindingsPanel } from "@/components/evaluator/ExperimentFindingsPanel";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { MetricsResult } from "@/lib/metrics/compute";
import {
  METRIC_NAMES,
  DECISION_UNCERTAINTY_METRIC_SUBTITLE,
  PROACTIVE_REUSE_EXPLANATION,
} from "@/lib/copy/canonical";

export default function GrowthImpactMetricsPage() {
  const [metrics, setMetrics] = useState<MetricsResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/metrics");
      if (!res.ok) {
        throw new Error("Failed to load metrics");
      }
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error("Failed to fetch metrics:", err);
      setError("Failed to load growth impact metrics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const formatLiftSubline = () => {
    if (!metrics || metrics.liftVsControl.insufficientData || metrics.liftVsControl.value === null) {
      return `${METRIC_NAMES.liftLabel}: Not enough data yet`;
    }
    const val = metrics.liftVsControl.value;
    const sign = val >= 0 ? "+" : "";
    return `${METRIC_NAMES.liftLabel}: ${sign}${val.toFixed(1)} percentage points`;
  };

  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />
      <EnvironmentBadge />
      <main className="portal-container" style={{ paddingBottom: "60px" }}>
        <h1 className="type-display page-header-title">
          Does This Grow Category Exploration?
        </h1>
        <p className="type-body metrics-page-intro" style={{ color: "var(--blinkit-near-black)", marginBottom: "24px", opacity: 0.9 }}>
          Blinkit's growth goal is category breadth, not single-category recovery. Cross-Category Exploration Rate tests whether helping a customer complete an interrupted shopping mission in one category increases their willingness to start missions in new categories. The tiles below check whether the underlying mechanism is working — they don't, by themselves, indicate business impact.
        </p>

        {isLoading ? (
          <LoadingState message="Computing recovery metrics..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchMetrics} />
        ) : metrics ? (
          <div className="metrics-layout-stack" style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "36px" }}>
            {/* SUBSECTION 1: LEADING INDICATORS */}
            <section className="metrics-section-leading">
              <h2
                className="type-h1 metrics-section-heading"
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  marginBottom: "16px",
                  color: "var(--blinkit-near-black)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>⚡</span> {METRIC_NAMES.leadingSectionTitle}
              </h2>
              <div
                className="metrics-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                <MetricTile
                  title={METRIC_NAMES.missionRecoveryRate}
                  metricData={metrics.recoveryRate}
                  explanation="Measures the percentage of customers who restarted their interrupted category purchase after receiving an evidenced resolution."
                />
                <MetricTile
                  title={METRIC_NAMES.notificationOpenRate}
                  metricData={metrics.notificationOpenRate}
                  explanation="Percentage of customers who viewed or tapped the home-screen strip or push notification."
                />
                <MetricTile
                  title={METRIC_NAMES.recoveryCtaClickRate}
                  metricData={metrics.recoveryCtaClickRate}
                  explanation="Percentage of customers who interacted with or tapped the primary action on the product page."
                />
              </div>
            </section>

            {/* SUBSECTION 2: LAGGING INDICATORS */}
            <section className="metrics-section-lagging">
              <h2
                className="type-h1 metrics-section-heading"
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  marginBottom: "12px",
                  color: "var(--blinkit-near-black)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>📊</span> {METRIC_NAMES.laggingSectionTitle}
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  marginBottom: "8px",
                  lineHeight: "18px",
                }}
              >
                Tests whether resolving an obstacle-type — not a recommendation — changes exploration in categories never touched by this recovery. {DECISION_UNCERTAINTY_METRIC_SUBTITLE}
              </p>

              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--blinkit-green)",
                  marginBottom: "16px",
                  lineHeight: "18px",
                }}
              >
                {PROACTIVE_REUSE_EXPLANATION}
              </p>

              <div className="primary-metric-hero-wrapper" style={{ marginBottom: "20px" }}>
                <MetricTile
                  title={METRIC_NAMES.crossCategoryExplorationRate}
                  metricData={metrics.confidenceTransferRate}
                  isPrimary={true}
                  subline={formatLiftSubline()}
                  explanation="This is a hypothesis test, not a confirmed result. At this sample size, treat any number here as directional, not conclusive."
                />
              </div>

              <div
                className="metrics-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                <MetricTile
                  title={METRIC_NAMES.sameCategoryReturnRate}
                  metricData={metrics.sameCategoryRecoveryRate}
                  explanation="Measures repeat purchase behavior in the same category over a 30-day window."
                />
              </div>
            </section>

            {/* SUBSECTION 3: SYSTEM SAFETY & ACCURACY */}
            <section className="metrics-section-safety">
              <h2
                className="type-h1 metrics-section-heading"
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  marginBottom: "16px",
                  color: "var(--blinkit-near-black)",
                }}
              >
                Is the mechanism working safely?
              </h2>

              <div
                className="metrics-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                <MetricTile
                  title={METRIC_NAMES.classificationAccuracy}
                  metricData={metrics.classificationPrecision}
                  explanation="Measured against known-correct labels in this prototype's sample data — real-world accuracy would need to be measured differently."
                />
                <MetricTile
                  title={METRIC_NAMES.suppressionRate}
                  metricData={metrics.suppressionRate}
                  explanation="A higher number here is a sign the system is working safely by holding back when resolution evidence is unverified."
                />
              </div>
            </section>

            {/* SUBSECTION 4: EXPERIMENTATION LAYER FINDINGS */}
            <section
              className="experiment-findings-section"
              style={{
                marginTop: "16px",
                paddingTop: "32px",
                borderTop: "2px dashed var(--border-hairline, #E5E5E2)",
              }}
            >
              <h2
                className="type-h1 metrics-section-heading"
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  marginBottom: "8px",
                  color: "var(--blinkit-near-black)",
                }}
              >
                What we're learning
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  marginBottom: "20px",
                  lineHeight: "20px",
                }}
              >
                Experimentation Layer performance breakdown per failure category and messaging variant.
              </p>

              <ExperimentFindingsPanel />
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}
