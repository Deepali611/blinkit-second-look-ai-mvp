import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { SimulateOutcomeButton } from "@/components/customer/SimulateOutcomeButton";
import { RotateCcw, Clock, Star, Filter } from "lucide-react";

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

  const getCategoryItems = () => {
    if (categoryId.includes("electronics")) {
      return [
        { name: "boAt Airdopes 141 TWS", price: "1,899", rating: "4.4 ★" },
        { name: "Noise ColorFit Smartwatch", price: "4,499", rating: "4.3 ★" },
        { name: "Portronics Fast Cable", price: "299", rating: "4.5 ★" },
        { name: "JBL Go 3 Bluetooth Speaker", price: "2,999", rating: "4.6 ★" },
      ];
    }
    if (categoryId.includes("personal_care")) {
      return [
        { name: "Minimalist Niacinamide Serum", price: "649", rating: "4.5 ★" },
        { name: "Mamaearth Hair Oil", price: "550", rating: "4.3 ★" },
        { name: "Cetaphil Gentle Cleanser", price: "499", rating: "4.7 ★" },
        { name: "Nivea Soft Moisturizer", price: "299", rating: "4.4 ★" },
      ];
    }
    return [
      { name: "Pedigree Adult Dog Food (3kg)", price: "1,200", rating: "4.6 ★" },
      { name: "Drools Chicken & Egg Food", price: "899", rating: "4.5 ★" },
      { name: "Whiskas Cat Food Pack", price: "450", rating: "4.7 ★" },
      { name: "Me-O Cat Treats", price: "199", rating: "4.4 ★" },
    ];
  };

  const items = getCategoryItems();

  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container" style={{ maxWidth: "840px" }}>
        <ScopeBanner compact={true} />

        <div className="mock-category-header">
          <div className="mock-category-title-row">
            <span className="mock-badge type-body-sm">Blinkit Category Listing</span>
            <h1 className="type-display" style={{ fontSize: "24px" }}>
              {categoryId.replace("cat_", "").replace("_", " ").toUpperCase()}
            </h1>
          </div>

          <div className="mock-category-filter-bar">
            <div className="mock-filter-pill active">
              <Filter size={13} />
              <span>All Products</span>
            </div>
            <div className="mock-filter-pill">
              <span>Top Rated</span>
            </div>
            <div className="mock-filter-pill">
              <span>Fastest Delivery</span>
            </div>

            {isReturnsFiltered && (
              <div className="mock-filter-tag type-body-sm">
                <RotateCcw size={14} />
                <span>Filtered: 7-Day Replacement Eligible</span>
              </div>
            )}
          </div>
        </div>

        <div className="mock-category-grid">
          {items.map((item, idx) => (
            <div key={idx} className="mock-category-card">
              <div className="mock-card-img">
                <div className="mock-card-delivery-badge">
                  <Clock size={11} /> 10m
                </div>
              </div>
              <span className="type-body-sm mock-card-title">{item.name}</span>
              <div className="mock-card-meta">
                <span className="type-body-sm mock-card-rating">
                  <Star size={12} fill="#F8CB45" stroke="#F8CB45" /> {item.rating}
                </span>
                <span className="type-body-sm mock-card-price">₹{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Evaluator Control Panel */}
        <div className="evaluator-control-panel-card" style={{ marginTop: "32px" }}>
          <h4 className="type-h1 evaluator-panel-title">
            Evaluator Control Panel
          </h4>
          <p className="type-body evaluator-panel-framing">
            You've just followed the same path this customer would. What they do next is exactly what this MVP is trying to learn.
          </p>

          <div className="evaluator-buttons-stack">
            <SimulateOutcomeButton
              eventId={eventId}
              outcomeType="same_category_repurchase"
              label="Simulate: Customer completes purchase in this category"
            />

            <SimulateOutcomeButton
              eventId={eventId}
              outcomeType="cross_category_attempt"
              label="Simulate: Customer also tries a different new category"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
