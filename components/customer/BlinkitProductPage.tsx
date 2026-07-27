"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import {
  ChevronLeft,
  ShoppingBag,
  Clock,
  Star,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import { ResolvedBadge } from "./ResolvedBadge";

export interface BlinkitProductPageProps {
  emphasisVariant: "quality" | "reviews" | "support" | "policy" | string;
  failureType?: string;
  factStatement?: string;
  onBack?: () => void;
}

// Category Product Graphic 1: boAt Airdopes 141 TWS Earbuds (Electronics)
function ElectronicsProductGraphic() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="140" rx="12" fill="#F5F5F3" />
      {/* TWS Charging Case */}
      <rect x="50" y="45" width="80" height="55" rx="20" fill="#1F2228" />
      <path d="M50 62H130" stroke="#333842" strokeWidth="2" />
      {/* LED Status Indicator */}
      <circle cx="90" cy="74" r="3" fill="#54B226" />
      {/* Earbud L */}
      <rect x="36" y="32" width="14" height="28" rx="7" fill="#14161A" />
      <circle cx="43" cy="38" r="4" fill="#333842" />
      {/* Earbud R */}
      <rect x="130" y="32" width="14" height="28" rx="7" fill="#14161A" />
      <circle cx="137" cy="38" r="4" fill="#333842" />
      {/* Brand Badge */}
      <rect x="72" y="86" width="36" height="6" rx="3" fill="#333842" />
    </svg>
  );
}

// Category Product Graphic 2: Minimalist Niacinamide Serum (Personal Care)
function PersonalCareProductGraphic() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="140" rx="12" fill="#F5F5F3" />
      {/* Dropper Cap */}
      <rect x="80" y="20" width="20" height="16" rx="4" fill="#1F1F1F" />
      <rect x="84" y="36" width="12" height="14" fill="#E5E5E2" />
      {/* Serum Bottle Body */}
      <rect x="65" y="50" width="50" height="70" rx="10" fill="#FFFFFF" stroke="#E5E5E2" strokeWidth="2" />
      {/* Minimalist Label */}
      <rect x="72" y="62" width="36" height="42" fill="#F8F8F7" rx="2" />
      <rect x="76" y="70" width="28" height="4" fill="#1F1F1F" />
      <rect x="76" y="78" width="20" height="3" fill="#54B226" />
      <rect x="76" y="84" width="24" height="2" fill="#999999" />
    </svg>
  );
}

// Category Product Graphic 3: Pedigree Dog Food (Pet Supplies)
function PetSuppliesProductGraphic() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="140" rx="12" fill="#F5F5F3" />
      {/* Pedigree Pack Container */}
      <path d="M55 30H125L130 120H50L55 30Z" fill="#F8CB45" rx="6" />
      {/* Top Zip Seal */}
      <rect x="55" y="34" width="70" height="5" fill="#E0B020" />
      {/* Blue Center Oval */}
      <ellipse cx="90" cy="68" rx="28" ry="18" fill="#1E40AF" />
      <rect x="75" y="64" width="30" height="8" rx="2" fill="#FFFFFF" />
      {/* Dog Silhouette Graphic */}
      <path d="M85 96C85 92 88 90 90 90C92 90 95 92 95 96V104H85V96Z" fill="#854D0E" />
      {/* Fresh Food Badge */}
      <rect x="68" y="108" width="44" height="8" rx="4" fill="#54B226" />
    </svg>
  );
}

