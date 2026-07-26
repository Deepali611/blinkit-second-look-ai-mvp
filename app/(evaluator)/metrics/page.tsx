"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { MetricTile } from "@/components/evaluator/MetricTile";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { MetricsResult } from "@/lib/metrics/compute";
import { BarChart3 } from "lucide-react";

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

  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />
      <main className="portal-container">
        <div className="metrics-page-header">
          <div className="metrics-header-chip">
            <BarChart3 size={16} />
            <span>Growth Hypothesis Measurement</span>
          </div>
          <h1 className="type-display page-header-title">Growth Impact & Metrics</h1>
          <p className="type-body metrics-page-intro">
            Evaluating whether resolving a customer's initial category failure rebuilds trust across Blinkit's entire store.
          </p>
        </div>

        <ScopeBanner compact={true} />

        {isLoading ? (
          <LoadingState message="Computing recovery metrics..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchMetrics} />
        ) : metrics ? (
          <div className="metrics-layout-stack">
            {/* Promoted Core Business Metric */}
            <div className="primary-metric-hero-wrapper">
              <MetricTile
                title="Customers who explored a new category after recovery"
                formula="Cross-category attempts / Total notified customers in treatment group"
                metricData={metrics.confidenceTransferRate}
                isPrimary={true}
              />
            </div>

            {/* Supporting Operational Metrics Group */}
            <div className="supporting-metrics-group">
              <h2 className="type-h1 metrics-section-heading">
                Supporting operational metrics
              </h2>

              <div className="metrics-grid">
                <MetricTile
                  title="Customers who repurchased in the same category"
                  formula="Repeat purchases in same category / Total notified customers"
                  metricData={metrics.sameCategoryRecoveryRate}
                />
                <MetricTile
                  title="Recovery lift over control group"
                  formula="Treatment recovery rate minus control recovery rate"
                  metricData={metrics.liftVsControl}
                />
                <MetricTile
                  title="How often we correctly identified the problem"
                  formula="Correct classifications / Total classifications at usable confidence"
                  metricData={metrics.classificationPrecision}
                />
                <MetricTile
                  title="Cases we correctly held back on"
                  formula="Suppressed events / Total qualifying events"
                  metricData={metrics.suppressionRate}
                />
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
