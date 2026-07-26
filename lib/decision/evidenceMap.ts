export interface EvidencePrimitive {
  variant: string;
  factStatement: string;
}

export function selectEvidencePrimitive(
  failureType: string,
  verificationStatus: string,
  evidenceData: Record<string, unknown> | null
): EvidencePrimitive {
  if (
    verificationStatus === "unverifiable" ||
    verificationStatus === "not_yet_resolved"
  ) {
    return {
      variant: "acknowledgment_only",
      factStatement: "We're looking into what happened here.",
    };
  }

  if (verificationStatus === "verified" && evidenceData) {
    switch (failureType) {
      case "expiry_authenticity":
        return {
          variant: "expiry_authenticity",
          factStatement: `This vendor has passed quality verification on every order since ${evidenceData.lastCheckedDate}.`,
        };
      case "missing_information":
        return {
          variant: "missing_information",
          factStatement: `${evidenceData.reviewCount} verified buyers in this category have reviewed this since your order.`,
        };
      case "unresolved_support":
        return {
          variant: "unresolved_support",
          factStatement: `Your request was resolved on ${evidenceData.resolvedDate}: ${evidenceData.resolutionNote}.`,
        };
      case "high_value_hesitation":
        return {
          variant: "high_value_hesitation",
          factStatement: `Items in this category are eligible for ${evidenceData.policyDays}-day returns.`,
        };
    }
  }

  return {
    variant: "acknowledgment_only",
    factStatement: "We're looking into what happened here.",
  };
}
