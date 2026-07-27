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
  Plus,
  Minus,
  ArrowRight,
  Store,
} from "lucide-react";
import { ResolvedBadge } from "./ResolvedBadge";

export interface BlinkitProductPageProps {
  emphasisVariant: "quality" | "reviews" | "support" | "policy" | string;
  failureType?: string;
  factStatement?: string;
  onBack?: () => void;
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
  const [cartQty, setCartQty] = useState<number>(0);

  // High quality authentic product catalogue imagery & data
  const getProductData = () => {
    if (
      failureType === "missing_information" ||
      emphasisVariant === "reviews"
    ) {
      return {
        name: "Minimalist 10% Niacinamide Serum (30ml)",
        mrp: "799",
        price: "649",
        discount: "18% OFF",
        rating: "4.5",
        ratingsCount: "3,412 ratings",
        category: "Personal Care",
        seller: "SuperComNet Retail Ltd.",
        imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
        specs: [
          "Formulation: 10% Pure Niacinamide + 1% Zinc PCA",
          "Skin Benefit: Blemish Control & Pore Refining",
          "Volume: 30ml Glass Dropper Bottle",
        ],
        reviews: [
          {
            name: "Ananya R. (Verified Buyer)",
            rating: 5,
            comment: "Literally arrived in 9 mins! Original seal was intact. Very lightweight and non-sticky serum.",
          },
          {
            name: "Karan T. (Verified Buyer)",
            rating: 4,
            comment: "Packaging was crisp and fresh. Helps reduce redness nicely after 1 week of use.",
          },
        ],
      };
    }
    if (
      failureType === "high_value_hesitation" ||
      emphasisVariant === "policy"
    ) {
      return {
        name: "Pedigree Adult Dry Dog Food — Real Chicken & Rice (3kg)",
        mrp: "1,450",
        price: "1,200",
        discount: "17% OFF",
        rating: "4.6",
        ratingsCount: "4,820 ratings",
        category: "Pet Supplies",
        seller: "PetCare India Authorized Supplier",
        imageUrl: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&auto=format&fit=crop&q=80",
        specs: [
          "Net Weight: 3.0 kg Sealed Pack",
          "Main Ingredients: Real Chicken, Rice, Essential Omega-6",
          "Life Stage: Adult Dogs (1+ Years)",
        ],
        reviews: [
          {
            name: "Vikram P. (Verified Buyer)",
            rating: 5,
            comment: "My Labrador loves this kibble! Delivered warm and fresh right to my doorstep.",
          },
          {
            name: "Sneha G. (Verified Buyer)",
            rating: 5,
            comment: "Good fresh batch with 12 months expiry date. Super convenient delivery.",
          },
        ],
      };
    }
    return {
      name: "boAt Airdopes 141 TWS Earbuds — 42H Playback & Beast Mode",
      mrp: "4,490",
      price: "1,899",
      discount: "57% OFF",
      rating: "4.4",
      ratingsCount: "2,186 ratings",
      category: "Electronics",
      seller: "Imagine Marketing Authorized Distributor",
      imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      specs: [
        "Playback: 42 Hours Total Playtime with ASAP Charge",
        "Driver Size: 8mm Dynamic Drivers",
        "Water Resistance: IPX4 Water & Sweat Resistance",
      ],
      reviews: [
        {
          name: "Rahul M. (Verified Buyer)",
          rating: 5,
          comment: "Original seal intact, received in 8 mins! Audio clarity and bass are solid for this price.",
        },
        {
          name: "Priya S. (Verified Buyer)",
          rating: 4,
          comment: "Verified brand box with active warranty code inside. Fits comfortably during workouts.",
        },
      ],
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

  const handleAddCart = () => {
    setCartQty((prev) => (prev === 0 ? 1 : prev));
  };

  const handleIncrement = () => {
    setCartQty((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCartQty((prev) => Math.max(0, prev - 1));
  };

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
        position: "relative",
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
          {cartQty > 0 && (
            <span
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                backgroundColor: "var(--blinkit-green)",
                color: "var(--blinkit-white)",
                borderRadius: "50%",
                fontSize: "10px",
                fontWeight: 800,
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartQty}
            </span>
          )}
        </div>
      </div>

      {/* Section 2: Authentic High-Resolution Product Photography Gallery */}
      <div
        className="product-image-container"
        style={{
          width: "100%",
          height: "230px",
          backgroundColor: "#F8F8F6",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#FFF",
            fontSize: "10px",
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: "12px",
            backdropFilter: "blur(4px)",
          }}
        >
          Official Catalogue Image
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
        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--blinkit-green)", fontWeight: 800, fontSize: "12px" }}>
          <Clock size={14} />
          <span>⚡ Delivery in 10 mins</span>
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
      <div style={{ padding: "16px", paddingBottom: cartQty > 0 ? "80px" : "30px" }}>
        {/* Section 4: Title + Price Block with Discounts */}
        <div className="title-price-block" style={{ marginBottom: "12px" }}>
          <h1 className="type-h1" style={{ fontSize: "18px", lineHeight: "24px", fontWeight: 700, color: "var(--blinkit-near-black)", margin: "0 0 8px 0" }}>
            {product.name}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "24px", fontWeight: 800, color: "var(--blinkit-near-black)" }}>
              ₹{product.price}
            </span>
            <span style={{ fontSize: "14px", color: "var(--text-muted)", textDecoration: "line-through" }}>
              MRP ₹{product.mrp}
            </span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--blinkit-green)", backgroundColor: "rgba(84, 178, 38, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
              {product.discount}
            </span>
          </div>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginTop: "2px" }}>
            Inclusive of all taxes
          </span>
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

        {/* Section 6: Interactive Add-to-Cart Action Bar */}
        <div
          className="action-add-bar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "16px 0 24px 0",
          }}
        >
          {cartQty === 0 ? (
            <button
              type="button"
              onClick={handleAddCart}
              style={{
                flex: 1,
                height: "44px",
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
                boxShadow: "0 4px 12px rgba(84, 178, 38, 0.2)",
                transition: "all 0.15s ease",
              }}
            >
              <span>ADD TO CART • ₹{product.price}</span>
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                height: "44px",
                backgroundColor: "var(--blinkit-green)",
                color: "var(--blinkit-white)",
                borderRadius: "8px",
                padding: "0 16px",
                fontWeight: 700,
              }}
            >
              <button
                type="button"
                onClick={handleDecrement}
                style={{ background: "none", border: "none", color: "#FFF", cursor: "pointer", display: "flex" }}
              >
                <Minus size={18} />
              </button>
              <span style={{ fontSize: "16px" }}>{cartQty} IN CART</span>
              <button
                type="button"
                onClick={handleIncrement}
                style={{ background: "none", border: "none", color: "#FFF", cursor: "pointer", display: "flex" }}
              >
                <Plus size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Seller Info Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: "var(--text-muted)",
            marginBottom: "20px",
          }}
        >
          <Store size={14} />
          <span>Seller: <strong>{product.seller}</strong></span>
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
                  <Star size={14} fill="#F8CB45" stroke="#F8CB45" /> {product.rating}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  ({product.ratingsCount})
                </span>
              </div>
            </div>

            <button type="button" style={{ background: "none", border: "none", color: "var(--text-muted)" }}>
              {reviewsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {reviewsExpanded && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "14px" }}>
              {product.reviews.map((rev, idx) => (
                <div key={idx} style={{ backgroundColor: "var(--surface-muted)", padding: "12px", borderRadius: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700 }}>{rev.name}</span>
                    <div style={{ display: "flex", gap: "1px" }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          fill={i < rev.rating ? "#F8CB45" : "#E5E5E2"}
                          stroke={i < rev.rating ? "#F8CB45" : "#E5E5E2"}
                        />
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--blinkit-near-black)", margin: 0, lineHeight: "17px" }}>
                    "{rev.comment}"
                  </p>
                </div>
              ))}
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
              Product Specifications
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

      {/* Real-Time Interactive Blinkit Sticky Bottom Cart Bar */}
      {cartQty > 0 && (
        <div
          className="sticky-cart-bottom-bar"
          style={{
            position: "sticky",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "var(--blinkit-green)",
            color: "var(--blinkit-white)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.15)",
            zIndex: 30,
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.5px" }}>
              {cartQty} {cartQty === 1 ? "ITEM" : "ITEMS"} • ₹{(parseInt(product.price.replace(",", "")) * cartQty).toLocaleString()}
            </div>
            <div style={{ fontSize: "10px", opacity: 0.9 }}>
              Extra ₹25 cashback applied
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: 700, fontSize: "13px" }}>
            <span>View Cart</span>
            <ArrowRight size={16} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BlinkitProductPage;
