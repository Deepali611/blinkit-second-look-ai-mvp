export const HYPOTHESIS_STATEMENT = "A customer's belief about whether Blinkit resolves problems is a belief about Blinkit, not about one category — proving it once, credibly, may lower the perceived risk of trying anywhere else. This is a hypothesis this MVP is built to test, not a proven result.";

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
  classificationAccuracy: "How Often We Identified the Problem Correctly",
  suppressionRate: "Cases We Correctly Held Back On",
  liftLabel: "Compared to doing nothing"
};

export const HELD_BACK_EXPLANATION = "Correctly held back — the system chose not to act. This is a designed, successful outcome, not an error.";
