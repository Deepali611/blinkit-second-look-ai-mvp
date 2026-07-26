import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { SimulateOutcomeButton } from "@/components/customer/SimulateOutcomeButton";
import { Star, ShieldCheck } from "lucide-react";

export default async function MockProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ anchor?: string; eventId?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const productId = resolvedParams.productId;
  const isReviewsAnchor = resolvedSearchParams.anchor === "reviews";
  const eventId = resolvedSearchParams.eventId || "evt_1";

  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container" style={{ maxWidth: "800px" }}>
        <ScopeBanner compact={true} />

        <div className="mock-product-container">
          <div className="mock-product-grid">
            <div className="mock-product-image-box">
              <span className="type-body-sm">Placeholder Product Image</span>
            </div>

            <div className="mock-product-details">
              <span className="mock-badge type-body-sm">Mock Product Page</span>
              <h1 className="type-display" style={{ fontSize: "24px" }}>
                Product {productId.toUpperCase()}
              </h1>
              <p className="mock-price type-h1">₹1,899</p>

              <div className="mock-trust-tag">
                <ShieldCheck size={16} />
                <span className="type-body-sm">Verified Vendor & Replacements Guaranteed</span>
              </div>
            </div>
          </div>

          <div
            className={`mock-reviews-section ${isReviewsAnchor ? "highlighted-section" : ""}`}
          >
            <h3 className="type-h1" style={{ fontSize: "18px" }}>
              Customer Reviews (12 Verified Reviews)
            </h3>
            <div className="mock-stars">
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <span className="type-body-sm">4.8 out of 5</span>
            </div>
            <p className="type-body-sm" style={{ color: "#666" }}>
              Recent buyers confirm great packaging and fast 10-minute delivery.
            </p>
          </div>

          {/* Evaluator Simulation Action Panel */}
          <div className="evaluator-simulation-panel">
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
        </div>
      </main>
    </div>
  );
}
