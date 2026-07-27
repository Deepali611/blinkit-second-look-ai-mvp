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
      return (
        <span
          className="metric-value type-display"
          style={isPrimary ? { fontSize: "44px", lineHeight: "48px", fontWeight: 800 } : { fontSize: "32px", lineHeight: "36px" }}
        >
          {sign}{value.toFixed(1)}%
        </span>
      );
    }

    return (
      <span
        className="metric-value type-display"
        style={isPrimary ? { fontSize: "44px", lineHeight: "48px", fontWeight: 800 } : { fontSize: "32px", lineHeight: "36px" }}
      >
        {value.toFixed(1)}%
      </span>
    );
  };

  const getProgressPercentage = () => {
    if (insufficientData || value === null) return 0;
    if (title.toLowerCase().includes("lift")) {
      return Math.max(0, Math.min(100, 50 + value));
    }
    return Math.max(0, Math.min(100, value));
  };

  return (
    <div
      className={`metric-tile ${isPrimary ? "metric-tile-primary" : ""}`}
      style={
        isPrimary
          ? {
              backgroundColor: "var(--blinkit-white)",
              border: "1px solid var(--border-hairline)",
              borderLeft: "6px solid var(--blinkit-green)",
              borderRadius: "16px",
              padding: "28px 24px",
              boxShadow: "0 4px 20px rgba(84, 178, 38, 0.08)",
            }
          : {}
      }
    >
      <div className="metric-tile-header">
        <h3
          className={`metric-title ${isPrimary ? "type-display" : "type-h1"}`}
          style={
            isPrimary
              ? { fontSize: "24px", lineHeight: "30px", fontWeight: 800, color: "var(--blinkit-near-black)" }
              : { fontSize: "16px", lineHeight: "22px", fontWeight: 700 }
          }
        >
          {title}
        </h3>
        {formula && <p className="metric-formula type-body-sm">{formula}</p>}
      </div>

      <div className="metric-main" style={{ margin: "16px 0" }}>
        <div className="metric-value-row" style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
          {formatValue()}
          {!insufficientData && (
            <span className="metric-counts type-body-sm" style={{ fontSize: isPrimary ? "15px" : "13px" }}>
              ({numerator} / {denominator})
            </span>
          )}
        </div>

        {subline && (
          <div
            className="metric-subline type-body-sm"
            style={{
              marginTop: "8px",
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--blinkit-green)",
            }}
          >
            {subline}
          </div>
        )}

        {/* Visual Progress Bar Encoding */}
        {!insufficientData && value !== null && (
          <div className="metric-progress-bar-track" style={{ marginTop: "12px" }}>
            <div
              className="metric-progress-bar-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        )}
      </div>

      {explanation && (
        <p
          className="metric-explanation type-body-sm"
          style={{
            marginTop: "10px",
            color: "var(--blinkit-near-black)",
            fontSize: isPrimary ? "14px" : "13px",
            lineHeight: "20px",
            opacity: 0.9,
          }}
        >
          {explanation}
        </p>
      )}

      <p
        className="metric-disclaimer type-body-sm"
        style={{
          marginTop: "auto",
          paddingTop: "12px",
          borderTop: "1px solid var(--border-hairline)",
          color: "var(--text-muted)",
          fontSize: "12px",
        }}
      >
        Computed from simulated data — illustrative of the measurement mechanism, not a real result.
      </p>
    </div>
  );
}

export default MetricTile;
