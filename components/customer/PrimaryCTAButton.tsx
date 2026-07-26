import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface PrimaryCTAButtonProps {
  label: string;
  href: string;
}

export function PrimaryCTAButton({ label, href }: PrimaryCTAButtonProps) {
  return (
    <Link href={href} className="primary-cta-button">
      <span>{label}</span>
      <ArrowRight size={20} />
    </Link>
  );
}

export default PrimaryCTAButton;
