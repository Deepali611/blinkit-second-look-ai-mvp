import seedData from "@/data/seed.json";
import { getAllOutcomes } from "@/lib/db/outcomes";
import { getAllDecisionLogs } from "@/lib/db/decisionLogs";
import { getAllClassificationLogs } from "@/lib/db/classificationLogs";

export interface MetricDetail {
  value: number | null;
  numerator: number;
  denominator: number;
  insufficientData: boolean;
}

export interface ComputedMetricsResult {
  recoveryRate: MetricDetail;
  liftVsControl: MetricDetail;
  confidenceTransferRate: MetricDetail;
  classificationPrecision: MetricDetail;
  suppressionRate: MetricDetail;
}

export function computeMetrics(): ComputedMetricsResult {
  const outcomes = getAllOutcomes();
  const decisionLogs = getAllDecisionLogs();
  const classificationLogs = getAllClassificationLogs();

  // Create a map for quick lookup of an event's treatmentGroup from decisionLogs
  const eventTreatmentGroupMap = new Map<string, "treatment" | "control">();
  decisionLogs.forEach((log) => {
    eventTreatmentGroupMap.set(log.eventId, log.treatmentGroup);
  });

  // 1. recoveryRate
  // numerator: same_category_repurchase where treatmentGroup === "treatment"
  // denominator: decisionLogs where action === "act" AND treatmentGroup === "treatment"
  const actTreatmentLogs = decisionLogs.filter(
    (log) => log.action === "act" && log.treatmentGroup === "treatment"
  );
  const recoveryDenominator = actTreatmentLogs.length;

  const recoveryNumerator = outcomes.filter(
    (o) =>
      o.outcomeType === "same_category_repurchase" &&
      eventTreatmentGroupMap.get(o.eventId) === "treatment"
  ).length;

  const recoveryRate: MetricDetail = {
    numerator: recoveryNumerator,
    denominator: recoveryDenominator,
    insufficientData: recoveryDenominator === 0,
    value: recoveryDenominator === 0 ? null : (recoveryNumerator / recoveryDenominator) * 100,
  };

  // 2. liftVsControl
  // Treatment group recovery rate
  const treatLogs = decisionLogs.filter((log) => log.treatmentGroup === "treatment");
  const treatDenom = treatLogs.length;
  const treatNum = outcomes.filter(
    (o) =>
      o.outcomeType === "same_category_repurchase" &&
      eventTreatmentGroupMap.get(o.eventId) === "treatment"
  ).length;
  const treatmentRate = treatDenom === 0 ? null : (treatNum / treatDenom) * 100;

  // Control group recovery rate
  const ctrlLogs = decisionLogs.filter((log) => log.treatmentGroup === "control");
  const ctrlDenom = ctrlLogs.length;
  const ctrlNum = outcomes.filter(
    (o) =>
      o.outcomeType === "same_category_repurchase" &&
      eventTreatmentGroupMap.get(o.eventId) === "control"
  ).length;
  const controlRate = ctrlDenom === 0 ? null : (ctrlNum / ctrlDenom) * 100;

  const liftInsufficient = treatDenom === 0 || ctrlDenom === 0 || treatmentRate === null || controlRate === null;
  const liftVsControl: MetricDetail = {
    numerator: treatNum,
    denominator: treatDenom,
    insufficientData: liftInsufficient,
    value: liftInsufficient ? null : treatmentRate! - controlRate!,
  };

  // 3. confidenceTransferRate
  // numerator: cross_category_attempt where treatmentGroup === "treatment"
  // denominator: decisionLogs where action === "act" AND treatmentGroup === "treatment"
  const transferDenominator = recoveryDenominator;
  const transferNumerator = outcomes.filter(
    (o) =>
      o.outcomeType === "cross_category_attempt" &&
      eventTreatmentGroupMap.get(o.eventId) === "treatment"
  ).length;

  const confidenceTransferRate: MetricDetail = {
    numerator: transferNumerator,
    denominator: transferDenominator,
    insufficientData: transferDenominator === 0,
    value: transferDenominator === 0 ? null : (transferNumerator / transferDenominator) * 100,
  };

  // 4. classificationPrecision
  // numerator: classificationLogs where logged failureType === event groundTruthFailureType
  // denominator: classificationLogs where confidence is "high" or "medium"
  const groundTruthMap = new Map<string, string>();
  seedData.failureEvents.forEach((evt) => {
    groundTruthMap.set(evt.eventId, evt.groundTruthFailureType);
  });

  const usableLogs = classificationLogs.filter(
    (log) => log.confidence === "high" || log.confidence === "medium"
  );
  const precisionDenominator = usableLogs.length;

  const precisionNumerator = usableLogs.filter((log) => {
    const groundTruth = groundTruthMap.get(log.eventId);
    return groundTruth && log.failureType === groundTruth;
  }).length;

  const classificationPrecision: MetricDetail = {
    numerator: precisionNumerator,
    denominator: precisionDenominator,
    insufficientData: precisionDenominator === 0,
    value: precisionDenominator === 0 ? null : (precisionNumerator / precisionDenominator) * 100,
  };

  // 5. suppressionRate
  // numerator: decisionLogs where action === "suppress"
  // denominator: total count of decisionLogs
  const suppressionDenominator = decisionLogs.length;
  const suppressionNumerator = decisionLogs.filter((log) => log.action === "suppress").length;

  const suppressionRate: MetricDetail = {
    numerator: suppressionNumerator,
    denominator: suppressionDenominator,
    insufficientData: suppressionDenominator === 0,
    value: suppressionDenominator === 0 ? null : (suppressionNumerator / suppressionDenominator) * 100,
  };

  return {
    recoveryRate,
    liftVsControl,
    confidenceTransferRate,
    classificationPrecision,
    suppressionRate,
  };
}
