"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { EvaluatorOnlyRibbon } from "@/components/evaluator/EvaluatorOnlyRibbon";
import { PhoneFrame } from "@/components/customer/PhoneFrame";
import { PhoneNotificationMock } from "@/components/customer/PhoneNotificationMock";
import { SuppressedNotice } from "@/components/shared/SuppressedNotice";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { DecisionResult } from "@/lib/decision/decide";

export default function NotificationSimulationPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const eventId = resolvedParams.eventId;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [decision, setDecision] = useState<DecisionResult | null>(null);

  const runNotificationPipeline = useCallback(async () => {
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

      setDecision(cData);
    } catch (err) {
      console.error("Pipeline error in notification simulation:", err);
      setError("Failed to run pipeline simulation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    runNotificationPipeline();
  }, [runNotificationPipeline]);

  const handleNotificationClick = () => {
    router.push(`/second-look/${eventId}`);
  };

  return (
    <div className="customer-simulation-layout">
      <EvaluatorOnlyRibbon />

      <main className="customer-simulation-container">
        {isLoading ? (
          <LoadingState message="Generating simulated notification..." />
        ) : error ? (
          <ErrorState message={error} onRetry={runNotificationPipeline} />
        ) : decision?.action === "suppress" ? (
          <SuppressedNotice reason={decision.suppressReason || "low_confidence"} />
        ) : decision?.action === "act" && decision.notificationCopy ? (
          <PhoneFrame>
            <PhoneNotificationMock
              copyText={decision.notificationCopy}
              timestamp="Just now"
              onClick={handleNotificationClick}
            />
          </PhoneFrame>
        ) : null}
      </main>
    </div>
  );
}
