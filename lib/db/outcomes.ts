// In-memory outcomes storage — resets on server restart/redeploy (known prototype limitation).

export interface OutcomeRecord {
  outcomeId: string;
  eventId: string;
  outcomeType: "same_category_repurchase" | "cross_category_attempt" | "dismissed";
  loggedAt: string;
}

const outcomesStore: OutcomeRecord[] = [];

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
