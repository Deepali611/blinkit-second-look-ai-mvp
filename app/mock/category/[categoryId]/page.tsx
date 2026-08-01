"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Star, Clock, Filter, Plus } from "lucide-react";

export default function MockCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const resolved = React.use(params);
  const resolvedCategory = resolved?.categoryId || "electronics";

  const getCategoryTitle = () => {
    if (resolvedCategory.includes("personal_care")) return "Personal Care";
    if (resolvedCategory.includes("pet_supplies")) return "Pet Supplies";
    if (resolvedCategory.includes("groceries")) return "Groceries";
    if (resolvedCategory.includes("household")) return "Household Essentials";
    return "Electronics & Gadgets";
  };

  const getProducts = () => {
    if (resolvedCategory.includes("personal_care")) {
      return [
        { id: "prod_2", name: "Minimalist 10% Niacinamide Serum", price: 649, mrp: 799, rating: 4.5, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80" },
        { id: "prod_6", name: "Mamaearth Onion Hair Oil (250ml)", price: 550, mrp: 599, rating: 4.3, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80" },
        { id: "prod_7", name: "Cetaphil Gentle Skin Cleanser (250ml)", price: 499, mrp: 550, rating: 4.7, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80" },
        { id: "prod_8", name: "Nivea Soft Light Moisturizer Cream", price: 299, mrp: 349, rating: 4.4, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=80" }
      ];
    }
    if (resolvedCategory.includes("pet_supplies")) {
      return [
        { id: "prod_3", name: "Pedigree Adult Dry Dog Food (3kg)", price: 1200, mrp: 1350, rating: 4.6, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=80" },
        { id: "prod_9", name: "Drools Chicken & Egg Adult Dog Food", price: 899, mrp: 999, rating: 4.5, image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop&q=80" },
        { id: "prod_10", name: "Whiskas Adult Cat Food Ocean Fish", price: 450, mrp: 499, rating: 4.7, image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop&q=80" },
        { id: "prod_11", name: "Me-O Creamy Cat Treats Salmon", price: 199, mrp: 220, rating: 4.4, image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=80" }
      ];
    }
    return [
      { id: "prod_1", name: "boAt Airdopes 141 TWS Earbuds", price: 1899, mrp: 4490, rating: 4.4, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80" },
      { id: "prod_4", name: "Noise ColorFit Pulse Smartwatch", price: 4499, mrp: 6999, rating: 4.3, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=80" },
      { id: "prod_5", name: "Portronics USB-C Fast Charging Cable", price: 299, mrp: 499, rating: 4.5, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80" },
      { id: "prod_12", name: "JBL Go 3 Portable Bluetooth Speaker", price: 2999, mrp: 3999, rating: 4.6, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=80" }
    ];
  };

  const products = getProducts();

  return (
    <div
      className="mobile-customer-wrapper"
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        backgroundColor: "#F8F8F6",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "60px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Top Header */}
      <header
        style={{
          backgroundColor: "#FFF",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border-hairline)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <button
          type="button"
          onClick={() => router.push("/")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <ChevronLeft size={22} style={{ color: "var(--blinkit-near-black)" }} />
        </button>
        <div>
          <h1 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "var(--blinkit-near-black)" }}>
            {getCategoryTitle()}
          </h1>
          <div style={{ fontSize: "11px", color: "var(--blinkit-green)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
            <Clock size={12} /> Delivery in 10 mins
          </div>
        </div>
      </header>

      <main style={{ padding: "12px 16px" }}>
        {/* Category Filter Chips */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "8px",
            marginBottom: "12px",
          }}
        >
          <div
            onClick={() => setSelectedFilter("all")}
            style={{
              backgroundColor: selectedFilter === "all" ? "var(--blinkit-green)" : "#FFF",
              color: selectedFilter === "all" ? "#FFF" : "var(--blinkit-near-black)",
              border: selectedFilter === "all" ? "none" : "1px solid var(--border-hairline)",
              padding: "6px 12px",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Filter size={12} />
            <span>All Items</span>
          </div>
          <div
            onClick={() => setSelectedFilter("top")}
            style={{
              backgroundColor: selectedFilter === "top" ? "var(--blinkit-green)" : "#FFF",
              color: selectedFilter === "top" ? "#FFF" : "var(--blinkit-near-black)",
              border: selectedFilter === "top" ? "none" : "1px solid var(--border-hairline)",
              padding: "6px 12px",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Top Rated
          </div>
          <div
            onClick={() => setSelectedFilter("verified")}
            style={{
              backgroundColor: selectedFilter === "verified" ? "var(--blinkit-green)" : "#FFF",
              color: selectedFilter === "verified" ? "#FFF" : "var(--blinkit-near-black)",
              border: selectedFilter === "verified" ? "none" : "1px solid var(--border-hairline)",
              padding: "6px 12px",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Verified Quality
          </div>
        </div>

        {/* 2-Column Product Cards Mobile Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => router.push(`/mock/product/${prod.id}`)}
              style={{
                backgroundColor: "#FFF",
                borderRadius: "12px",
                padding: "10px",
                border: "1px solid var(--border-hairline)",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    width: "100%",
                    height: "120px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#F8F8F6",
                    marginBottom: "8px",
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--blinkit-near-black)", lineHeight: "16px", height: "32px", overflow: "hidden" }}>
                  {prod.name}
                </div>
              </div>

              <div style={{ marginTop: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                  <Star size={11} fill="#F8CB45" stroke="#F8CB45" />
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--blinkit-near-black)" }}>
                    {prod.rating}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "var(--blinkit-near-black)" }}>
                      ₹{prod.price}
                    </span>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", textDecoration: "line-through", marginLeft: "4px" }}>
                      ₹{prod.mrp}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/mock/product/${prod.id}`);
                    }}
                    style={{
                      backgroundColor: "var(--blinkit-green)",
                      color: "#FFF",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      fontSize: "11px",
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <Plus size={12} /> ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
