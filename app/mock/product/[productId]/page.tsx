import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { ScopeBanner } from "@/components/shared/ScopeBanner";
import { SimulateOutcomeButton } from "@/components/customer/SimulateOutcomeButton";
import { Star, ShieldCheck, Zap, Clock, ThumbsUp } from "lucide-react";

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

  const isEarbuds = productId.includes("1") || productId.includes("ord_1");

  const productName = isEarbuds
    ? "boAt Airdopes 141 TWS Earbuds"
    : `Blinkit Verified Item (${productId.toUpperCase()})`;
  const price = isEarbuds ? "1,899" : "649";

  return (
    <div className="portal-layout">
      <BlinkitHeader variant="evaluator" backHref="/" />

      <main className="portal-container" style={{ maxWidth: "840px" }}>
        <ScopeBanner compact={true} />

        <div className="mock-product-container">
          {/* Real Blinkit Product Card */}
          <div className="mock-product-grid">
            <div className="mock-product-image-box">
              <div className="mock-product-placeholder-art">
                <Zap size={32} className="blinkit-green-icon" />
                <span className="type-body-sm" style={{ fontWeight: 600, color: "#666" }}>
                  Blinkit Product View
                </span>
              </div>
            </div>

            <div className="mock-product-details">
              <div className="mock-delivery-promise-chip">
                <Clock size={13} />
                <span>Delivery in 10 mins</span>
              </div>

              <h1 className="type-display" style={{ fontSize: "24px", marginTop: "8px" }}>
                {productName}
              </h1>

              <div className="mock-rating-bar">
                <div className="star-rating-pill">
                  <span>4.3 ★</span>
                </div>
                <span className="type-body-sm rating-count">(2.1k verified ratings)</span>
              </div>

              <p className="mock-price type-h1">₹{price}</p>

              <div className="mock-trust-tag">
                <ShieldCheck size={16} />
                <span className="type-body-sm">Quality Inspected & 7-Day Replacement Guarantee</span>
              </div>
            </div>
          </div>

          <div
            className={`mock-reviews-section ${isReviewsAnchor ? "highlighted-section" : ""}`}
          >
            <div className="reviews-section-header">
              <h3 className="type-h1" style={{ fontSize: "18px" }}>
                Customer Reviews (12 Verified Buyer Reviews)
              </h3>
              {isReviewsAnchor && (
                <span className="reviews-anchor-badge type-body-sm">
                  <ThumbsUp size={14} /> Highlighted for customer resolution
                </span>
              )}
            </div>

            <div className="mock-stars">
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#E5E5E2" stroke="#E5E5E2" />
              <span className="type-body-sm" style={{ fontWeight: 600, marginLeft: "4px" }}>
                4.3 out of 5
              </span>
            </div>

            <p className="type-body-sm" style={{ color: "#444", marginTop: "6px" }}>
              Recent verified buyers confirm clean authentic seals, fast 10-minute dispatch, and original packaging.
            </p>
          </div>

          {/* Evaluator Control Panel */}
          <div className="evaluator-control-panel-card">
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
        </div>
      </main>
    </div>
  );
}
