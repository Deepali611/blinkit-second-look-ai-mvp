"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { RawEventPanel } from "@/components/evaluator/RawEventPanel";
import { StageBlock } from "@/components/evaluator/StageBlock";
import { ConfidenceBadge } from "@/components/evaluator/ConfidenceBadge";
import { VerificationStatusBadge } from "@/components/evaluator/VerificationStatusBadge";
import { ActionBadge } from "@/components/evaluator/ActionBadge";
import { RenderedArtifactPreview } from "@/components/evaluator/RenderedArtifactPreview";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { EventDetail } from "@/lib/db/events";
import { DecisionResult } from "@/lib/decision/decide";
import { RefreshCw, Sparkles } from "lucide-react";
import {
  STAGE_TITLES,
  STAGE_TAGS,
  ASSUMPTION_CAVEAT_SHORT,
} from "@/lib/copy/canonical";

interface StageAData {
  failureType: string;
  confidence: "high" | "medium" | "low";
  reasoning: string;
  modelCallType: "live" | "cached";
}

interface StageBData {
  verificationStatus: "verified" | "unverifiable" | "not_yet_resolved";
  evidenceData: Record<string, unknown> | null;
  sourceChecked: string;
  skipped?: boolean;
}

export default function InspectorTracePage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.eventId;

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [eventLoading, setEventLoading] = useState<boolean>(true);
  const [eventError, setEventError] = useState<string | null>(null);

  // Stage States
  const [stageAStatus, setStageAStatus] = useState<"locked" | "loading" | "resolved" | "error">("locked");
  const [stageAData, setStageAData] = useState<StageAData | null>(null);

  const [stageBStatus, setStageBStatus] = useState<"locked" | "loading" | "resolved" | "error">("locked");
  const [stageBData, setStageBData] = useState<StageBData | null>(null);

  const [stageCStatus, setStageCStatus] = useState<"locked" | "loading" | "resolved" | "error">("locked");
  const [stageCData, setStageCData] = useState<DecisionResult | null>(null);

  // Fetch Raw Event
  const fetchEventDetail = useCallback(async () => {
    setEventLoading(true);
    setEventError(null);
    try {
      const res = await fetch(`/api/events/${eventId}`);
      if (!res.ok) {
        throw new Error("Failed to load event details");
      }
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error(err);
      setEventError("Customer case not found or failed to load.");
    } finally {
      setEventLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEventDetail();
  }, [fetchEventDetail]);

  // Stage C Execution
  const runStageC = useCallback(
    async (
      failureType: string,
      confidence: string,
      verificationStatus: string,
      evidenceData: Record<string, unknown> | null
    ) => {
      setStageCStatus("loading");
      try {
        const res = await fetch("/api/decide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            failureType,
            confidence,
            verificationStatus,
            evidenceData,
          }),
        });

        if (!res.ok) throw new Error("Stage C decision failed");
        const decision: DecisionResult = await res.json();
        setStageCData(decision);
        setStageCStatus("resolved");
      } catch (err) {
        console.error(err);
        setStageCStatus("error");
      }
    },
    [eventId]
  );

  // Stage B Execution
  const runStageB = useCallback(
    async (failureType: string, confidence: string) => {
      setStageBStatus("loading");
      try {
        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, failureType }),
        });

        if (!res.ok) throw new Error("Stage B verification failed");
        const bData: StageBData = await res.json();

        setStageBData(bData);
        setStageBStatus("resolved");

        // Proceed to Stage C
        await runStageC(
          failureType,
          confidence,
          bData.verificationStatus,
          bData.evidenceData
        );
      } catch (err) {
        console.error(err);
        setStageBStatus("error");
      }
    },
    [eventId, runStageC]
  );

  // Full Pipeline Trigger
  const runPipeline = useCallback(async () => {
    // Reset Pipeline
    setStageAStatus("loading");
    setStageBStatus("locked");
    setStageCStatus("locked");
    setStageAData(null);
    setStageBData(null);
    setStageCData(null);

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      if (!res.ok) throw new Error("Stage A classification failed");
      const aData: StageAData = await res.json();

      setStageAData(aData);
      setStageAStatus("resolved");

      // Check confidence gating
      if (aData.confidence === "low" || aData.failureType === "unclear") {
        // Skip Stage B
        setStageBData({
          verificationStatus: "unverifiable",
          evidenceData: null,
          sourceChecked: "skipped",
          skipped: true,
        });
        setStageBStatus("resolved");

        // Run Stage C directly with low confidence
        await runStageC(
          aData.failureType,
          "low",
          "unverifiable",
          null
        );
      } else {
        // Proceed to Stage B
        await runStageB(aData.failureType, aData.confidence);
      }
    } catch (err) {
      console.error(err);
      setStageAStatus("error");
    }
  }, [eventId, runStageB, runStageC]);

  // Run pipeline automatically when event loads
  useEffect(() => {
    if (event) {
      runPipeline();
    }
  }, [event, runPipeline]);

  if (eventLoading) {
    return (
      <div className="portal-layout">
        <BlinkitHeader variant="evaluator" backHref="/inspector" />
        <EnvironmentBadge />
        <main className="portal-container">
          <LoadingState message="Reviewing this customer case..." />
        </main>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="portal-layout">
        <BlinkitHeader variant="evaluator" backHref="/inspector" />
        <EnvironmentBadge />
        <main className="portal-container">
          <ErrorState
            message={eventError || "Customer case not found."}
            onRetry={fetchEventDetail}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/inspector" />
      <EnvironmentBadge />
      <main className="portal-container">
        <div className="inspector-title-row">
          <h1 className="type-display page-header-title">
            How Blinkit Responded to This Case
          </h1>
          <button
            type="button"
            className="secondary-rerun-link"
            onClick={runPipeline}
            disabled={stageAStatus === "loading"}
          >
            <RefreshCw size={12} className={stageAStatus === "loading" ? "loading-spinner" : ""} />
            <span>See this decided again</span>
          </button>
        </div>

        <p className="type-body" style={{ color: "var(--blinkit-near-black)", marginBottom: "16px", opacity: 0.9 }}>
          Three steps: what went wrong, whether it's actually fixed, and what we do about it. The first step uses AI. The second is a deterministic check, not AI. The third combines both — and gets smarter over time as more cases are resolved.
        </p>

        <RawEventPanel event={event} />

        {/* Stage A */}
        <StageBlock
          title={STAGE_TITLES.stageA}
          tag={STAGE_TAGS.stageA}
          subtitle={stageAData?.modelCallType === "cached" ? "Using seed cache fallback" : "Live AI model classification"}
          status={stageAStatus}
          onRetry={runPipeline}
        >
          {stageAData && (
            <div className="stage-result-content">
              <div className="stage-result-row" style={{ flexWrap: "wrap" }}>
                <ConfidenceBadge level={stageAData.confidence} />
                <span className="type-body-sm confidence-explainer">
                  • How sure the system is before it acts on this customer's behalf.
                </span>
              </div>
              <div className="stage-result-row" style={{ marginTop: "8px" }}>
                <span className="type-h1" style={{ fontSize: "15px" }}>
                  Classified Failure: <strong>{stageAData.failureType}</strong>
                </span>
              </div>
              <div className="stage-reasoning-box type-body">
                <strong>AI Reasoning:</strong> {stageAData.reasoning}
              </div>
            </div>
          )}
        </StageBlock>

        {/* Stage B */}
        <StageBlock
          title={STAGE_TITLES.stageB}
          tag={STAGE_TAGS.stageB}
          subtitle="Rule-based deterministic verification against operational records"
          status={stageBStatus}
          onRetry={() => {
            if (stageAData) {
              runStageB(stageAData.failureType, stageAData.confidence);
            }
          }}
        >
          {stageBData && (
            <div className="stage-result-content">
              <p className="type-body-sm" style={{ color: "var(--text-muted)", marginBottom: "4px" }}>
                This step is a direct lookup against operational records — deliberately not AI, because a resolution claim this consequential should never depend on a probabilistic guess.
              </p>
              {stageBData.skipped ? (
                <p className="type-body" style={{ color: "var(--text-muted)" }}>
                  Skipped — low confidence or unclear signal
                </p>
              ) : (
                <div className="stage-result-row">
                  <VerificationStatusBadge status={stageBData.verificationStatus} />
                  <span className="type-body">
                    Operational Source Checked: <code>{stageBData.sourceChecked}</code>
                  </span>
                </div>
              )}
            </div>
          )}
        </StageBlock>

        {/* Stage C */}
        <StageBlock
          title={STAGE_TITLES.stageC}
          tag={STAGE_TAGS.stageC}
          subtitle="Decision policy & customer artifact selection"
          status={stageCStatus}
          onRetry={() => {
            if (stageAData && stageBData) {
              runStageC(
                stageAData.failureType,
                stageAData.confidence,
                stageBData.verificationStatus,
                stageBData.evidenceData
              );
            }
          }}
        >
          {stageCData && (
            <div className="stage-result-content">
              <div className="stage-result-row">
                <ActionBadge action={stageCData.action} />
                {stageCData.action === "act" && stageCData.ctaLabel && (
                  <span className="type-body-sm">
                    Target Destination: <strong>{stageCData.ctaLabel}</strong> ({stageCData.ctaDestination})
                  </span>
                )}
              </div>
              {stageCData.evidencePrimitive && (
                <div className="stage-reasoning-box type-body">
                  <strong>Selected Evidence:</strong> {stageCData.evidencePrimitive.factStatement}
                </div>
              )}
            </div>
          )}
        </StageBlock>

        {/* Rendered Artifact Preview */}
        {stageCStatus === "resolved" && stageCData && (
          <>
            <RenderedArtifactPreview eventId={eventId} decisionResult={stageCData} />

            {stageCData.action === "act" && (
              <div className="growth-hypothesis-footer type-body">
                <Sparkles size={16} className="growth-icon" />
                <span>
                  If this works, this customer doesn't just return to this category — they may be more willing to explore others too. <em>{ASSUMPTION_CAVEAT_SHORT}</em>
                </span>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
