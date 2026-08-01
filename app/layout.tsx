import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Second Look",
  description: "Second Look — AI-Driven Recovery Experience for Blinkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
