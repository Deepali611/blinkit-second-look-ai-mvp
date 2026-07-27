import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface PrimaryCTAButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

export function PrimaryCTAButton({ label, href, onClick }: PrimaryCTAButtonProps) {
  if (onClick) {
    return (
      <button
        type="button"
        className="primary-cta-button"
        onClick={onClick}
        style={{ border: "none", cursor: "pointer", width: "100%" }}
      >
        <span>{label}</span>
        <ArrowRight size={20} />
      </button>
    );
  }

  return (
    <Link href={href || "#"} className="primary-cta-button">
      <span>{label}</span>
      <ArrowRight size={20} />
    </Link>
  );
}

export default PrimaryCTAButton;
