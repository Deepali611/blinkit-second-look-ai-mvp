import seedData from "@/data/seed.json";

export interface VerificationRecordEntry {
  source: string;
  record: Record<string, unknown> | null;
}

export function getVerificationRecord(eventId: string): VerificationRecordEntry | null {
  const verificationData = seedData.verificationData as Record<
    string,
    VerificationRecordEntry
  >;

  return verificationData[eventId] ?? null;
}
