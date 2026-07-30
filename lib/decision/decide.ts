import { selectEvidencePrimitive, EvidencePrimitive } from "./evidenceMap";
import { selectCTA } from "./ctaMap";

export interface DecisionResult {
  action: "act" | "suppress";
  suppressReason?: string;
  evidencePrimitive?: EvidencePrimitive;
  ctaDestination?: string;
  ctaLabel?: string;
  notificationCopy?: string;
  variant?: string;
  treatmentGroup?: string;
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

  let notificationCopy = "About your recent order — a quick update that might help.";
  switch (failureType) {
    case "expiry_authenticity":
      notificationCopy =
        "About your order from 10 May — we noticed a quality issue and wanted to update you.";
      break;
    case "missing_information":
      notificationCopy =
        "Following up on your recent order — more information is now available.";
      break;
    case "unresolved_support":
      notificationCopy =
        "About your support request — here's where things stand.";
      break;
    case "high_value_hesitation":
      notificationCopy =
        "About your recent order — a quick update that might help.";
      break;
  }

  // Derive variant label for experiment tracking
  const variant = failureType === "expiry_authenticity"
    ? "Quality Proof"
    : failureType === "missing_information"
    ? "Social Proof & Reviews"
    : failureType === "unresolved_support"
    ? "Direct Support Resolution"
    : "Return Policy Reassurance";

  return {
    action: "act",
    evidencePrimitive,
    ctaDestination,
    ctaLabel,
    notificationCopy,
    variant,
  };
}
