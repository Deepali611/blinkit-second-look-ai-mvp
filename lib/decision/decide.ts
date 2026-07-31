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

  let notificationCopy = "Here's what's changed — decision details updated for your order.";
  switch (failureType) {
    case "expiry_authenticity":
      notificationCopy =
        "Here's what's changed — quality check details for your item are updated.";
      break;
    case "missing_information":
      notificationCopy =
        "What you asked about, answered — customer reviews and details added.";
      break;
    case "unresolved_support":
      notificationCopy =
        "Here's what's changed — your support resolution is ready.";
      break;
    case "high_value_hesitation":
      notificationCopy =
        "What you asked about, answered — protection and replacement details.";
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
