import type { Metadata } from "next";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "CertChain - Decentralized Certificate Verification",
  description:
    "Verify educational certificates instantly using Stellar Soroban smart contracts. Eliminate certificate forgery with blockchain-backed verification.",
  keywords: [
    "certificate verification",
    "Stellar network",
    "Soroban",
    "blockchain",
    "education",
    "dApp",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-[var(--background)] text-zinc-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
