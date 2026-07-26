import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { SimulateOutcomeButton } from "@/components/customer/SimulateOutcomeButton";
import { RotateCcw } from "lucide-react";

export default async function MockCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ filter?: string; eventId?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const categoryId = resolvedParams.categoryId;
  const isReturnsFiltered = resolvedSearchParams.filter === "returns_eligible";
  const eventId = resolvedSearchParams.eventId || "evt_3";

  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container" style={{ maxWidth: "800px" }}>
        <ScopeBanner compact={true} />

        <div className="mock-category-header">
          <span className="mock-badge type-body-sm">Mock Category Page</span>
          <h1 className="type-display" style={{ fontSize: "24px" }}>
            Category: {categoryId.replace("cat_", "").toUpperCase()}
          </h1>

          {isReturnsFiltered && (
            <div className="mock-filter-tag type-body-sm">
              <RotateCcw size={14} />
              <span>Filtered: Return-eligible items</span>
            </div>
          )}
        </div>

        <div className="mock-category-grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="mock-category-card">
              <div className="mock-card-img" />
              <p className="type-body-sm" style={{ fontWeight: 600 }}>
                Item #{item} in {categoryId}
              </p>
              <p className="type-body-sm" style={{ color: "#666" }}>
                ₹{item * 350 + 199}
              </p>
            </div>
          ))}
        </div>

        {/* Evaluator Simulation Action Panel */}
        <div className="evaluator-simulation-panel" style={{ marginTop: "32px" }}>
          <h4 className="type-h1" style={{ fontSize: "16px", marginBottom: "12px" }}>
            Evaluator Action Panel — Log Customer Outcome
          </h4>

          <SimulateOutcomeButton
            eventId={eventId}
            outcomeType="same_category_repurchase"
            label="Simulate: Customer completes purchase"
          />

          <SimulateOutcomeButton
            eventId={eventId}
            outcomeType="cross_category_attempt"
            label="Simulate: Customer also tries a different new category"
          />
        </div>
      </main>
    </div>
  );
}
