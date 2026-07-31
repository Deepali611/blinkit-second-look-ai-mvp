import React from "react";
import { BlinkitHeader } from "@/components/shared/BlinkitHeader";
import { EnvironmentBadge } from "@/components/shared/EnvironmentBadge";
import { MeasureResultPanel } from "@/components/evaluator/MeasureResultPanel";
import { ResolvedBadge } from "@/components/customer/ResolvedBadge";
import { selectLeadEvidence } from "@/lib/decision/verifiedFirst";
import { Star, ShieldCheck, Zap, Clock, ThumbsUp, Sparkles, Heart } from "lucide-react";

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

  // Check against seed customer historicalCategories (e.g. ["Groceries"])
  const historicalCategories = ["Groceries", "Snacks", "Beverages"];
  const isFirstCategoryVisit = !historicalCategories.some(
    (cat) => productId.toLowerCase().includes(cat.toLowerCase())
  );
  const leadEvidence = selectLeadEvidence(productId);

  const getProductDetails = () => {
    if (productId.includes("2") || productId.includes("personal_care")) {
      return {
        name: "Minimalist 10% Niacinamide Serum",
        price: "649",
        rating: "4.5 ★ (1.8k ratings)",
        icon: <Sparkles size={32} className="blinkit-green-icon" />,
        policy: "10-Day Return Window",
      };
    }
    if (productId.includes("3") || productId.includes("pet_supplies")) {
      return {
        name: "Pedigree Adult Dry Dog Food (3kg)",
        price: "1,200",
        rating: "4.6 ★ (3.2k ratings)",
        icon: <Heart size={32} className="blinkit-green-icon" />,
        policy: "15-Day Return Window",
      };
    }
    return {
      name: "boAt Airdopes 141 TWS Earbuds",
      price: "1,899",
      rating: "4.3 ★ (2.1k ratings)",
      icon: <Zap size={32} className="blinkit-green-icon" />,
      policy: "7-Day Replacement Guarantee",
    };
  };

  const product = getProductDetails();

  return (
    <div className="portal-layout" style={{ backgroundColor: "var(--evaluator-bg)", minHeight: "100vh" }}>
      <BlinkitHeader variant="evaluator" backHref="/" />
      <EnvironmentBadge />

      <main className="portal-container" style={{ maxWidth: "840px", paddingBottom: "60px" }}>
        <div className="mock-product-container">
          {/* Realistic Blinkit Product View */}
          <div className="mock-product-grid" style={{ backgroundColor: "#FFF", borderRadius: "16px", padding: "24px", marginBottom: "32px" }}>
            <div className="mock-product-image-box">
              <div className="mock-product-placeholder-art">
                {product.icon}
                <span className="type-body-sm" style={{ fontWeight: 600, color: "#666", marginTop: "4px" }}>
                  Blinkit Product
                </span>
              </div>
            </div>

            <div className="mock-product-details">
              <div className="mock-delivery-promise-chip">
                <Clock size={13} />
                <span>Delivery in 10 mins</span>
              </div>

              {/* Task 38: Verified First Proactive Category-Entry Trust Signal */}
              {isFirstCategoryVisit && (
                <div style={{ marginTop: "8px", marginBottom: "4px" }}>
                  <ResolvedBadge label={leadEvidence.badgeLabel} />
                </div>
              )}

              <h1 className="type-display" style={{ fontSize: "24px", marginTop: "8px" }}>
                {product.name}
              </h1>

              <div className="mock-rating-bar">
                <div className="star-rating-pill">
                  <span>4.3 ★</span>
                </div>
                <span className="type-body-sm rating-count">{product.rating}</span>
              </div>

              <p className="mock-price type-h1" style={{ fontSize: "28px", color: "var(--blinkit-green)", margin: "12px 0" }}>
                ₹{product.price}
              </p>

              <div className="mock-trust-tag">
                <ShieldCheck size={16} />
                <span className="type-body-sm">Quality Inspected • {product.policy}</span>
              </div>
            </div>
          </div>

          <div
            className={`mock-reviews-section ${isReviewsAnchor ? "highlighted-section" : ""}`}
            style={{ backgroundColor: "#FFF", borderRadius: "16px", padding: "24px", marginBottom: "32px" }}
          >
            <div className="reviews-section-header">
              <h3 className="type-h1" style={{ fontSize: "18px" }}>
                Customer Reviews (Verified Buyer Ratings)
              </h3>
              {isReviewsAnchor && (
                <span className="reviews-anchor-badge type-body-sm">
                  <ThumbsUp size={14} /> Highlighted for customer resolution
                </span>
              )}
            </div>

            <div className="mock-stars" style={{ marginTop: "6px" }}>
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#F8CB45" stroke="#F8CB45" />
              <Star size={16} fill="#E5E5E2" stroke="#E5E5E2" />
              <span className="type-body-sm" style={{ fontWeight: 600, marginLeft: "4px" }}>
                4.3 out of 5
              </span>
            </div>

            <p className="type-body-sm" style={{ color: "var(--blinkit-near-black)", marginTop: "6px" }}>
              Recent verified buyers confirm clean authentic seals, fast 10-minute dispatch, and original packaging.
            </p>
          </div>

          {/* Task 25: Measure the Result Panel */}
          <MeasureResultPanel eventId={eventId} productName={product.name} />
        </div>
      </main>
    </div>
  );
}
