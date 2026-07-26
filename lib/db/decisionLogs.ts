// In-memory decision logs storage — resets on server restart/redeploy (known prototype limitation).

export interface DecisionLogRecord {
  logId: string;
  eventId: string;
  action: string;
  treatmentGroup: "treatment" | "control";
  loggedAt: string;
}

const decisionLogsStore: DecisionLogRecord[] = [];

export function logDecision(
  eventId: string,
  action: string,
  treatmentGroup: "treatment" | "control"
): boolean {
  const record: DecisionLogRecord = {
    logId: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    eventId,
    action,
    treatmentGroup,
    loggedAt: new Date().toISOString(),
  };

  decisionLogsStore.push(record);
  return true;
}

export function getAllDecisionLogs(): DecisionLogRecord[] {
  return [...decisionLogsStore];
}

export function getTreatmentGroupForEvent(
  eventId: string,
  action = "evaluated"
): "treatment" | "control" {
  const existing = decisionLogsStore.find((log) => log.eventId === eventId);
  if (existing) {
    return existing.treatmentGroup;
  }

  // 50/50 Randomization for prototype evaluation
  const assignedGroup: "treatment" | "control" =
    Math.random() < 0.5 ? "treatment" : "control";
  logDecision(eventId, action, assignedGroup);
  return assignedGroup;
}
