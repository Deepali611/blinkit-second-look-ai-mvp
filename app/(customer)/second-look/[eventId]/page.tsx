"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { EvaluatorOnlyRibbon } from "@/components/evaluator/EvaluatorOnlyRibbon";
import { MinimalHeader } from "@/components/customer/MinimalHeader";
import { AcknowledgmentBlock } from "@/components/customer/AcknowledgmentBlock";
import { EvidenceBlock } from "@/components/customer/EvidenceBlock";
import { PrimaryCTAButton } from "@/components/customer/PrimaryCTAButton";
import { SecondaryOptOutLink } from "@/components/customer/SecondaryOptOutLink";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { DecisionResult } from "@/lib/decision/decide";

interface PipelineData {
  failureType: string;
  decision: DecisionResult;
}

export default function SecondLookPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.eventId;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pipelineData, setPipelineData] = useState<PipelineData | null>(null);

  const runSecondLookPipeline = useCallback(async () => {
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

      setPipelineData({
        failureType: aData.failureType,
        decision: cData,
      });
    } catch (err) {
      console.error("Second look pipeline execution error:", err);
      setError("We're looking into something with your recent order.");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    runSecondLookPipeline();
  }, [runSecondLookPipeline]);

  return (
    <div className="second-look-page-wrapper">
      <EvaluatorOnlyRibbon text="Simulated customer screen" />

      <main className="second-look-container">
        {isLoading ? (
          <LoadingState message="Loading your update..." />
        ) : error ? (
          <ErrorState message={error} onRetry={runSecondLookPipeline} />
        ) : pipelineData?.decision.action === "suppress" ? (
          <ErrorState message="This link is no longer valid." />
        ) : pipelineData?.decision.action === "act" &&
          pipelineData.decision.evidencePrimitive ? (
          <div className="second-look-content-column">
            <MinimalHeader />

            <AcknowledgmentBlock failureType={pipelineData.failureType} />

            <EvidenceBlock
              variant={pipelineData.decision.evidencePrimitive.variant}
              factStatement={pipelineData.decision.evidencePrimitive.factStatement}
            />

            <div className="second-look-actions-block">
              <PrimaryCTAButton
                label={pipelineData.decision.ctaLabel || "View details"}
                href={pipelineData.decision.ctaDestination || "/"}
              />

              <SecondaryOptOutLink />
            </div>
          </div>
        ) : (
          <ErrorState message="This link is no longer valid." />
        )}
      </main>
    </div>
  );
}
