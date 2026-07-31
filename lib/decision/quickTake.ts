import { computeExperimentSummary } from "@/lib/metrics/experimentSummary";

export interface QuickTakeResult {
  questionText: string;
  answerText: string;
}

export function selectQuickTake(categoryId: string = ""): QuickTakeResult {
  const normalizedCat = categoryId.toLowerCase();

  let targetFailureType = "expiry_authenticity";
  if (normalizedCat.includes("personal") || normalizedCat.includes("care") || normalizedCat.includes("skin") || normalizedCat.includes("serum")) {
    targetFailureType = "missing_information";
  } else if (normalizedCat.includes("pet") || normalizedCat.includes("dog") || normalizedCat.includes("cat")) {
    targetFailureType = "unresolved_support";
  } else if (normalizedCat.includes("electronics") || normalizedCat.includes("gadget") || normalizedCat.includes("earbuds") || normalizedCat.includes("phone")) {
    targetFailureType = "high_value_hesitation";
  }

  // Check experiment data first if available
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
          if (targetFailureType === "unresolved_support") {
            return {
              questionText: "First time buying pet food here?",
              answerText: "We check batch expiry on every bag before it leaves our dark store.",
            };
          }
          return {
            questionText: "First time ordering in this category?",
            answerText: "We inspect sealed packaging and expiry dates on every item before dispatch.",
          };
        }

        if (topRow.variant.includes("Social") || topRow.variant.includes("Review")) {
          return {
            questionText: "First time ordering skincare here?",
            answerText: "All products come sealed directly from authorized brand distributors.",
          };
        }

        if (topRow.variant.includes("Support")) {
          return {
            questionText: "First time buying pet supplies on Blinkit?",
            answerText: "Our team answers any questions or issues directly within 5 minutes.",
          };
        }

        if (topRow.variant.includes("Return") || topRow.variant.includes("Policy")) {
          return {
            questionText: "First time buying electronics on Blinkit?",
            answerText: "Every item includes a hassle-free 7-day replacement guarantee if anything goes wrong.",
          };
        }
      }
    }
  } catch (err) {
    console.error("Error computing experiment summary in selectQuickTake:", err);
  }

  // Fallback defaults per category (written like a person, not a formal report)
  if (normalizedCat.includes("pet") || normalizedCat.includes("dog") || normalizedCat.includes("cat")) {
    return {
      questionText: "First time buying pet food here?",
      answerText: "We check batch expiry on every bag before it leaves our dark store.",
    };
  }

  if (normalizedCat.includes("personal") || normalizedCat.includes("care") || normalizedCat.includes("skin") || normalizedCat.includes("serum")) {
    return {
      questionText: "First time ordering skincare here?",
      answerText: "All products come sealed directly from authorized brand distributors.",
    };
  }

  if (normalizedCat.includes("electronics") || normalizedCat.includes("gadget") || normalizedCat.includes("earbuds") || normalizedCat.includes("phone")) {
    return {
      questionText: "First time buying electronics on Blinkit?",
      answerText: "Every item includes a hassle-free 7-day replacement guarantee if anything goes wrong.",
    };
  }

  return {
    questionText: "First time ordering from this section?",
    answerText: "Fresh items are picked right before delivery, never left sitting out.",
  };
}
