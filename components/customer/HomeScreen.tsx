"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Clock,
  MapPin,
  ChevronRight,
  PackageCheck,
  Zap,
  Sparkles,
  Heart,
  Home as HomeIcon,
  ShoppingBag,
  User,
  Star,
  ShieldCheck,
  Plus,
} from "lucide-react";
import seedData from "@/data/seed.json";

export interface HomeScreenProps {
  cartCount?: number;
  cartTotal?: number;
}

export function HomeScreen({ cartCount = 0, cartTotal = 0 }: HomeScreenProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { orders } = seedData;

  // Filter seed products by search query
  const allProducts = [
    { id: "prod_1", categoryId: "cat_electronics", name: "boAt Airdopes 141 TWS Earbuds", price: 1899, mrp: 4490, rating: 4.4, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80" },
    { id: "prod_2", categoryId: "cat_personal_care", name: "Minimalist 10% Niacinamide Serum", price: 649, mrp: 799, rating: 4.5, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80" },
    { id: "prod_3", categoryId: "cat_pet_supplies", name: "Pedigree Adult Dry Dog Food (3kg)", price: 1200, mrp: 1350, rating: 4.6, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=80" },
    { id: "prod_4", categoryId: "cat_electronics", name: "Noise ColorFit Pulse Smartwatch", price: 4499, mrp: 6999, rating: 4.3, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=80" },
    { id: "prod_5", categoryId: "cat_groceries", name: "Fortune Sunlite Sunflower Oil (1L)", price: 145, mrp: 165, rating: 4.7, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80" },
    { id: "prod_6", categoryId: "cat_household", name: "Surf Excel Matic Liquid Detergent (1L)", price: 230, mrp: 260, rating: 4.8, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80" }
  ];

  const searchResults = searchQuery.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const categories = [
    { id: "cat_groceries", name: "Groceries", icon: <PackageCheck size={20} style={{ color: "var(--blinkit-green)" }} /> },
    { id: "cat_electronics", name: "Electronics", icon: <Zap size={20} style={{ color: "var(--blinkit-green)" }} /> },
    { id: "cat_personal_care", name: "Personal Care", icon: <Sparkles size={20} style={{ color: "var(--blinkit-green)" }} /> },
    { id: "cat_pet_supplies", name: "Pet Supplies", icon: <Heart size={20} style={{ color: "var(--blinkit-green)" }} /> },
    { id: "cat_household", name: "Household", icon: <HomeIcon size={20} style={{ color: "var(--blinkit-green)" }} /> },
  ];

  return (
    <div
      className="mobile-customer-wrapper"
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        backgroundColor: "#F8F8F6",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "70px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* 1. TOP BAR */}
      <header
        style={{
          backgroundColor: "#FFF",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border-hairline)",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <div>
            <span style={{ fontSize: "22px", fontWeight: 900, color: "var(--blinkit-yellow)", letterSpacing: "-0.5px" }}>blink</span>
            <span style={{ fontSize: "22px", fontWeight: 900, color: "var(--blinkit-green)", letterSpacing: "-0.5px" }}>it</span>
          </div>

          {/* Mode 2 Link — Unobtrusive top-right link */}
          <Link
            href="/evaluator"
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--text-muted)",
              backgroundColor: "rgba(0,0,0,0.05)",
              padding: "4px 10px",
              borderRadius: "12px",
              textDecoration: "none",
              border: "1px solid var(--border-hairline)",
            }}
          >
            Evaluator Mode ⚙️
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <MapPin size={15} style={{ color: "var(--blinkit-green)" }} />
            <div>
              <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--blinkit-near-black)", lineHeight: "14px" }}>
                Home - Sector 42, Gurgaon
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "var(--blinkit-green)",
              backgroundColor: "#F4F9F2",
              padding: "4px 8px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Clock size={12} />
            <span>⚡ Delivery in 10 mins</span>
          </div>
        </div>
      </header>

      <main style={{ padding: "12px 16px" }}>
        {/* 2. SEARCH BAR */}
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <div
            style={{
              backgroundColor: "#FFF",
              border: "1px solid var(--border-hairline)",
              borderRadius: "12px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
            }}
          >
            <Search size={18} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder='Search "earbuds", "serum", "dog food"...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                fontSize: "13px",
                width: "100%",
                backgroundColor: "transparent",
                color: "var(--blinkit-near-black)",
              }}
            />
          </div>

          {/* Search Dropdown Results */}
          {searchQuery.trim().length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "48px",
                left: 0,
                right: 0,
                backgroundColor: "#FFF",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                border: "1px solid var(--border-hairline)",
                zIndex: 50,
                overflow: "hidden",
              }}
            >
              {searchResults.length === 0 ? (
                <div style={{ padding: "14px", fontSize: "13px", color: "var(--text-muted)" }}>
                  No matching items found
                </div>
              ) : (
                searchResults.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => router.push(`/mock/product/${prod.id}`)}
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid var(--border-hairline)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--blinkit-near-black)" }}>
                        {prod.name}
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: 800, color: "var(--blinkit-green)", marginTop: "2px" }}>
                        ₹{prod.price}
                      </div>
                    </div>
                    <ChevronRight size={16} style={{ color: "var(--text-muted)" }} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* 3. HORIZONTAL CATEGORY GRID */}
        <section style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--blinkit-near-black)", marginBottom: "10px" }}>
            Explore Categories
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "8px",
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => router.push(`/mock/category/${cat.id}`)}
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: "12px",
                  padding: "10px 4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  cursor: "pointer",
                  border: "1px solid var(--border-hairline)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ backgroundColor: "#F4F9F2", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {cat.icon}
                </div>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--blinkit-near-black)", textAlign: "center", lineHeight: "12px" }}>
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. RECENTLY BOUGHT ROW */}
        <section style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--blinkit-near-black)", marginBottom: "10px" }}>
            Recently Bought
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              paddingBottom: "6px",
              scrollSnapType: "x mandatory",
            }}
          >
            {orders.map((ord) => {
              const prodId = ord.orderId === "ord_1" ? "prod_1" : ord.orderId === "ord_2" ? "prod_2" : ord.orderId === "ord_3" ? "prod_3" : "prod_4";
              return (
                <div
                  key={ord.orderId}
                  onClick={() => router.push(`/mock/product/${prodId}`)}
                  style={{
                    minWidth: "140px",
                    maxWidth: "140px",
                    backgroundColor: "#FFF",
                    borderRadius: "12px",
                    padding: "10px",
                    border: "1px solid var(--border-hairline)",
                    cursor: "pointer",
                    scrollSnapAlign: "start",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--blinkit-green)", backgroundColor: "#F4F9F2", padding: "2px 6px", borderRadius: "4px", display: "inline-block", marginBottom: "6px" }}>
                    Verified Order
                  </div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--blinkit-near-black)", lineHeight: "15px", height: "30px", overflow: "hidden" }}>
                    {ord.productName}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--blinkit-near-black)" }}>₹{ord.orderValue}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/mock/product/${prodId}`);
                      }}
                      style={{
                        backgroundColor: "var(--blinkit-green)",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        fontSize: "11px",
                        fontWeight: 800,
                        cursor: "pointer",
                      }}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. CONTINUE SHOPPING ROW (Rendered ONLY if cart has items) */}
        {cartCount > 0 && (
          <section style={{ marginBottom: "20px" }}>
            <div
              onClick={() => router.push("/mock/cart")}
              style={{
                backgroundColor: "var(--blinkit-green)",
                color: "#FFF",
                borderRadius: "12px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(84, 178, 38, 0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingBag size={20} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 800 }}>Continue Shopping ({cartCount} items)</div>
                  <div style={{ fontSize: "11px", opacity: 0.9 }}>Subtotal ₹{cartTotal}</div>
                </div>
              </div>
              <ChevronRight size={18} />
            </div>
          </section>
        )}

        {/* 6. PROMOTIONAL BANNER */}
        <section style={{ marginBottom: "16px" }}>
          <div
            style={{
              backgroundColor: "linear-gradient(135deg, #1F1F1F 0%, #333333 100%)",
              background: "#1F1F1F",
              borderRadius: "14px",
              padding: "16px",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "10px", fontWeight: 800, color: "var(--blinkit-yellow)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Verified Guarantee
              </div>
              <div style={{ fontSize: "14px", fontWeight: 800, marginTop: "2px" }}>
                Shop New Categories with Full Confidence
              </div>
              <div style={{ fontSize: "11px", color: "#DDD", marginTop: "4px" }}>
                Quality verified vendors & instant replacement guarantee
              </div>
            </div>
            <ShieldCheck size={32} style={{ color: "var(--blinkit-yellow)", opacity: 0.9 }} />
          </div>
        </section>
      </main>

      {/* 7. BOTTOM NAVIGATION BAR */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "480px",
          height: "56px",
          backgroundColor: "#FFF",
          borderTop: "1px solid var(--border-hairline)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          zIndex: 40,
          fontSize: "10px",
          fontWeight: 700,
          color: "var(--text-muted)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", color: "var(--blinkit-green)" }}>
          <HomeIcon size={20} />
          <span>Home</span>
        </div>
        <div onClick={() => router.push("/mock/category/cat_electronics")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer" }}>
          <Search size={20} />
          <span>Search</span>
        </div>
        <div onClick={() => router.push("/mock/cart")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer", position: "relative" }}>
          <ShoppingBag size={20} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: "-2px", right: "6px", backgroundColor: "var(--blinkit-green)", color: "#FFF", fontSize: "9px", fontWeight: 800, width: "14px", height: "14px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {cartCount}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
          <User size={20} />
          <span>Profile</span>
        </div>
      </nav>
    </div>
  );
}

export default HomeScreen;
