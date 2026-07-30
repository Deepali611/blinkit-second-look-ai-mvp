"use client";

import React from "react";

export interface LayerIndicatorProps {
  activeLayer: "signal" | "trust" | "growth" | "idle";
  experimentActive: boolean;
}

export function LayerIndicator({
  activeLayer,
  experimentActive,
}: LayerIndicatorProps) {
  const segments = [
    { key: "signal", label: "Signal", isActive: activeLayer === "signal" },
    { key: "trust", label: "Trust", isActive: activeLayer === "trust" },
    { key: "growth", label: "Growth", isActive: activeLayer === "growth" },
    {
      key: "experimentation",
      label: "Experimentation",
      isActive: experimentActive,
      isExperiment: true,
    },
  ];

  return (
    <div
      className="layer-indicator-strip"
      style={{
        width: "100%",
        backgroundColor: "#1F2228",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "10px",
        padding: "6px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "6px",
        marginBottom: "20px",
        fontFamily: "var(--font-inter)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      {segments.map((seg) => {
        let bg = "rgba(255, 255, 255, 0.06)";
        let textColor = "rgba(255, 255, 255, 0.5)";
        let fontWeight = 500;

        if (seg.isExperiment && experimentActive) {
          bg = "var(--evaluator-accent, #38BDF8)";
          textColor = "#14161A";
          fontWeight = 700;
        } else if (seg.isActive) {
          bg = "var(--blinkit-green, #54B226)";
          textColor = "#FFFFFF";
          fontWeight = 700;
        }

        return (
          <div
            key={seg.key}
            style={{
              backgroundColor: bg,
              color: textColor,
              fontWeight,
              fontSize: "12px",
              padding: "8px 12px",
              borderRadius: "6px",
              textAlign: "center",
              transition: "all 200ms ease-out",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <span>{seg.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default LayerIndicator;
