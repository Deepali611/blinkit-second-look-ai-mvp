import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { SimulateOutcomeButton } from "@/components/customer/SimulateOutcomeButton";
import { METRIC_NAMES } from "@/lib/copy/canonical";
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
        { name: "boAt Airdopes 141 TWS Earbuds", price: "1,899", rating: "4.4 ★" },
        { name: "Noise ColorFit Pulse Smartwatch", price: "4,499", rating: "4.3 ★" },
        { name: "Portronics USB-C Fast Cable", price: "299", rating: "4.5 ★" },
        { name: "JBL Go 3 Bluetooth Speaker", price: "2,999", rating: "4.6 ★" },
      ];
    }
    if (categoryId.includes("personal_care")) {
      return [
        { name: "Minimalist 10% Niacinamide Serum", price: "649", rating: "4.5 ★" },
        { name: "Mamaearth Onion Hair Oil (250ml)", price: "550", rating: "4.3 ★" },
        { name: "Cetaphil Gentle Skin Cleanser", price: "499", rating: "4.7 ★" },
        { name: "Nivea Soft Light Moisturizer", price: "299", rating: "4.4 ★" },
      ];
    }
    return [
      { name: "Pedigree Adult Dry Dog Food (3kg)", price: "1,200", rating: "4.6 ★" },
      { name: "Drools Chicken & Egg Dog Food", price: "899", rating: "4.5 ★" },
      { name: "Whiskas Adult Cat Food Pack", price: "450", rating: "4.7 ★" },
      { name: "Me-O Creamy Cat Treats", price: "199", rating: "4.4 ★" },
    ];
  };

  const items = getCategoryItems();

  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container" style={{ maxWidth: "840px" }}>
        <ScopeBanner variant="compact" />

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
                <span>Filtered: 7-Day Replacement Guaranteed</span>
              </div>
            )}
          </div>
        </div>

        <div className="mock-category-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginTop: "20px" }}>
          {items.map((item, idx) => (
            <div key={idx} className="mock-category-card" style={{ backgroundColor: "var(--blinkit-white)", border: "1px solid var(--border-hairline)", borderRadius: "10px", padding: "12px" }}>
              <div className="mock-card-img" style={{ width: "100%", height: "100px", backgroundColor: "var(--surface-muted)", borderRadius: "6px", position: "relative" }}>
                <div className="mock-card-delivery-badge" style={{ position: "absolute", top: "6px", left: "6px", backgroundColor: "var(--bg-green-light)", color: "var(--blinkit-green)", fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", display: "flex", alignItems: "center", gap: "3px" }}>
                  <Clock size={10} /> 10m
                </div>
              </div>
              <span className="type-body-sm mock-card-title" style={{ fontWeight: 600, marginTop: "8px", display: "block" }}>{item.name}</span>
              <div className="mock-card-meta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
                <span className="type-body-sm mock-card-rating" style={{ color: "var(--blinkit-near-black)", display: "flex", alignItems: "center", gap: "2px" }}>
                  <Star size={12} fill="#F8CB45" stroke="#F8CB45" /> {item.rating}
                </span>
                <span className="type-body-sm mock-card-price" style={{ fontWeight: 700, color: "var(--blinkit-green)" }}>₹{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Divider Above Evaluator Control Panel */}
        <hr style={{ border: 0, borderTop: "1px solid var(--border-hairline)", margin: "36px 0 24px 0" }} />

        <p className="type-body evaluator-framing-line" style={{ fontWeight: 600, color: "var(--blinkit-near-black)", marginBottom: "16px" }}>
          You've just followed the same path this customer would. What they do next is exactly what this MVP is trying to learn.
        </p>

        {/* Restyled Evaluator Control Panel */}
        <div className="evaluator-control-panel-card" style={{ backgroundColor: "var(--surface-muted)", border: "1px solid var(--border-hairline)", borderRadius: "12px", padding: "24px" }}>
          <h4 className="type-h1 evaluator-panel-title" style={{ fontSize: "18px", marginBottom: "16px", color: "var(--blinkit-near-black)" }}>
            Evaluator Tools
          </h4>

          <div className="evaluator-buttons-stack" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <SimulateOutcomeButton
              eventId={eventId}
              outcomeType="same_category_repurchase"
              label="This customer buys again in this category"
              caption={"Feeds: " + METRIC_NAMES.sameCategoryReturnRate + " (operational health check)"}
            />

            <SimulateOutcomeButton
              eventId={eventId}
              outcomeType="cross_category_attempt"
              label="This customer also tries a different new category"
              caption={"Feeds: " + METRIC_NAMES.crossCategoryExplorationRate + " — the metric that actually tests Blinkit's goal"}
              isProminent={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
