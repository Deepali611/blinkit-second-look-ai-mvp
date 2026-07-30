import { getAllDecisionLogs, DecisionLogRecord } from "@/lib/db/decisionLogs";
import { getAllOutcomes, OutcomeRecord } from "@/lib/db/outcomes";
import { getAllEvents } from "@/lib/db/events";

export interface ExperimentSummaryRow {
  failureType: string;
  variant: string;
  notifiedCount: number;
  positiveOutcomeCount: number;
  rate: number | null;
}

export function computeExperimentSummary(): ExperimentSummaryRow[] {
  const decisionLogs = getAllDecisionLogs();
  const outcomes = getAllOutcomes();
  const events = getAllEvents();

  if (!decisionLogs || decisionLogs.length === 0) {
    return [];
  }

  // Create lookup for event ground truth failure type
  const eventFailureTypeMap = new Map<string, string>();
  events.forEach((evt) => {
    eventFailureTypeMap.set(evt.eventId, evt.triggerType);
  });

  // Group decision logs by failureType and variant
  const groupsMap = new Map<
    string,
    {
      failureType: string;
      variant: string;
      eventIds: Set<string>;
      notifiedCount: number;
    }
  >();

  decisionLogs.forEach((log) => {
    // Determine failureType
    const failureType =
      log.failureType ||
      eventFailureTypeMap.get(log.eventId) ||
      "general";

    // Determine variant (default variant mapping if log.variant is empty)
    let variant = log.variant;
    if (!variant) {
      if (log.treatmentGroup === "control") {
        variant = "Control (Baseline)";
      } else {
        switch (failureType) {
          case "expiry_authenticity":
            variant = "Quality Proof Variant";
            break;
          case "missing_information":
            variant = "Social Proof & Reviews Variant";
            break;
          case "unresolved_support":
            variant = "Direct Support Resolution Variant";
            break;
          case "high_value_hesitation":
            variant = "Return Policy Reassurance Variant";
            break;
          default:
            variant = "Treatment Variant";
            break;
        }
      }
    }

    const groupKey = `${failureType}::${variant}`;

    if (!groupsMap.has(groupKey)) {
      groupsMap.set(groupKey, {
        failureType,
        variant,
        eventIds: new Set<string>(),
        notifiedCount: 0,
      });
    }

    const group = groupsMap.get(groupKey)!;
    group.eventIds.add(log.eventId);
    if (log.action === "act" || log.action === "evaluated") {
      group.notifiedCount += 1;
    }
  });

  // Create lookup for positive outcomes by eventId
  const positiveOutcomeEventIds = new Set<string>();
  outcomes.forEach((out) => {
    if (
      out.outcomeType === "same_category_repurchase" ||
      out.outcomeType === "cross_category_attempt"
    ) {
      positiveOutcomeEventIds.add(out.eventId);
    }
  });

  const resultRows: ExperimentSummaryRow[] = [];

  groupsMap.forEach((group) => {
    let positiveOutcomeCount = 0;
    group.eventIds.forEach((eId) => {
      if (positiveOutcomeEventIds.has(eId)) {
        positiveOutcomeCount += 1;
      }
    });

    const rate =
      group.notifiedCount > 0
        ? positiveOutcomeCount / group.notifiedCount
        : null;

    resultRows.push({
      failureType: group.failureType,
      variant: group.variant,
      notifiedCount: group.notifiedCount,
      positiveOutcomeCount,
      rate,
    });
  });

  // Group by failureType and sort within each group by rate descending (nulls last)
  const failureTypeGroups = new Map<string, ExperimentSummaryRow[]>();
  resultRows.forEach((row) => {
    if (!failureTypeGroups.has(row.failureType)) {
      failureTypeGroups.set(row.failureType, []);
    }
    failureTypeGroups.get(row.failureType)!.push(row);
  });

  const finalSortedRows: ExperimentSummaryRow[] = [];

  failureTypeGroups.forEach((rows) => {
    rows.sort((a, b) => {
      if (a.rate === null && b.rate === null) return 0;
      if (a.rate === null) return 1;
      if (b.rate === null) return -1;
      return b.rate - a.rate;
    });
    finalSortedRows.push(...rows);
  });

  return finalSortedRows;
}
