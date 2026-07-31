import { computeExperimentSummary } from "@/lib/metrics/experimentSummary";

export interface LeadEvidenceResult {
  badgeLabel: string;
  variant: "quality" | "reviews" | "support" | "policy";
}

export function selectLeadEvidence(categoryId: string = ""): LeadEvidenceResult {
  const normalizedCat = categoryId.toLowerCase();

  let targetFailureType = "expiry_authenticity";
  if (normalizedCat.includes("personal") || normalizedCat.includes("care") || normalizedCat.includes("skin")) {
    targetFailureType = "missing_information";
  } else if (normalizedCat.includes("pet") || normalizedCat.includes("dog") || normalizedCat.includes("cat")) {
    targetFailureType = "unresolved_support";
  } else if (normalizedCat.includes("electronics") || normalizedCat.includes("gadget") || normalizedCat.includes("phone")) {
    targetFailureType = "high_value_hesitation";
  }

  try {
    const summary = computeExperimentSummary();

    if (summary && summary.length > 0) {
      const categoryRows = summary.filter(
        (r) =>
          r.failureType === targetFailureType &&
          r.rate !== null &&
          r.notifiedCount > 0
      );

      if (categoryRows.length > 0) {
        categoryRows.sort((a, b) => (b.rate || 0) - (a.rate || 0));
        const topRow = categoryRows[0];

        if (topRow.variant.includes("Quality")) {
          return {
            badgeLabel: "Quality checked on every order in this category",
            variant: "quality",
          };
        }
        if (topRow.variant.includes("Social") || topRow.variant.includes("Review")) {
          return {
            badgeLabel: "4.2★ verified buyer reviews active in this category",
            variant: "reviews",
          };
        }
        if (topRow.variant.includes("Support")) {
          return {
            badgeLabel: "Verified 24/7 support resolution on this category",
            variant: "support",
          };
        }
        if (topRow.variant.includes("Return") || topRow.variant.includes("Policy")) {
          return {
            badgeLabel: "7-Day replacement guarantee on this category",
            variant: "policy",
          };
        }
      }
    }
  } catch (err) {
    console.error("Error computing experiment summary in selectLeadEvidence:", err);
  }

  // Fallback defaults per category when no experiment data exists yet
  if (normalizedCat.includes("pet") || normalizedCat.includes("dog") || normalizedCat.includes("cat")) {
    return {
      badgeLabel: "Quality checked on every pet supplies order",
      variant: "support",
    };
  }
  if (normalizedCat.includes("personal") || normalizedCat.includes("care") || normalizedCat.includes("skin")) {
    return {
      badgeLabel: "4.2★ verified buyer reviews on personal care",
      variant: "reviews",
    };
  }
  if (normalizedCat.includes("electronics") || normalizedCat.includes("gadget") || normalizedCat.includes("phone")) {
    return {
      badgeLabel: "7-Day replacement guarantee on electronics",
      variant: "policy",
    };
  }

  return {
    badgeLabel: "Quality & freshness verified on every grocery order",
    variant: "quality",
  };
}
