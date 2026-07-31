export const HYPOTHESIS_STATEMENT = "A customer starts a purchase in a new category, hits a specific obstacle — a quality concern, missing information, an unresolved issue, or hesitation on a bigger purchase — and abandons the mission mid-way. Trust erosion is the consequence of that interruption, not the starting problem. This MVP identifies the specific obstacle, resolves it with real evidence, and lets the customer continue the purchase they'd already started.";

export const INVISIBLE_AI_FRAMING = "The customer never sees this reasoning happen — they simply experience Blinkit remembering where they got stuck and having the answer ready.";

export const DECISION_UNCERTAINTY_METRIC_SUBTITLE = "This tests whether removing reusable decision uncertainty — not persuasion — makes exploration more likely. We're measuring this, not assuming it.";

export const ASSUMPTION_CAVEAT_SHORT = "This is a hypothesis, not a proven result.";

export const SCOPE_BANNER_FULL = "This is an evaluation prototype. Trigger events, verification data, and customer outcomes are simulated. Classification uses a live AI model call; verification and decision logic are deterministic code running against mock data.";

export const SCOPE_BANNER_COMPACT = "Evaluation prototype — trigger events and outcomes are simulated. Classification is a live AI call; verification and decision logic are deterministic.";

export const STAGE_TITLES = {
  stageA: "1. What went wrong",
  stageB: "2. Is it actually fixed?",
  stageC: "3. What we do about it"
};

export const STAGE_TAGS = {
  stageA: "[AI]",
  stageB: "[Rules-based, not AI]",
  stageC: "[AI-assisted — rules-equivalent today, improves as it learns]"
};

export const METRIC_NAMES = {
  crossCategoryExplorationRate: "Cross-Category Exploration Rate",
  sameCategoryReturnRate: "Same-Category Return Rate",
  missionRecoveryRate: "Mission Recovery Rate",
  notificationOpenRate: "Notification Open Rate",
  recoveryCtaClickRate: "Recovery CTA Click Rate",
  classificationAccuracy: "How Often We Identified the Problem Correctly",
  suppressionRate: "Cases We Correctly Held Back On",
  liftLabel: "Compared to doing nothing",
  leadingSectionTitle: "Leading Indicators",
  laggingSectionTitle: "Lagging Indicators",
};

export const HELD_BACK_EXPLANATION = "Correctly held back — the system chose not to act. This is a designed, successful outcome, not an error.";
