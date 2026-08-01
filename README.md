# Blinkit Mission Recovery — AI-Native MVP

This is an AI-native Blinkit MVP designed to help customers make confident first purchases in unfamiliar categories.

## Mode Overview

- **Mode 1 — Customer Shopping Experience (`/`)**: Mobile quick-commerce experience with 10-minute delivery layout, search, category browsing, and inline AI interventions.
- **Mode 2 — Evaluator Mode (`/evaluator`)**: Complete inspection panel featuring:
  - **Customer Case Explorer** (`/inspector`)
  - **AI Decision Trace & Evaluator Console** (`/evaluator/decision-trace/[eventId]`)
  - **System Design & AI Logic** (`/system-design`)
  - **Metrics Dashboard** (`/metrics`)
  - **Evaluator Guide** (`/guide`)

---

## Codebase Audit Against Locked Architecture

| Screen / Component / Route | Current State | Decision (Keep / Modify / Remove) | Notes |
| :--- | :--- | :--- | :--- |
| **API: Stage A Classification** (`/api/classify`, `lib/prompts/classify.ts`) | Classifies across 4 obstacle types from explicit customer text signals. | **MODIFY** | Narrow to single obstacle type (**Quality / Expiry / Authenticity**). Triggered by behavioral detection (Reviews dwell time + no add-to-cart). |
| **API: Stage B Verification** (`/api/verify`, `lib/rules/verify.ts`) | Checks vendor compliance, review count, ticket status, return policy. | **MODIFY** | Simplify verification rules to evaluate reorder rate, return rate, and seller consistency thresholds. |
| **API: Stage C Decision Engine** (`/api/decide`, `lib/decision/*`) | Rule-table evidence/CTA selection; conflates decision and confidence. | **MODIFY** | Single AI reasoning call selecting evidence, generating grounded message, and selecting 1 action from fixed set, gated by separate deterministic confidence layer. |
| **API: Events & Outcome** (`/api/events`, `/api/outcome`, `/api/experiments/summary`) | Logs recovery cases, customer actions, and experiment summaries. | **MODIFY** | Update event payload structures to reflect behavioral dwell-time triggers and Quality/Authenticity focus. |
| **API: Metrics** (`/api/metrics`, `lib/metrics/*`) | Aggregates 5-metric dashboard. | **MODIFY** | Update to compute **CCER (Cross-Category Exploration Rate)** with 3-month trailing category lookback, plus Holdout vs. Treatment group comparison. |
| **Data: Seed Data** (`data/seed.json`, `lib/db/*`) | Contains 6 failure events across 4 failure types. | **MODIFY** | Add `reorderRate`, `returnRate`, and `sellerConsistencyScore` per product. Focus active seed failure cases on Quality/Authenticity. |
| **Customer: Home Screen** (`app/page.tsx`, `components/customer/HomeScreen.tsx`) | Mode 1 landing page with delivery bar, search, category grid. | **MODIFY** | Remove notification entry points entirely. Enable live session browsing simulation into PDP where behavioral triggers fire natively. |
| **Customer: Category Page** (`app/mock/category/[categoryId]/page.tsx`) | 2-column mobile category product grid. | **KEEP** | Retain 2-column layout; link to PDP for dwell-time testing. |
| **Customer: Product Detail Page** (`app/mock/product/[productId]/page.tsx`) | Renders product info, price, reviews, specs, sticky CTA. | **MODIFY** | Integrate native live-session dwell-time tracker on reviews section, triggering Stage 1/2/3 pipeline seamlessly on PDP. |
| **Customer: Confidence Card** (`components/customer/ConfidenceCard.tsx`) | Single adaptive card between price block and Add to Cart. | **MODIFY** | Adapt to render single Quality/Authenticity grounded intervention message with action-focused CTA. |
| **Customer: Cart Screen** (`app/mock/cart/page.tsx`) | Mobile cart screen with line items and checkout. | **KEEP** | Retain for checkout outcome tracking. |
| **Evaluator: Evaluator Hub** (`app/evaluator/page.tsx`) | Landing dashboard for Mode 2 Evaluator Mode. | **MODIFY** | Rename "Customer Recovery Cases" → "Customer Case Explorer". Update copy and links to reflect Quality/Authenticity focus. |
| **Evaluator: Case Explorer** (`app/(evaluator)/inspector/page.tsx`) | List table of customer cases. | **MODIFY** | Rename to **Customer Case Explorer**; update filters and table columns to display Quality/Authenticity cases. |
| **Evaluator: Case Trace** (`app/(evaluator)/inspector/[eventId]/page.tsx`) | 3-stage visual execution trace for a single case. | **MODIFY** | Update trace visualization to show behavioral dwell-time detection (Stage A), metric verification (Stage B), and AI action (Stage C). |
| **Evaluator: Decision Trace Console** (`app/evaluator/decision-trace/[eventId]/page.tsx`) | 10-section diagnostic console. | **MODIFY** | Update Sections 2, 3, 4, 9, 10 to reflect Quality/Authenticity focus and new CCER metric definitions. |
| **Evaluator: System Design** (`app/(evaluator)/system-design/page.tsx`) | Explains 6-step causal chain and AI/deterministic split. | **MODIFY** | Update System Design copy to reflect Stage 1/2/3 behavioral detection and Quality/Authenticity focus. |
| **Evaluator: Metrics Page** (`app/(evaluator)/metrics/page.tsx`) | Metrics visualization dashboard. | **MODIFY** | Update layout to feature CCER (Cross-Category Exploration Rate with 3-month trailing lookback) and Treatment vs. Holdout comparison. |
| **Evaluator: Guide & Demo** (`app/(evaluator)/guide/page.tsx`, `app/second-look-demo/page.tsx`) | Evaluator testing walkthrough and simulator. | **MODIFY** | Update walkthrough steps to guide evaluators through testing live session dwell-time detection on unfamiliar category product pages. |
