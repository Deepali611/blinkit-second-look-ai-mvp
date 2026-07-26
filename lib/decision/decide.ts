import { selectEvidencePrimitive, EvidencePrimitive } from "./evidenceMap";
import { selectCTA } from "./ctaMap";

export interface DecisionResult {
  action: "act" | "suppress";
  suppressReason?: string;
  evidencePrimitive?: EvidencePrimitive;
  ctaDestination?: string;
  ctaLabel?: string;
  notificationCopy?: string;
}

export function makeDecision(
  eventId: string,
  failureType: string,
  confidence: string,
  verificationStatus: string,
  evidenceData: Record<string, unknown> | null
): DecisionResult {
  if (confidence === "low" || failureType === "unclear") {
    return {
      action: "suppress",
      suppressReason: "low_confidence",
    };
  }

  const evidencePrimitive = selectEvidencePrimitive(
    failureType,
    verificationStatus,
    evidenceData
  );

  const { ctaLabel, ctaDestination } = selectCTA(failureType, eventId);

  let notificationCopy = "We have an update regarding your recent order.";
  switch (failureType) {
    case "expiry_authenticity":
      notificationCopy =
        "We noticed an issue with a recent order — here's what's changed.";
      break;
    case "missing_information":
      notificationCopy =
        "Looking for more details on your recent order? Reviews have been updated.";
      break;
    case "unresolved_support":
      notificationCopy = "Your recent support request has been updated.";
      break;
    case "high_value_hesitation":
      notificationCopy =
        "Want peace of mind on your next purchase? Check out our return guarantee.";
      break;
  }

  return {
    action: "act",
    evidencePrimitive,
    ctaDestination,
    ctaLabel,
    notificationCopy,
  };
}
