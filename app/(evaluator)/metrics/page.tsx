"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { MetricTile } from "@/components/evaluator/MetricTile";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { ComputedMetricsResult } from "@/lib/metrics/compute";

export default function MetricsDashboardPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ComputedMetricsResult | null>(null);

  const fetchMetrics = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/metrics");
      if (!res.ok) throw new Error("Failed to fetch metrics");
      const data: ComputedMetricsResult = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load metrics. Please try again.");
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
        <h1 className="type-display page-header-title">Metrics Dashboard</h1>
        <ScopeBanner compact={true} />

        {isLoading ? (
          <LoadingState message="Computing system metrics..." />
        ) : error || !metrics ? (
          <ErrorState
            message={error || "Unable to compute metrics."}
            onRetry={fetchMetrics}
          />
        ) : (
          <div className="metrics-grid">
            {/* Primary Tile: Confidence-Transfer Rate FIRST */}
            <MetricTile
              title="Confidence-Transfer Rate"
              formula="Cross-category attempts / Total notified customers"
              metricData={metrics.confidenceTransferRate}
              isPrimary={true}
            />

            <MetricTile
              title="Same-Category Recovery Rate"
              formula="Repeat purchases in same category / Total notified customers"
              metricData={metrics.recoveryRate}
            />

            <MetricTile
              title="Lift vs Control"
              formula="Treatment recovery rate minus control recovery rate"
              metricData={metrics.liftVsControl}
            />

            <MetricTile
              title="Classification Precision"
              formula="Correct classifications / Total classifications at usable confidence"
              metricData={metrics.classificationPrecision}
            />

            <MetricTile
              title="Suppression Rate"
              formula="Suppressed events / Total qualifying events"
              metricData={metrics.suppressionRate}
            />
          </div>
        )}
      </main>
    </div>
  );
}