export function BlinkitProductPage({
  emphasisVariant,
  failureType = "expiry_authenticity",
  factStatement,
  onBack,
}: BlinkitProductPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trustBadgeRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const [reviewsExpanded, setReviewsExpanded] = useState<boolean>(
    emphasisVariant === "reviews"
  );
  const [detailsExpanded, setDetailsExpanded] = useState<boolean>(false);

  // Derive product details & graphics based on failureType / variant
  const getProductData = () => {
    if (
      failureType === "missing_information" ||
      emphasisVariant === "reviews"
    ) {
      return {
        name: "Minimalist 10% Niacinamide Serum (30ml)",
        price: "649",
        category: "Personal Care",
        graphic: <PersonalCareProductGraphic />,
        specs: ["Formulation: 10% Niacinamide + Zinc", "Skin Type: All skin types", "Volume: 30ml dropper bottle"],
      };
    }
    if (
      failureType === "high_value_hesitation" ||
      emphasisVariant === "policy"
    ) {
      return {
        name: "Pedigree Adult Dry Dog Food (3kg)",
        price: "1,200",
        category: "Pet Supplies",
        graphic: <PetSuppliesProductGraphic />,
        specs: ["Weight: 3.0 kg", "Flavor: Real Chicken & Rice", "Life Stage: Adult Dogs (1+ Years)"],
      };
    }
    return {
      name: "boAt Airdopes 141 TWS Earbuds",
      price: "1,899",
      category: "Electronics",
      graphic: <ElectronicsProductGraphic />,
      specs: ["Playback: 42 Hours Total", "Driver Size: 8mm Dynamic", "Water Resistance: IPX4 Rating"],
    };
  };

  const product = getProductData();

  // Initial scroll position setting before paint
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    if (emphasisVariant === "quality" && trustBadgeRef.current) {
      containerRef.current.scrollTop = trustBadgeRef.current.offsetTop - 60;
    } else if (emphasisVariant === "reviews" && reviewsRef.current) {
      containerRef.current.scrollTop = reviewsRef.current.offsetTop - 60;
    } else {
      containerRef.current.scrollTop = 0;
    }
  }, [emphasisVariant]);

  return (
    <div
      ref={containerRef}
      className="blinkit-product-page-scroll-container"
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        backgroundColor: "var(--blinkit-white)",
        color: "var(--blinkit-near-black)",
        fontFamily: "var(--font-inter)",
        scrollBehavior: "smooth",
      }}
    >
      {/* Support History Top Card (Only for emphasisVariant="support") */}
      {emphasisVariant === "support" && (
        <div
          className="support-history-top-card"
          style={{
            backgroundColor: "rgba(84, 178, 38, 0.08)",
            borderBottom: "1px solid rgba(84, 178, 38, 0.2)",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--blinkit-green)", letterSpacing: "0.5px" }}>
              Your Support History
            </span>
            <ResolvedBadge label="Resolved 12 May" />
          </div>
          <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--blinkit-near-black)", margin: 0 }}>
            {factStatement || "Ticket #84920 resolved — support agent confirmed resolution."}
          </p>
        </div>
      )}

      {/* Section 1: Sticky Top Bar */}
      <div
        className="product-top-bar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "var(--blinkit-white)",
          borderBottom: "1px solid var(--border-hairline)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            color: "var(--blinkit-near-black)",
          }}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>

        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)" }}>
          Home &gt; {product.category}
        </span>

        <div style={{ position: "relative", padding: "4px" }}>
          <ShoppingBag size={20} style={{ color: "var(--blinkit-near-black)" }} />
        </div>
      </div>

      {/* Section 2: Product Image Area with High Quality Graphic */}
      <div
        className="product-image-container"
        style={{
          width: "100%",
          padding: "20px 16px",
          backgroundColor: "#F8F8F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {product.graphic}
        </div>
      </div>

      {/* Section 3: Delivery Promise Strip */}
      <div
        className="delivery-promise-strip"
        style={{
          padding: "10px 16px",
          backgroundColor: "var(--bg-green-light)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px solid var(--border-hairline)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--blinkit-green)", fontWeight: 700, fontSize: "12px" }}>
          <Clock size={14} />
          <span>Delivery in 10 mins</span>
        </div>

        {/* Policy Variant Additional Badge */}
        {emphasisVariant === "policy" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "var(--blinkit-white)",
              color: "var(--blinkit-green)",
              border: "1px solid var(--blinkit-green)",
              borderRadius: "14px",
              padding: "2px 8px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            <RotateCcw size={12} />
            <span>7-Day Replacement Guaranteed</span>
          </div>
        )}
      </div>

      {/* Main Content Body */}
      <div style={{ padding: "16px" }}>
        {/* Section 4: Title + Price Block */}
        <div className="title-price-block" style={{ marginBottom: "12px" }}>
          <h1 className="type-h1" style={{ fontSize: "20px", lineHeight: "26px", fontWeight: 700, color: "var(--blinkit-near-black)", margin: "0 0 6px 0" }}>
            {product.name}
          </h1>
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <span style={{ fontSize: "24px", fontWeight: 800, color: "var(--blinkit-green)" }}>
              ₹{product.price}
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Inclusive of all taxes
            </span>
          </div>
        </div>

        {/* Section 5: Trust Badge Row */}
        <div
          ref={trustBadgeRef}
          className="trust-badge-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            margin: "12px 0 16px 0",
          }}
        >
          {emphasisVariant === "quality" ? (
            <>
              <ResolvedBadge label="Quality Verified" />
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--blinkit-near-black)",
                  backgroundColor: "var(--surface-muted)",
                  padding: "3px 8px",
                  borderRadius: "6px",
                }}
              >
                <ShieldCheck size={14} style={{ color: "var(--blinkit-green)" }} />
                100% Authentic Guaranteed
              </span>
            </>
          ) : (
            <>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--blinkit-near-black)",
                  backgroundColor: "var(--surface-muted)",
                  padding: "3px 8px",
                  borderRadius: "6px",
                }}
              >
                <ShieldCheck size={14} style={{ color: "var(--blinkit-green)" }} />
                Quality Inspected
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  backgroundColor: "var(--surface-muted)",
                  padding: "3px 8px",
                  borderRadius: "6px",
                }}
              >
                Blinkit Assured
              </span>
            </>
          )}
        </div>

        {/* Section 6: Add-to-Cart Action Bar */}
        <div
          className="action-add-bar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "16px 0 24px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90px",
              height: "42px",
              backgroundColor: "var(--surface-muted)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "8px",
              padding: "0 10px",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            <span style={{ color: "var(--text-muted)" }}>-</span>
            <span>1</span>
            <span style={{ color: "var(--blinkit-green)" }}>+</span>
          </div>

          <button
            type="button"
            style={{
              flex: 1,
              height: "42px",
              backgroundColor: "var(--blinkit-green)",
              color: "var(--blinkit-white)",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>Add to Cart • ₹{product.price}</span>
          </button>
        </div>

        {/* Section 7: Ratings & Reviews Section */}
        <div
          ref={reviewsRef}
          className="ratings-reviews-section"
          style={{
            borderTop: "1px solid var(--border-hairline)",
            paddingTop: "16px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => setReviewsExpanded(!reviewsExpanded)}
          >
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "var(--blinkit-near-black)" }}>
                Ratings & Reviews
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--blinkit-near-black)", display: "flex", alignItems: "center", gap: "2px" }}>
                  <Star size={14} fill="#F8CB45" stroke="#F8CB45" /> 4.3
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  (2,140 verified ratings)
                </span>
              </div>
            </div>

            <button type="button" style={{ background: "none", border: "none", color: "var(--text-muted)" }}>
              {reviewsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {reviewsExpanded && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "14px" }}>
              <div style={{ backgroundColor: "var(--surface-muted)", padding: "10px 12px", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700 }}>Rahul M. (Verified Buyer)</span>
                  <div style={{ display: "flex", gap: "1px" }}>
                    <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                    <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                    <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                    <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                    <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "var(--blinkit-near-black)", margin: 0 }}>
                  "Original seal intact, received in 8 mins! Exactly as described."
                </p>
              </div>

              <div style={{ backgroundColor: "var(--surface-muted)", padding: "10px 12px", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700 }}>Priya S. (Verified Buyer)</span>
                  <div style={{ display: "flex", gap: "1px" }}>
                    <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                    <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                    <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                    <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                    <Star size={11} fill="#E5E5E2" stroke="#E5E5E2" />
                  </div>
                </div>
                <p style={{ fontSize: "12px", color: "var(--blinkit-near-black)", margin: 0 }}>
                  "Very good quality and genuine product. Will buy again."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 8: Product Details Section */}
        <div
          className="product-details-section"
          style={{
            borderTop: "1px solid var(--border-hairline)",
            paddingTop: "16px",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => setDetailsExpanded(!detailsExpanded)}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "var(--blinkit-near-black)" }}>
              Product Details
            </h3>
            <button type="button" style={{ background: "none", border: "none", color: "var(--text-muted)" }}>
              {detailsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {detailsExpanded && (
            <ul style={{ listStyle: "disc", paddingLeft: "18px", marginTop: "10px", fontSize: "12px", color: "var(--blinkit-near-black)" }}>
              {product.specs.map((spec, i) => (
                <li key={i} style={{ marginBottom: "4px" }}>
                  {spec}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Section 9: Footer */}
        <div
          className="product-footer"
          style={{
            borderTop: "1px solid var(--border-hairline)",
            paddingTop: "16px",
            marginTop: "24px",
            fontSize: "11px",
            color: "var(--text-muted)",
            textAlign: "center",
            lineHeight: "18px",
          }}
        >
          <p style={{ margin: "0 0 4px 0" }}>7-Day Replacement Guarantee • 100% Genuine Products</p>
          <p style={{ margin: 0 }}>Need help with this order? Contact 24/7 Blinkit Support</p>
        </div>
      </div>
    </div>
  );
}

export default BlinkitProductPage;
