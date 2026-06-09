"use client";

import { useContext } from "react";
import { useParams } from "next/navigation";
import TransactionsTable from "@/app/components/TransactionsTable";
import { WalletContext } from "@/app/components/WalletProvider";

const statusConfig: Record<
  string,
  { title: string; apiPath: string; description: string }
> = {
  "total-issued": {
    title: "Total Issued Certificates",
    apiPath: "certificates",
    description:
      "All issued certificate records from the backend, including active, pending, and revoked entries.",
  },
  active: {
    title: "Active Certificates",
    apiPath: "certificates?status=Active",
    description: "Certificates currently marked as active and valid.",
  },
  pending: {
    title: "Pending Certificates",
    apiPath: "certificates?status=Pending",
    description:
      "Certificates that are still pending issuance or verification.",
  },
  revoked: {
    title: "Revoked Certificates",
    apiPath: "certificates?status=Revoked",
    description: "Certificates that have been revoked and are no longer valid.",
  },
};

export default function CertificateStatusPage() {
  const params = useParams();
  const statusParam = Array.isArray(params?.status)
    ? params.status[0]
    : params?.status || "";
  const { connected } = useContext(WalletContext);

  if (!connected) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-white to-zinc-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl">
              🔒
            </div>
            <h1 className="text-3xl font-semibold text-zinc-950">
              Wallet Required
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Connect your Stellar wallet to view certificate dashboards.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const config = statusConfig[statusParam];

  if (!config) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-white to-zinc-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-semibold text-zinc-950">Not found</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              The requested certificate dashboard was not found.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-zinc-950">
                {config.title}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-zinc-600">
                {config.description}
              </p>
            </div>
          </div>
        </div>

        <TransactionsTable title={config.title} apiPath={config.apiPath} />
      </div>
    </main>
  );
}
