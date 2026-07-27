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
  Tag,
  ThumbsUp,
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
  const [detailsExpanded, setDetailsExpanded] = useState<boolean>(true);
  const [cartQty, setCartQty] = useState<number>(0);
  const [selectedImgIdx, setSelectedImgIdx] = useState<number>(0);

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
        breadcrumb: "Home > Personal Care > Skincare Serums",
        seller: "SuperComNet Retail Ltd.",
        images: [
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1608248597379-e09b1f24d45d?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80",
        ],
        specs: [
          "Formulation: 10% Pure Niacinamide + 1% Zinc PCA",
          "Skin Benefit: Blemish Control & Pore Refining",
          "Volume: 30ml Glass Dropper Bottle",
          "Fragrance: 100% Fragrance-Free & Non-Comedogenic",
        ],
        reviews: [
          { name: "Ananya R.", rating: 5, comment: "Literally arrived in 9 mins! Original seal was intact. Very lightweight serum.", helpful: 18 },
          { name: "Karan T.", rating: 4, comment: "Packaging was crisp and fresh. Helps reduce redness nicely after 1 week.", helpful: 14 },
          { name: "Meera D.", rating: 5, comment: "Authentic minimalist batch, verified code on bottle. Great for daily routine.", helpful: 11 },
          { name: "Rohan S.", rating: 5, comment: "Fast 10m delivery. Non-sticky and absorbs instantly into skin.", helpful: 9 },
          { name: "Pooja K.", rating: 4, comment: "Genuine seller packaging. Skin texture improved noticeably.", helpful: 7 },
        ],
        frequentlyBought: [
          { name: "Minimalist Salicylic Acid Cleanser", price: "299", rating: "4.6 ★" },
          { name: "Sunscreen SPF 50 PA++++", price: "399", rating: "4.7 ★" },
          { name: "Hyaluronic Acid Hydrating Lotion", price: "499", rating: "4.5 ★" },
        ],
        similarProducts: [
          { name: "The Ordinary Niacinamide 10%", price: "600", rating: "4.4 ★" },
          { name: "Derma Co 10% Niacinamide", price: "549", rating: "4.3 ★" },
          { name: "Plum 10% Niacinamide Face Serum", price: "599", rating: "4.5 ★" },
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
        breadcrumb: "Home > Pet Supplies > Dog Food",
        seller: "PetCare India Authorized Supplier",
        images: [
          "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop&q=80",
        ],
        specs: [
          "Net Weight: 3.0 kg Sealed Pack",
          "Main Ingredients: Real Chicken, Rice, Essential Omega-6",
          "Life Stage: Adult Dogs (1+ Years)",
          "Shelf Life: 12 Months Freshness Guarantee",
        ],
        reviews: [
          { name: "Vikram P.", rating: 5, comment: "My Labrador loves this kibble! Delivered fresh right to my doorstep.", helpful: 24 },
          { name: "Sneha G.", rating: 5, comment: "Good fresh batch with 12 months expiry date. Super convenient.", helpful: 19 },
          { name: "Amit K.", rating: 4, comment: "Sturdy bag zip packaging, no tear or damage during fast dispatch.", helpful: 12 },
          { name: "Divya N.", rating: 5, comment: "High quality food, coat looks shinier. Highly recommended.", helpful: 10 },
          { name: "Siddharth R.", rating: 5, comment: "Original Pedigree pack. Delivery boy arrived in 8 mins flat.", helpful: 8 },
        ],
        frequentlyBought: [
          { name: "Pedigree Meat Jerky Dog Treats", price: "180", rating: "4.8 ★" },
          { name: "Dog Chew Bone Pack of 2", price: "250", rating: "4.6 ★" },
          { name: "Stainless Steel Pet Food Bowl", price: "299", rating: "4.5 ★" },
        ],
        similarProducts: [
          { name: "Drools Adult Chicken & Egg (3kg)", price: "999", rating: "4.4 ★" },
          { name: "Royal Canin Mini Adult (2kg)", price: "1,850", rating: "4.8 ★" },
          { name: "Meat Up Adult Dog Food (3kg)", price: "799", rating: "4.3 ★" },
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
      breadcrumb: "Home > Electronics > Headphones & Earbuds",
      seller: "Imagine Marketing Authorized Distributor",
      images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      ],
      specs: [
        "Playback: 42 Hours Total Playtime with ASAP Charge",
        "Driver Size: 8mm Dynamic Bass Drivers",
        "Water Resistance: IPX4 Water & Sweat Resistance",
        "Warranty: 1 Year Official Brand Warranty",
      ],
      reviews: [
        { name: "Rahul M.", rating: 5, comment: "Original seal intact, received in 8 mins! Audio clarity and bass are solid.", helpful: 31 },
        { name: "Priya S.", rating: 4, comment: "Verified brand box with active warranty code inside. Fits comfortably.", helpful: 22 },
        { name: "Aditya B.", rating: 5, comment: "Mic quality is surprisingly clear during calls. Beast Mode low latency works.", helpful: 16 },
        { name: "Neha C.", rating: 5, comment: "Super fast charging — 5 mins charge gives 75 mins playback!", helpful: 11 },
        { name: "Gaurav K.", rating: 4, comment: "Matte case finish feels premium. Great value for under ₹2,000.", helpful: 9 },
      ],
      frequentlyBought: [
        { name: "boAt Silicone Protective Case Cover", price: "199", rating: "4.5 ★" },
        { name: "Type-C Braided Fast Charging Cable", price: "249", rating: "4.6 ★" },
        { name: "Memory Foam Ear Tips (3 Pairs)", price: "149", rating: "4.4 ★" },
      ],
      similarProducts: [
        { name: "Noise Buds VS102 TWS", price: "1,299", rating: "4.2 ★" },
        { name: "Realme TechLife Buds T100", price: "1,499", rating: "4.4 ★" },
        { name: "JBL Wave 200 TWS", price: "2,499", rating: "4.5 ★" },
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

      {/* Section 1: Sticky Top Bar with Full Breadcrumbs */}
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

        <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>
          {product.breadcrumb}
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

      {/* Section 2: Swipeable Carousel with Thumbnail Strip */}
      <div className="product-carousel-wrapper" style={{ backgroundColor: "#F8F8F6", padding: "12px 16px" }}>
        <div
          className="product-main-image-box"
          style={{
            width: "100%",
            height: "210px",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={product.images[selectedImgIdx]}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Thumbnail Strip */}
        <div style={{ display: "flex", gap: "8px", marginTop: "10px", justifyContent: "center" }}>
          {product.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedImgIdx(i)}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                overflow: "hidden",
                border: selectedImgIdx === i ? "2px solid var(--blinkit-green)" : "1px solid var(--border-hairline)",
                padding: 0,
                cursor: "pointer",
                backgroundColor: "#FFF",
              }}
            >
              <img src={img} alt={`Thumb ${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          ))}
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
        {/* Section 4: Title + Price Block with Discounts & Coupons */}
        <div className="title-price-block" style={{ marginBottom: "12px" }}>
          <h1 className="type-h1" style={{ fontSize: "18px", lineHeight: "24px", fontWeight: 700, color: "var(--blinkit-near-black)", margin: "0 0 4px 0" }}>
            {product.name}
          </h1>

          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>
            Sold by <strong>{product.seller}</strong>
          </div>

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

          {/* Decorative Offers/Coupons Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#FFFBEB",
              border: "1px dashed #F59E0B",
              borderRadius: "8px",
              padding: "8px 10px",
              marginTop: "10px",
              fontSize: "11px",
              fontWeight: 700,
              color: "#B45309",
            }}
          >
            <Tag size={13} />
            <span>⚡ 10% OFF on first order in this category | Use Code: FIRSTLOOK</span>
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

        {/* Section 7: Ratings & 5 Expanded Reviews with Verified & Helpful badges */}
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
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700 }}>{rev.name}</span>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--blinkit-green)", backgroundColor: "rgba(84, 178, 38, 0.1)", padding: "1px 5px", borderRadius: "4px" }}>
                        Verified Purchase
                      </span>
                    </div>
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
                  <p style={{ fontSize: "12px", color: "var(--blinkit-near-black)", margin: "4px 0 6px 0", lineHeight: "17px" }}>
                    "{rev.comment}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "var(--text-muted)" }}>
                    <ThumbsUp size={11} />
                    <span>{rev.helpful} people found this helpful</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 8: Product Details & 4 Expanded Specs */}
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
            <ul style={{ listStyle: "disc", paddingLeft: "18px", marginTop: "10px", fontSize: "12px", color: "var(--blinkit-near-black)", lineHeight: "20px" }}>
              {product.specs.map((spec, i) => (
                <li key={i} style={{ marginBottom: "4px" }}>
                  {spec}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Frequently Bought Together Row */}
        <div style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: "16px", marginTop: "20px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "10px", color: "var(--blinkit-near-black)" }}>
            Frequently bought together
          </h4>
          <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "6px" }}>
            {product.frequentlyBought.map((item, i) => (
              <div key={i} style={{ minWidth: "120px", backgroundColor: "var(--surface-muted)", borderRadius: "8px", padding: "10px", fontSize: "11px" }}>
                <div style={{ fontWeight: 700, color: "var(--blinkit-near-black)", height: "30px", overflow: "hidden" }}>{item.name}</div>
                <div style={{ color: "var(--blinkit-green)", fontWeight: 800, marginTop: "4px" }}>₹{item.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products Row */}
        <div style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: "16px", marginTop: "16px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "10px", color: "var(--blinkit-near-black)" }}>
            Similar products
          </h4>
          <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "6px" }}>
            {product.similarProducts.map((item, i) => (
              <div key={i} style={{ minWidth: "120px", backgroundColor: "var(--surface-muted)", borderRadius: "8px", padding: "10px", fontSize: "11px" }}>
                <div style={{ fontWeight: 700, color: "var(--blinkit-near-black)", height: "30px", overflow: "hidden" }}>{item.name}</div>
                <div style={{ color: "var(--blinkit-green)", fontWeight: 800, marginTop: "4px" }}>₹{item.price}</div>
              </div>
            ))}
          </div>
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
