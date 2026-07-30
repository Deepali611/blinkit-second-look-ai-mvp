"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PhoneNotificationMock } from "./PhoneNotificationMock";
import { AcknowledgmentBlock } from "./AcknowledgmentBlock";
import { EvidenceBlock } from "./EvidenceBlock";
import { ResolvedBadge } from "./ResolvedBadge";
import { PrimaryCTAButton } from "./PrimaryCTAButton";
import { SecondaryOptOutLink } from "./SecondaryOptOutLink";
import { BlinkitProductPage } from "./BlinkitProductPage";
import { GlanceableTrustBadge } from "./EvidenceBlock";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { SuppressedNotice } from "@/components/shared/SuppressedNotice";
import { DecisionResult } from "@/lib/decision/decide";
import {
  Wifi,
  Battery,
  Signal,
  ChevronLeft,
  ShieldCheck,
  Home,
  Search,
  ShoppingBag,
  User,
  Zap,
  Sparkles,
  Heart,
  PackageCheck,
  ChevronRight,
} from "lucide-react";

export interface PhoneSessionProps {
  eventId: string;
  initialStage?: 0 | 1 | 2 | 3;
}

export function PhoneSession({
  eventId,
  initialStage = 0,
}: PhoneSessionProps) {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(initialStage);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [failureType, setFailureType] = useState<string>("expiry_authenticity");
  const [decision, setDecision] = useState<DecisionResult | null>(null);

  const runPipeline = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Classify
      const classifyRes = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      if (!classifyRes.ok) throw new Error("Classification failed");
      const aData = await classifyRes.json();
      setFailureType(aData.failureType);

      let verificationStatus = "unverifiable";
      let evidenceData: Record<string, unknown> | null = null;

      // Step 2: Verify if confidence is medium or high
      if (aData.confidence !== "low" && aData.failureType !== "unclear") {
        const verifyRes = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, failureType: aData.failureType }),
        });

        if (!verifyRes.ok) throw new Error("Verification failed");
        const bData = await verifyRes.json();
        verificationStatus = bData.verificationStatus;
        evidenceData = bData.evidenceData;
      }

      // Step 3: Decide
      const decideRes = await fetch("/api/decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          failureType: aData.failureType,
          confidence: aData.confidence,
          verificationStatus,
          evidenceData,
        }),
      });

      if (!decideRes.ok) throw new Error("Decision engine failed");
      const cData: DecisionResult = await decideRes.json();
      setDecision(cData);
    } catch (err) {
      console.error("PhoneSession pipeline error:", err);
      setError("Failed to load customer case. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    runPipeline();
  }, [runPipeline]);

  // Derive emphasisVariant for Stage 3 BlinkitProductPage
  const getEmphasisVariant = (): "quality" | "reviews" | "support" | "policy" => {
    switch (failureType) {
      case "missing_information":
        return "reviews";
      case "unresolved_support":
        return "support";
      case "high_value_hesitation":
        return "policy";
      case "expiry_authenticity":
      default:
        return "quality";
    }
  };

  return (
    <div
      className="phone-session-wrapper"
      style={{
        width: "375px",
        maxWidth: "100%",
        height: "680px",
        backgroundColor: "var(--blinkit-white)",
        border: "12px solid var(--blinkit-near-black)",
        borderRadius: "40px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      {/* Phone Hardware Notch */}
      <div
        className="phone-frame-notch"
        style={{
          width: "120px",
          height: "18px",
          backgroundColor: "var(--blinkit-near-black)",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
        }}
      />

      {/* Standard Phone Status Bar (Chrome) */}
      <div
        className="phone-status-bar"
        style={{
          height: "36px",
          padding: "8px 20px 0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--blinkit-near-black)",
          zIndex: 40,
          backgroundColor: stage === 1 ? "transparent" : "var(--blinkit-white)",
          userSelect: "none",
        }}
      >
        <span>10:14</span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Signal size={12} />
          <Wifi size={12} />
          <Battery size={13} />
        </div>
      </div>

      {/* Internal View Area */}
      <div
        className="phone-screen-content"
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          backgroundColor: stage === 1 ? "#e4e6eb" : "var(--blinkit-white)",
        }}
      >
        {isLoading ? (
          <div style={{ padding: "40px 16px" }}>
            <LoadingState message="Loading..." />
          </div>
        ) : error ? (
          <div style={{ padding: "40px 16px" }}>
            <ErrorState message={error} onRetry={runPipeline} />
          </div>
        ) : decision?.action === "suppress" ? (
          <div style={{ padding: "30px 16px" }}>
            <SuppressedNotice reason={decision.suppressReason || "low_confidence"} />
          </div>
        ) : decision?.action === "act" ? (
          <>
            {/* STAGE 0: Blinkit Home Screen (Primary Entry Point) */}
            <div
              className="blinkit-home-screen-background"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#F8F8F6",
                padding: "16px",
                paddingBottom: "60px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                overflowY: "auto",
                zIndex: stage === 0 ? 10 : 1,
                opacity: stage === 0 || stage === 1 ? 1 : 0,
              }}
            >
              {/* Home Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: "var(--blinkit-yellow)" }}>blink</span>
                  <span style={{ fontSize: "20px", fontWeight: 900, color: "var(--blinkit-green)" }}>it</span>
                </div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--blinkit-near-black)", backgroundColor: "#FFF", padding: "4px 8px", borderRadius: "12px", border: "1px solid var(--border-hairline)" }}>
                  ⚡ Delivery in 10 mins
                </div>
              </div>

              {/* Decorative Search Bar */}
              <div style={{ backgroundColor: "#FFF", border: "1px solid var(--border-hairline)", borderRadius: "10px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "12px" }}>
                <Search size={16} />
                <span>Search "earbuds", "serum", "dog food"...</span>
              </div>

              {/* Task 37: Native Home-Screen Resolved-Case Strip (Primary Signal) */}
              <div
                className="home-resolved-case-strip"
                onClick={() => setStage(2)}
                role="button"
                tabIndex={0}
                style={{
                  backgroundColor: "#FFF",
                  border: "1px solid rgba(84, 178, 38, 0.4)",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(84, 178, 38, 0.08)",
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(84, 178, 38, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={18} style={{ color: "var(--blinkit-green, #54B226)" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 800, color: "var(--blinkit-green, #54B226)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      Order Issue Resolved
                    </div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--blinkit-near-black, #1F1F1F)", marginTop: "1px", lineHeight: "16px" }}>
                      {decision.notificationCopy || "About your recent order — a quick update that might help."}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: "var(--blinkit-green, #54B226)", flexShrink: 0 }} />
              </div>

              {/* Category Tiles */}
              <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--blinkit-near-black)" }}>
                Categories
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ backgroundColor: "#FFF", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <PackageCheck size={20} style={{ color: "var(--blinkit-green)" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700 }}>Groceries</span>
                </div>
                <div style={{ backgroundColor: "#FFF", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Zap size={20} style={{ color: "var(--blinkit-green)" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700 }}>Electronics</span>
                </div>
                <div style={{ backgroundColor: "#FFF", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Sparkles size={20} style={{ color: "var(--blinkit-green)" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700 }}>Personal Care</span>
                </div>
                <div style={{ backgroundColor: "#FFF", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Heart size={20} style={{ color: "var(--blinkit-green)" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700 }}>Pet Supplies</span>
                </div>
              </div>
            </div>

            {/* STAGE 1: Notification Overlay (Secondary / Optional Entry Point) */}
            <div
              className={`stage-view stage-1-view ${stage === 1 ? "active" : ""}`}
              style={{
                position: "absolute",
                inset: 0,
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                transition: "opacity 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                opacity: stage === 1 ? 1 : 0,
                transform: stage === 1 ? "scale(1)" : "scale(0.95)",
                pointerEvents: stage === 1 ? "auto" : "none",
                zIndex: stage === 1 ? 20 : 1,
                backgroundColor: stage === 1 ? "rgba(0,0,0,0.2)" : "transparent",
              }}
            >
              <PhoneNotificationMock
                copyText={decision.notificationCopy || "About your recent order — a quick update that might help."}
                timestamp="Just now"
                onClick={() => setStage(2)}
              />
            </div>

            {/* STAGE 2: Notification Detail (Recovery Experience) */}
            <div
              className={`stage-view stage-2-view ${stage === 2 ? "active" : ""}`}
              style={{
                position: "absolute",
                inset: 0,
                padding: "16px",
                paddingBottom: "60px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                transition: "opacity 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                opacity: stage === 2 ? 1 : 0,
                transform: stage === 2 ? "translateX(0)" : stage === 1 ? "translateX(20px)" : "translateX(-20px)",
                pointerEvents: stage === 2 ? "auto" : "none",
                zIndex: stage === 2 ? 10 : 1,
                backgroundColor: "var(--blinkit-white)",
              }}
            >
              {/* Top Navigation Bar inside App */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button
                  type="button"
                  onClick={() => setStage(0)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "var(--blinkit-green)",
                    fontWeight: 700,
                    fontSize: "13px",
                    padding: 0,
                  }}
                >
                  <ChevronLeft size={16} /> Home
                </button>

                <ResolvedBadge label="Resolved & Verified" />
              </div>

              {/* Prominent Resolution Reassurance Banner */}
              <div
                style={{
                  backgroundColor: "rgba(84, 178, 38, 0.08)",
                  border: "1px solid rgba(84, 178, 38, 0.25)",
                  borderRadius: "14px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <ShieldCheck size={22} style={{ color: "var(--blinkit-green)", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--blinkit-near-black)" }}>
                    Order Resolution Summary
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--blinkit-near-black)", opacity: 0.85, marginTop: "2px", lineHeight: "16px" }}>
                    Verified operational records show this issue has been checked and resolved for your account.
                  </div>
                </div>
              </div>

              {/* Recovery Content & Reassurance */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <AcknowledgmentBlock failureType={failureType} />

                {decision.evidencePrimitive && (
                  <EvidenceBlock
                    variant={decision.evidencePrimitive.variant}
                    factStatement={decision.evidencePrimitive.factStatement}
                  />
                )}

                <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <PrimaryCTAButton
                    label={decision.ctaLabel || "See this product now"}
                    onClick={() => setStage(3)}
                  />
                  <SecondaryOptOutLink />
                </div>
              </div>
            </div>

            {/* STAGE 3: Product Page */}
            <div
              className={`stage-view stage-3-view ${stage === 3 ? "active" : ""}`}
              style={{
                position: "absolute",
                inset: 0,
                paddingBottom: "50px",
                transition: "opacity 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                opacity: stage === 3 ? 1 : 0,
                transform: stage === 3 ? "translateX(0)" : "translateX(30px)",
                pointerEvents: stage === 3 ? "auto" : "none",
                zIndex: stage === 3 ? 10 : 1,
                backgroundColor: "var(--blinkit-white)",
              }}
            >
              <BlinkitProductPage
                emphasisVariant={getEmphasisVariant()}
                failureType={failureType}
                factStatement={decision.evidencePrimitive?.factStatement}
                onBack={() => setStage(2)}
              />
            </div>

            {/* Functional App Bottom Navigation Bar (Home / Search / Cart / Profile) */}
            <div
              className="blinkit-app-bottom-nav"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "50px",
                backgroundColor: "#FFF",
                borderTop: "1px solid var(--border-hairline)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                zIndex: 40,
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--text-muted)",
              }}
            >
              <button
                type="button"
                onClick={() => setStage(0)}
                style={{
                  background: "none",
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  color: stage === 0 ? "var(--blinkit-green)" : "var(--text-muted)",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <Home size={18} />
                <span>Home</span>
              </button>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <Search size={18} />
                <span>Search</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <ShoppingBag size={18} />
                <span>Cart</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                <User size={18} />
                <span>Account</span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default PhoneSession;
