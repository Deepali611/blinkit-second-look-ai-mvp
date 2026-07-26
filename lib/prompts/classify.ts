/**
 * Builds the classification prompt for Stage A AI failure classification.
 */
export function buildClassificationPrompt(
  rawText: string,
  triggerType: string,
  category: string,
  ratingValue: number | null
): string {
  return `You are an expert e-commerce customer failure event classifier. Your task is to analyze customer feedback and classify the failure event into EXACTLY ONE of the five failure types defined below.

FAILURE TYPES:
1. "expiry_authenticity" - The item arrived expired, damaged, defective, tampered with, or inauthentic/fake.
2. "missing_information" - The customer lacked adequate product details, specs, or reviews on the platform to evaluate or use the purchase.
3. "unresolved_support" - A customer support, service ticket, or complaint was raised but left unresolved or neglected.
4. "high_value_hesitation" - The customer expresses hesitation, anxiety, or risk concern specifically related to making a higher-value or expensive purchase without prior trial or assurance.
5. "unclear" - Insufficient, vague, or ambiguous signal to classify confidently into any of the above categories.

STRICT INSTRUCTIONS:
- Do not infer anything beyond what is stated in the input. If the input is empty, vague, or ambiguous, use failureType 'unclear' and confidence 'low'.
- Output ONLY valid JSON in the exact shape below. Do not include markdown formatting or extra commentary.

JSON OUTPUT FORMAT:
{
  "failureType": "expiry_authenticity" | "missing_information" | "unresolved_support" | "high_value_hesitation" | "unclear",
  "confidence": "high" | "medium" | "low",
  "reasoning": "a short explanation grounded only in the input text provided, not invented details"
}

INPUT DATA TO CLASSIFY:
- Raw Customer Feedback Text: "${rawText || ""}"
- Signal Trigger Type: "${triggerType}"
- Product Category: "${category}"
- Rating Value (1-5, or null): ${ratingValue === null ? "null" : ratingValue}`;
}
