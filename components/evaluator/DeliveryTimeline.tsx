"use client";

import React from "react";
import { CheckCircle2, Send } from "lucide-react";

export interface DeliveryTimelineEvent {
  label: string;
  timestamp: string;
}

export interface DeliveryTimelineProps {
  events: DeliveryTimelineEvent[];
}

export function DeliveryTimeline({ events }: DeliveryTimelineProps) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div
      className="delivery-timeline-card"
      style={{
        backgroundColor: "#1F2228",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "12px",
        padding: "16px 20px",
        marginBottom: "20px",
        color: "var(--blinkit-white, #FFFFFF)",
        fontFamily: "var(--font-inter)",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "var(--blinkit-yellow, #F8CB45)",
          marginBottom: "14px",
        }}
      >
        Delivery Timeline
      </div>

      {/* Horizontal Timeline */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "relative",
          marginBottom: "14px",
        }}
      >
        {events.map((evt, idx) => (
          <React.Fragment key={idx}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                padding: "8px 12px",
                borderRadius: "8px",
                flex: 1,
              }}
            >
              {idx === 0 ? (
                <CheckCircle2 size={16} style={{ color: "var(--blinkit-green, #54B226)", flexShrink: 0 }} />
              ) : (
                <Send size={16} style={{ color: "var(--evaluator-accent, #38BDF8)", flexShrink: 0 }} />
              )}
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>{evt.label}</div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.6)", marginTop: "2px" }}>
                  {evt.timestamp}
                </div>
              </div>
            </div>
            {idx < events.length - 1 && (
              <div
                style={{
                  height: "2px",
                  width: "24px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  flexShrink: 0,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Explanatory Caption */}
      <p
        style={{
          fontSize: "12px",
          lineHeight: "17px",
          color: "rgba(255, 255, 255, 0.75)",
          margin: 0,
          fontStyle: "italic",
        }}
      >
        Acknowledgment sent at classification — before verification completes, closing the silence window the research identified as the mechanism of harm.
      </p>
    </div>
  );
}

export default DeliveryTimeline;
