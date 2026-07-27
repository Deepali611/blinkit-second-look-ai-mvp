"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { MetricTile } from "@/components/evaluator/MetricTile";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { MetricsResult } from "@/lib/metrics/compute";
import { METRIC_NAMES, ASSUMPTION_CAVEAT_SHORT } from "@/lib/copy/canonical";

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
      <main className="portal-container">
        <h1 className="type-display page-header-title">
          Does This Grow Category Exploration?
        </h1>
        <p className="type-body metrics-page-intro" style={{ color: "var(--blinkit-near-black)", marginBottom: "20px", opacity: 0.9 }}>
          Blinkit's growth goal is category breadth, not single-category recovery. Cross-Category Exploration Rate is the number that answers that question directly. The tiles below it check whether the underlying mechanism is working — they don't, by themselves, indicate business impact.
        </p>

        <ScopeBanner variant="full" />

        {isLoading ? (
          <LoadingState message="Computing recovery metrics..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchMetrics} />
        ) : metrics ? (
          <div className="metrics-layout-stack" style={{ marginTop: "24px" }}>
            {/* TIER 1 (large, alone, at the top) */}
            <div className="primary-metric-hero-wrapper" style={{ marginBottom: "32px" }}>
              <MetricTile
                title={METRIC_NAMES.crossCategoryExplorationRate}
                metricData={metrics.confidenceTransferRate}
                isPrimary={true}
                subline={formatLiftSubline()}
                explanation={`This is a hypothesis test, not a confirmed result. At this sample size, treat any number here as directional, not conclusive. ${ASSUMPTION_CAVEAT_SHORT}`}
              />
            </div>

            {/* Subheading below Tier 1 */}
            <div className="supporting-metrics-group">
              <h2 className="type-h1 metrics-section-heading" style={{ fontSize: "20px", marginBottom: "16px", color: "var(--blinkit-near-black)" }}>
                Is the mechanism working?
              </h2>

              {/* TIER 2 (smaller, grouped in a row/grid below subheading) */}
              <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                <MetricTile
                  title={METRIC_NAMES.sameCategoryReturnRate}
                  metricData={metrics.recoveryRate}
                  explanation="This checks whether the recovery mechanism works at all — it does not, by itself, indicate progress on Blinkit's stated goal."
                />
                <MetricTile
                  title={METRIC_NAMES.classificationAccuracy}
                  metricData={metrics.classificationPrecision}
                  explanation="Measured against known-correct labels in this prototype's sample data — real-world accuracy would need to be measured differently, since real cases have no pre-known correct answer."
                />
                <MetricTile
                  title={METRIC_NAMES.suppressionRate}
                  metricData={metrics.suppressionRate}
                  explanation="A higher number here is a sign the system is working safely, not a shortfall."
                />
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
