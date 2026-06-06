import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-gradient-to-b from-white to-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
          <div>
            <h3 className="text-lg font-bold text-orange-600 mb-4">
              CertChain
            </h3>
            <p className="text-sm text-zinc-600">
              Decentralized certificate verification on Stellar Soroban smart
              contracts.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 mb-4">Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-zinc-600 transition hover:text-orange-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/university"
                  className="text-zinc-600 transition hover:text-orange-600"
                >
                  University Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/employer"
                  className="text-zinc-600 transition hover:text-orange-600"
                >
                  Employer Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 mb-4">Technology</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-zinc-600 transition hover:text-orange-600"
                >
                  Stellar Network
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-zinc-600 transition hover:text-orange-600"
                >
                  Soroban Contracts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-zinc-600 transition hover:text-orange-600"
                >
                  SHA-256 Hashing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-zinc-600 transition hover:text-orange-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-zinc-600 transition hover:text-orange-600"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-zinc-600 transition hover:text-orange-600"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-8">
          <p className="text-center text-sm text-zinc-600">
            © {new Date().getFullYear()} CertChain. All rights reserved. Built
            on Stellar Soroban.
          </p>
        </div>
      </div>
    </footer>
  );
}
