"use client";

import React, { useState } from "react";

import {
  connectFreighter,
  retrievePublicKey,
  shortenPublicKey,
} from "../services/stellar-helpers";

export default function WalletConnectButton() {
  const [walletAddress, setWalletAddress] = useState("Connect Wallet");
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);

      const connected = await connectFreighter();

      if (!connected) {
        return;
      }

      const publicKey = await retrievePublicKey();

      setWalletAddress(shortenPublicKey(publicKey));
      setWalletConnected(true);

      console.log("Wallet Connected:", publicKey);
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="cursor-pointer rounded-lg bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-[var(--button-bg-hover)] disabled:opacity-50"
    >
      {loading
        ? "Connecting..."
        : walletConnected
          ? walletAddress
          : "Connect Wallet"}
    </button>
  );
}
