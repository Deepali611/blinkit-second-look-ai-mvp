"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, Minus, ShieldCheck, ArrowRight, Clock } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState([
    {
      id: "prod_1",
      name: "boAt Airdopes 141 TWS Earbuds",
      price: 1899,
      mrp: 4490,
      qty: 1,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=80",
    },
  ]);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof prev
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div
      className="mobile-customer-wrapper"
      style={{
        maxWidth: "480px",
        margin: "0 auto",
        backgroundColor: "#F8F8F6",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#FFF",
          padding: "12px 16px",
          borderBottom: "1px solid var(--border-hairline)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <ChevronLeft size={22} style={{ color: "var(--blinkit-near-black)" }} />
        </button>
        <div>
          <h1 style={{ fontSize: "16px", fontWeight: 800, margin: 0, color: "var(--blinkit-near-black)" }}>
            My Cart
          </h1>
          <div style={{ fontSize: "11px", color: "var(--blinkit-green)", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
            <Clock size={12} /> Delivery in 10 mins
          </div>
        </div>
      </header>

      <main style={{ padding: "16px" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 16px", backgroundColor: "#FFF", borderRadius: "12px", border: "1px solid var(--border-hairline)" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--blinkit-near-black)", marginBottom: "8px" }}>
              Your cart is empty
            </div>
            <Link
              href="/"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#FFF",
                backgroundColor: "var(--blinkit-green)",
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div style={{ backgroundColor: "#FFF", borderRadius: "12px", border: "1px solid var(--border-hairline)", padding: "14px", marginBottom: "16px" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border-hairline)" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--blinkit-near-black)", lineHeight: "17px" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--blinkit-near-black)", marginTop: "4px" }}>
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#F4F9F2",
                      borderRadius: "8px",
                      border: "1px solid rgba(84, 178, 38, 0.4)",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      style={{ background: "none", border: "none", padding: "6px 8px", cursor: "pointer", color: "var(--blinkit-green)" }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--blinkit-green)", padding: "0 4px" }}>
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, 1)}
                      style={{ background: "none", border: "none", padding: "6px 8px", cursor: "pointer", color: "var(--blinkit-green)" }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div style={{ backgroundColor: "#FFF", borderRadius: "12px", border: "1px solid var(--border-hairline)", padding: "14px", marginBottom: "16px" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--blinkit-near-black)", marginBottom: "10px" }}>
                Bill Details
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>
                <span>Item Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>
                <span>Delivery Charge</span>
                <span style={{ color: "var(--blinkit-green)", fontWeight: 700 }}>FREE</span>
              </div>
              <div style={{ height: "1px", backgroundColor: "var(--border-hairline)", margin: "8px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 800, color: "var(--blinkit-near-black)" }}>
                <span>To Pay</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            {/* Guarantee Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#F4F9F2", padding: "10px 12px", borderRadius: "8px", border: "1px solid rgba(84, 178, 38, 0.2)", marginBottom: "20px" }}>
              <ShieldCheck size={16} style={{ color: "var(--blinkit-green)", flexShrink: 0 }} />
              <span style={{ fontSize: "11px", color: "var(--blinkit-near-black)", fontWeight: 600 }}>
                100% genuine & verified item guarantee on this order.
              </span>
            </div>
          </>
        )}
      </main>

      {/* Sticky Bottom Checkout Bar */}
      {items.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "480px",
            backgroundColor: "#FFF",
            borderTop: "1px solid var(--border-hairline)",
            padding: "10px 16px",
            zIndex: 40,
          }}
        >
          <button
            type="button"
            onClick={() => alert("Prototype Checkout: Order placed successfully!")}
            style={{
              width: "100%",
              backgroundColor: "var(--blinkit-green)",
              color: "#FFF",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "14px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <span>Proceed to Pay • ₹{subtotal}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
