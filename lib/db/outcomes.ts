// In-memory outcomes storage — resets on server restart/redeploy (known prototype limitation).

export interface OutcomeRecord {
  outcomeId: string;
  eventId: string;
  outcomeType: "same_category_repurchase" | "cross_category_attempt" | "dismissed";
  loggedAt: string;
}

export interface SessionOutcomeRecord {
  outcomeId: string;
  productId: string;
  obstacleDetected: boolean;
  obstacleType: "quality_authenticity" | string | null;
  selectedEvidence?: string | null;
  confidenceLevel: "high" | "medium" | "low" | "below_threshold" | "unverified" | string;
  verificationPassed: boolean;
  actionShown: string;
  finalOutcome: "added_to_cart" | "exited_without_purchase";
  loggedAt: string;
}

const outcomesStore: OutcomeRecord[] = [];
const sessionOutcomesStore: SessionOutcomeRecord[] = [];

export function logOutcome(
  eventId: string,
  outcomeType: "same_category_repurchase" | "cross_category_attempt" | "dismissed"
): boolean {
  const record: OutcomeRecord = {
    outcomeId: `out_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    eventId,
    outcomeType,
    loggedAt: new Date().toISOString(),
  };

  outcomesStore.push(record);
  return true;
}

export function getAllOutcomes(): OutcomeRecord[] {
  return [...outcomesStore];
}

export function getOutcomeByEventId(eventId: string): OutcomeRecord | null {
  const matching = outcomesStore.filter((r) => r.eventId === eventId);
  return matching.length > 0 ? matching[matching.length - 1] : null;
}

// Stage 6 Session Outcome Logging Functions
export function logSessionOutcome(
  data: Omit<SessionOutcomeRecord, "outcomeId" | "loggedAt">
): SessionOutcomeRecord {
  const record: SessionOutcomeRecord = {
    ...data,
    outcomeId: `sess_out_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    loggedAt: new Date().toISOString(),
  };

  sessionOutcomesStore.push(record);
  return record;
}

export function getAllSessionOutcomes(): SessionOutcomeRecord[] {
  return [...sessionOutcomesStore];
}
