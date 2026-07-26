import { getVerificationRecord } from "@/lib/db/verification";
import { getEventById } from "@/lib/db/events";
import seedData from "@/data/seed.json";

export interface VerificationResult {
  verificationStatus: "verified" | "not_yet_resolved" | "unverifiable";
  evidenceData: Record<string, unknown> | null;
  sourceChecked: string;
}

const VALID_FAILURE_TYPES = new Set([
  "expiry_authenticity",
  "missing_information",
  "unresolved_support",
  "high_value_hesitation",
  "unclear",
]);

export function verifyFailure(
  eventId: string,
  failureType: string
): VerificationResult {
  try {
    if (!VALID_FAILURE_TYPES.has(failureType)) {
      return {
        verificationStatus: "unverifiable",
        evidenceData: null,
        sourceChecked: "error_fallback",
      };
    }

    const verificationEntry = getVerificationRecord(eventId);
    const record = verificationEntry?.record ?? null;

    switch (failureType) {
      case "expiry_authenticity": {
        const sourceChecked = "vendor_compliance_table";
        if (record && record.status === "compliant_since_incident") {
          return {
            verificationStatus: "verified",
            evidenceData: record as Record<string, unknown>,
            sourceChecked,
          };
        }
        return {
          verificationStatus: "unverifiable",
          evidenceData: null,
          sourceChecked,
        };
      }

      case "missing_information": {
        const sourceChecked = "reviews_table";
        if (
          record &&
          typeof record.reviewCount === "number" &&
          record.reviewCount > 0
        ) {
          return {
            verificationStatus: "verified",
            evidenceData: record as Record<string, unknown>,
            sourceChecked,
          };
        }
        return {
          verificationStatus: "unverifiable",
          evidenceData: null,
          sourceChecked,
        };
      }

      case "unresolved_support": {
        const sourceChecked = "tickets_table";
        if (!record) {
          return {
            verificationStatus: "unverifiable",
            evidenceData: null,
            sourceChecked,
          };
        }
        if (record.ticketStatus === "resolved" && record.resolvedDate) {
          return {
            verificationStatus: "verified",
            evidenceData: record as Record<string, unknown>,
            sourceChecked,
          };
        }
        return {
          verificationStatus: "not_yet_resolved",
          evidenceData: record as Record<string, unknown>,
          sourceChecked,
        };
      }

      case "high_value_hesitation": {
        const sourceChecked = "return_policy_table";
        const eventDetail = getEventById(eventId);

        let policyDays = 7;
        let policySummary = "Standard return policy applies";

        if (eventDetail) {
          const categoryObj = seedData.categories.find(
            (cat) => cat.name === eventDetail.category
          );
          if (categoryObj) {
            policyDays = categoryObj.returnPolicyDays;
            policySummary = categoryObj.returnPolicySummary;
          }
        }

        return {
          verificationStatus: "verified",
          evidenceData: {
            policyDays,
            policySummary,
          },
          sourceChecked,
        };
      }

      case "unclear":
      default:
        return {
          verificationStatus: "unverifiable",
          evidenceData: null,
          sourceChecked: failureType === "unclear" ? "none" : "error_fallback",
        };
    }
  } catch (err) {
    console.error("Error in verifyFailure rule evaluation:", err);
    return {
      verificationStatus: "unverifiable",
      evidenceData: null,
      sourceChecked: "error_fallback",
    };
  }
}
