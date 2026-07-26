import React from "react";
import { MetricDetail } from "@/lib/metrics/compute";

export interface MetricTileProps {
  title: string;
  formula: string;
  metricData: MetricDetail;
  isPrimary?: boolean;
}

export function MetricTile({
  title,
  formula,
  metricData,
  isPrimary = false,
}: MetricTileProps) {
  const { value, numerator, denominator, insufficientData } = metricData;

  const formatValue = () => {
    if (insufficientData || value === null) {
      return <span className="metric-insufficient type-body">Not enough data yet</span>;
    }

    if (title.includes("Lift")) {
      const sign = value >= 0 ? "+" : "";
      return <span className="metric-value type-display">{sign}{value.toFixed(1)}%</span>;
    }

    return <span className="metric-value type-display">{value.toFixed(1)}%</span>;
  };

  return (
    <div className={`metric-tile ${isPrimary ? "metric-tile-primary" : ""}`}>
      <p className="metric-formula type-body-sm">{formula}</p>

      <h3 className={`metric-title ${isPrimary ? "type-display" : "type-h1"}`}>
        {title}
      </h3>

      <div className="metric-main">
        {formatValue()}
        {!insufficientData && (
          <span className="metric-counts type-body-sm">
            ({numerator} / {denominator})
          </span>
        )}
      </div>

      <p className="metric-disclaimer type-body-sm">
        Computed from simulated data — illustrative of the measurement mechanism, not a real result.
      </p>
    </div>
  );
}

export default MetricTile;
