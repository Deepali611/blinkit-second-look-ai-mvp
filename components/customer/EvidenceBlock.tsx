import React from "react";
import { PackageCheck, Zap, Sparkles, Heart, Home } from "lucide-react";
import ComplianceFactCard from "./evidence/ComplianceFactCard";
import ReviewCountCard from "./evidence/ReviewCountCard";
import TicketResolutionCard from "./evidence/TicketResolutionCard";
import ReturnPolicyCard from "./evidence/ReturnPolicyCard";
import AcknowledgmentOnlyCard from "./evidence/AcknowledgmentOnlyCard";

export interface EvidenceBlockProps {
  variant: string;
  factStatement: string;
  category?: string;
}

export function PlatformBreadthIndicator({ currentCategory }: { currentCategory: string }) {
  const categories = [
    { name: "Groceries", icon: PackageCheck },
    { name: "Electronics", icon: Zap },
    { name: "Personal Care", icon: Sparkles },
    { name: "Pet Supplies", icon: Heart },
    { name: "Household", icon: Home },
  ];

  return (
    <div
      className="platform-breadth-indicator"
      style={{
        marginTop: "10px",
        padding: "10px 12px",
        backgroundColor: "var(--surface-muted, #F5F5F3)",
        border: "1px solid var(--border-hairline, #E5E5E2)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "2px",
        }}
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isCurrent =
            cat.name.toLowerCase() === currentCategory.toLowerCase() ||
            (currentCategory.toLowerCase().includes("cat_electronics") && cat.name === "Electronics") ||
            (currentCategory.toLowerCase().includes("cat_personal") && cat.name === "Personal Care") ||
            (currentCategory.toLowerCase().includes("cat_pet") && cat.name === "Pet Supplies");

          return (
            <div
              key={cat.name}
              title={cat.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "3px 7px",
                borderRadius: "6px",
                backgroundColor: isCurrent ? "rgba(84, 178, 38, 0.12)" : "transparent",
                color: isCurrent ? "var(--blinkit-green, #54B226)" : "var(--text-muted, #666666)",
                fontWeight: isCurrent ? 700 : 500,
                fontSize: "11px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <Icon size={13} style={{ color: isCurrent ? "var(--blinkit-green, #54B226)" : "var(--text-muted, #666666)" }} />
              <span style={{ opacity: isCurrent ? 1 : 0.75 }}>{cat.name}</span>
            </div>
          );
        })}
      </div>
      <p
        className="type-body-sm"
        style={{
          margin: 0,
          fontSize: "11px",
          color: "var(--text-muted, #666666)",
          lineHeight: "15px",
          opacity: 0.85,
        }}
      >
        The same check runs on every order, in every category.
      </p>
    </div>
  );
}

export function EvidenceBlock({ variant, factStatement, category }: EvidenceBlockProps) {
  const getCategoryForVariant = () => {
    if (category) return category;
    switch (variant) {
      case "missing_information":
        return "Personal Care";
      case "unresolved_support":
        return "Pet Supplies";
      case "expiry_authenticity":
      case "high_value_hesitation":
      default:
        return "Electronics";
    }
  };

  const currentCategory = getCategoryForVariant();

  const renderCard = () => {
    switch (variant) {
      case "expiry_authenticity":
        return <ComplianceFactCard factStatement={factStatement} />;
      case "missing_information":
        return <ReviewCountCard factStatement={factStatement} />;
      case "unresolved_support":
        return <TicketResolutionCard factStatement={factStatement} />;
      case "high_value_hesitation":
        return <ReturnPolicyCard factStatement={factStatement} />;
      case "acknowledgment_only":
      default:
        return <AcknowledgmentOnlyCard factStatement={factStatement} />;
    }
  };

  return (
    <div className="evidence-block-wrapper" style={{ display: "flex", flexDirection: "column" }}>
      {renderCard()}
      <PlatformBreadthIndicator currentCategory={currentCategory} />
    </div>
  );
}

export default EvidenceBlock;
