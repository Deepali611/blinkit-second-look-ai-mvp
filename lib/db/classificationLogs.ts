// In-memory classification logs storage — resets on server restart/redeploy (known prototype limitation).

export interface ClassificationLogRecord {
  logId: string;
  eventId: string;
  failureType: string;
  confidence: string;
  loggedAt: string;
}

const classificationLogsStore: ClassificationLogRecord[] = [];

export function logClassification(
  eventId: string,
  failureType: string,
  confidence: string
): boolean {
  const record: ClassificationLogRecord = {
    logId: `class_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    eventId,
    failureType,
    confidence,
    loggedAt: new Date().toISOString(),
  };

  classificationLogsStore.push(record);
  return true;
}

export function getAllClassificationLogs(): ClassificationLogRecord[] {
  return [...classificationLogsStore];
}
