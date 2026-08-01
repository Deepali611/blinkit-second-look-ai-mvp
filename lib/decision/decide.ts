import { selectEvidencePrimitive, EvidencePrimitive } from "./evidenceMap";
import { selectCTA } from "./ctaMap";

export interface DecisionResult {
  action: "act" | "suppress";
  suppressReason?: string;
  evidencePrimitive?: EvidencePrimitive;
  recommendedAction?: "highlight_seller" | "jump_to_reviews" | "emphasize_guarantee" | "focus_cta" | "no_action";
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
  // Gated by separate deterministic confidence layer
  if (confidence === "low" || failureType === "unclear" || verificationStatus === "unverifiable") {
    return {
      action: "suppress",
      suppressReason: "low_confidence",
      recommendedAction: "no_action",
    };
  }

  const evidencePrimitive = selectEvidencePrimitive(
    failureType,
    verificationStatus,
    evidenceData
  );

  const { ctaLabel, ctaDestination } = selectCTA(failureType, eventId);

  // Single AI Reasoning Action Selection from fixed action set
  let recommendedAction: "highlight_seller" | "jump_to_reviews" | "emphasize_guarantee" | "focus_cta" | "no_action" = "highlight_seller";
  
  if (failureType === "expiry_authenticity") {
    recommendedAction = "highlight_seller";
  } else if (failureType === "missing_information") {
    recommendedAction = "jump_to_reviews";
  } else if (failureType === "high_value_hesitation") {
    recommendedAction = "emphasize_guarantee";
  } else if (failureType === "unresolved_support") {
    recommendedAction = "focus_cta";
  }

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
    recommendedAction,
    ctaDestination,
    ctaLabel,
    notificationCopy,
    variant,
  };
}
