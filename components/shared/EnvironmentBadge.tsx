"use client";

import React, { useState } from "react";
import { Info, X } from "lucide-react";
import { SCOPE_BANNER_FULL } from "@/lib/copy/canonical";

export function EnvironmentBadge() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="environment-badge-fixed-container"
      style={{
        position: "fixed",
        top: "16px",
        right: "20px",
        zIndex: 9999,
        fontFamily: "var(--font-inter)",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "rgba(248, 203, 69, 0.15)",
          border: "1px solid rgba(248, 203, 69, 0.4)",
          color: "#F8CB45",
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          transition: "all 0.2s ease",
        }}
      >
        <Info size={14} />
        <span>Prototype · Simulated Data</span>
      </button>

      {isOpen && (
        <div
          className="environment-badge-popover"
          onMouseLeave={() => setIsOpen(false)}
          style={{
            position: "absolute",
            top: "36px",
            right: "0",
            width: "320px",
            backgroundColor: "#1F2228",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            color: "var(--blinkit-white)",
            fontSize: "12px",
            lineHeight: "18px",
            zIndex: 10000,
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontWeight: 700, color: "var(--blinkit-yellow)" }}>Scope & Context</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: 0 }}
            >
              <X size={14} />
            </button>
          </div>
          <p style={{ margin: 0, opacity: 0.9 }}>{SCOPE_BANNER_FULL}</p>
        </div>
      )}
    </div>
  );
}

export default EnvironmentBadge;
