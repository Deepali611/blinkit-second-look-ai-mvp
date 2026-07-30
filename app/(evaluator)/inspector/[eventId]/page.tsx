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
import { LayerIndicator } from "@/components/evaluator/LayerIndicator";
import { DeliveryTimeline } from "@/components/evaluator/DeliveryTimeline";
import { VerificationRecordDetail } from "@/components/evaluator/VerificationRecordDetail";
import { VariantAssignmentChip } from "@/components/evaluator/VariantAssignmentChip";
import { CustomerOutcomePanel, OutcomeData } from "@/components/evaluator/CustomerOutcomePanel";
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

  // Task 33 Layer & Experiment State
  const [activeLayer, setActiveLayer] = useState<"signal" | "trust" | "growth" | "idle">("idle");
  const [experimentActive, setExperimentActive] = useState<boolean>(false);
  const [outcomeRecord, setOutcomeRecord] = useState<OutcomeData | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<{ label: string; timestamp: string }[]>([]);

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

  // Fetch Outcome for this Event
  const fetchOutcome = useCallback(async () => {
    try {
      const res = await fetch(`/api/outcome/${eventId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.outcome) {
          setOutcomeRecord(data.outcome);
        }
      }
    } catch (err) {
      console.error("Error fetching outcome:", err);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEventDetail();
    fetchOutcome();
  }, [fetchEventDetail, fetchOutcome]);

  // Stage C Execution
  const runStageC = useCallback(
    async (
      failureType: string,
      confidence: string,
      verificationStatus: string,
      evidenceData: Record<string, unknown> | null,
      classifiedTime: string
    ) => {
      setStageCStatus("loading");
      setActiveLayer("growth");

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
        setActiveLayer("idle");

        if (decision.action === "act") {
          const sentTime = new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          setTimelineEvents([
            { label: "Classified", timestamp: classifiedTime },
            { label: "Notification sent", timestamp: sentTime },
          ]);
          const hasVariant = Boolean(decision.variant || decision.treatmentGroup);
          setExperimentActive(hasVariant);
        } else {
          setTimelineEvents([]);
          setExperimentActive(false);
        }
      } catch (err) {
        console.error(err);
        setStageCStatus("error");
        setActiveLayer("idle");
      }
    },
    [eventId]
  );

  // Stage B Execution
  const runStageB = useCallback(
    async (failureType: string, confidence: string, classifiedTime: string) => {
      setStageBStatus("loading");
      setActiveLayer("trust");

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
          bData.evidenceData,
          classifiedTime
        );
      } catch (err) {
        console.error(err);
        setStageBStatus("error");
        setActiveLayer("idle");
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

    setActiveLayer("signal");
    setTimelineEvents([]);

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      if (!res.ok) throw new Error("Stage A classification failed");
      const aData: StageAData = await res.json();

      const classifiedTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

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

        // Run Stage C directly with low confidence (bypasses Trust layer)
        await runStageC(
          aData.failureType,
          "low",
          "unverifiable",
          null,
          classifiedTime
        );
      } else {
        // Proceed to Stage B (Trust layer)
        await runStageB(aData.failureType, aData.confidence, classifiedTime);
      }
    } catch (err) {
      console.error(err);
      setStageAStatus("error");
      setActiveLayer("idle");
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

        {/* Task 33: Persistent Horizontal Layer Indicator */}
        <LayerIndicator
          activeLayer={activeLayer}
          experimentActive={experimentActive}
        />

        <p className="type-body" style={{ color: "var(--blinkit-near-black)", marginBottom: "16px", opacity: 0.9 }}>
          Three steps: what went wrong, whether it's actually fixed, and what we do about it. The first step uses AI. The second is a deterministic check, not AI. The third combines both — and gets smarter over time as more cases are resolved.
        </p>

        <RawEventPanel event={event} />

        {/* Task 33: Delivery Timeline (Renders when notification sent) */}
        <DeliveryTimeline events={timelineEvents} />

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
              const classifiedTime = new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });
              runStageB(stageAData.failureType, stageAData.confidence, classifiedTime);
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

              {/* Task 33: Verification Record Details */}
              <VerificationRecordDetail
                data={stageBData.evidenceData}
                sourceChecked={stageBData.sourceChecked}
                verificationStatus={stageBData.verificationStatus}
                failureType={stageAData?.failureType}
              />
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
              const classifiedTime = new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });
              runStageC(
                stageAData.failureType,
                stageAData.confidence,
                stageBData.verificationStatus,
                stageBData.evidenceData,
                classifiedTime
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

              {/* Task 33: Variant Assignment Chip */}
              {stageCData.action === "act" && (
                <VariantAssignmentChip
                  variant={stageCData.variant || stageCData.treatmentGroup || "Treatment Variant"}
                />
              )}
            </div>
          )}
        </StageBlock>

        {/* Rendered Artifact Preview */}
        {stageCStatus === "resolved" && stageCData && (
          <>
            <RenderedArtifactPreview eventId={eventId} decisionResult={stageCData} />

            {/* Task 33: Customer Outcome Panel */}
            <CustomerOutcomePanel outcome={outcomeRecord} />

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
