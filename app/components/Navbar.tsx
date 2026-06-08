"use client";

"use client";

import { useState } from "react";
import Link from "next/link";
import WalletConnectButton from "./WalletConnectButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[var(--button-bg)]">
              CertChain
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white p-2 text-zinc-700 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] sm:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <div className="hidden sm:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-zinc-700 transition hover:text-[var(--button-bg)]"
              >
                Home
              </Link>
              <Link
                href="/university"
                className="text-sm font-medium text-zinc-700 transition hover:text-[var(--button-bg)]"
              >
                University
              </Link>
              <Link
                href="/employer"
                className="text-sm font-medium text-zinc-700 transition hover:text-[var(--button-bg)]"
              >
                Employer
              </Link>
              <Link
                href="/verify"
                className="text-sm font-medium text-zinc-700 transition hover:text-[var(--button-bg)]"
              >
                Verify
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-zinc-700 transition hover:text-[var(--button-bg)]"
              >
                Register
              </Link>
            </div>

            <WalletConnectButton />
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:hidden">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-[var(--button-bg)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/university"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-[var(--button-bg)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                University
              </Link>
              <Link
                href="/employer"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-[var(--button-bg)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Employer
              </Link>
              <Link
                href="/verify"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-[var(--button-bg)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Verify
              </Link>
              <Link
                href="/register"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-[var(--button-bg)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
