import React from "react";
import { MetricDetail } from "@/lib/metrics/compute";

export interface MetricTileProps {
  title: string;
  formula?: string;
  metricData: MetricDetail;
  isPrimary?: boolean;
  subline?: React.ReactNode;
  explanation?: string;
}

export function MetricTile({
  title,
  formula,
  metricData,
  isPrimary = false,
  subline,
  explanation,
}: MetricTileProps) {
  const { value, numerator, denominator, insufficientData } = metricData;

  const formatValue = () => {
    if (insufficientData || value === null) {
      return <span className="metric-insufficient type-body">Not enough data yet</span>;
    }

    if (title.toLowerCase().includes("lift")) {
      const sign = value >= 0 ? "+" : "";
      return <span className="metric-value type-display">{sign}{value.toFixed(1)}%</span>;
    }

    return <span className="metric-value type-display">{value.toFixed(1)}%</span>;
  };

  const getProgressPercentage = () => {
    if (insufficientData || value === null) return 0;
    if (title.toLowerCase().includes("lift")) {
      return Math.max(0, Math.min(100, 50 + value));
    }
    return Math.max(0, Math.min(100, value));
  };

  return (
    <div className={`metric-tile ${isPrimary ? "metric-tile-primary" : ""}`}>
      <div className="metric-tile-header">
        <h3 className={`metric-title ${isPrimary ? "type-display" : "type-h1"}`} style={isPrimary ? { fontSize: "22px", lineHeight: "28px" } : {}}>
          {title}
        </h3>
        {formula && <p className="metric-formula type-body-sm">{formula}</p>}
      </div>

      <div className="metric-main">
        <div className="metric-value-row">
          {formatValue()}
          {!insufficientData && (
            <span className="metric-counts type-body-sm">
              ({numerator} / {denominator})
            </span>
          )}
        </div>

        {subline && (
          <div className="metric-subline type-body-sm" style={{ marginTop: "6px", fontWeight: 600, color: "var(--blinkit-green)" }}>
            {subline}
          </div>
        )}

        {/* Visual Progress Bar Encoding */}
        {!insufficientData && value !== null && (
          <div className="metric-progress-bar-track" style={{ marginTop: "10px" }}>
            <div
              className="metric-progress-bar-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        )}
      </div>

      {explanation && (
        <p className="metric-explanation type-body-sm" style={{ marginTop: "8px", color: "var(--blinkit-near-black)", opacity: 0.9 }}>
          {explanation}
        </p>
      )}

      <p className="metric-disclaimer type-body-sm" style={{ marginTop: "auto", paddingTop: "10px", borderTop: "1px solid var(--border-hairline)", color: "var(--text-muted)", fontSize: "12px" }}>
        Computed from simulated data — illustrative of the measurement mechanism, not a real result.
      </p>
    </div>
  );
}

export default MetricTile;
