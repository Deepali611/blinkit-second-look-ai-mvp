/**
 * Stage 1: Deterministic Behavioral Obstacle Detection
 * 
 * Evaluates real-time session signals to detect Quality/Authenticity purchase hesitation.
 * Rule: obstacleDetected = true ONLY IF didOpenReviews === true AND reviewsDwellTimeSeconds > 15 AND didAddToCart === false.
 * 
 * Completely deterministic — zero AI, zero probabilistic scoring, fully auditable.
 */

export interface SessionSignals {
  didOpenReviews: boolean;
  reviewsDwellTimeSeconds: number;
  didAddToCart: boolean;
}

export interface DetectionResult {
  obstacleDetected: boolean;
  obstacleType: "quality_authenticity" | null;
}

export function detectHesitation(signals: SessionSignals): DetectionResult {
  const obstacleDetected =
    signals.didOpenReviews === true &&
    signals.reviewsDwellTimeSeconds > 15 &&
    signals.didAddToCart === false;

  return {
    obstacleDetected,
    obstacleType: obstacleDetected ? "quality_authenticity" : null,
  };
}

export default detectHesitation;
