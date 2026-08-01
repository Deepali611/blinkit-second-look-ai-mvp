/**
 * Stage 3: Deterministic Confidence Gate
 * 
 * Computes deterministic confidence levels directly from evidence metrics.
 * Completely separate from AI reasoning — zero LLM calls, zero self-assessment.
 * 
 * Rules:
 * - high: reorderRate >= 0.9 AND returnRate <= 0.05
 * - medium: reorderRate >= 0.75 AND returnRate <= 0.1
 * - low: reorderRate >= 0.5
 * - below_threshold: anything sparser than low tier or missing/null fields
 */

export type ConfidenceLevel = "high" | "medium" | "low" | "below_threshold";

export function computeConfidence(
  reorderRate: number | null | undefined,
  returnRate: number | null | undefined,
  sellerConsistency?: { verifiedOrderCount?: number; qualityComplaintCount?: number } | null
): ConfidenceLevel {
  // Missing or null fields fail to below_threshold
  if (
    reorderRate === null ||
    reorderRate === undefined ||
    isNaN(reorderRate) ||
    returnRate === null ||
    returnRate === undefined ||
    isNaN(returnRate)
  ) {
    return "below_threshold";
  }

  // If seller consistency has complaints or low order count, cap at low
  if (sellerConsistency && sellerConsistency.verifiedOrderCount && sellerConsistency.verifiedOrderCount < 20) {
    return "below_threshold";
  }

  if (reorderRate >= 0.9 && returnRate <= 0.05) {
    return "high";
  }

  if (reorderRate >= 0.75 && returnRate <= 0.1) {
    return "medium";
  }

  if (reorderRate >= 0.5) {
    return "low";
  }

  return "below_threshold";
}

export default computeConfidence;
