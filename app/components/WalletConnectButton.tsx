"use client";

import React, { useContext, useState } from "react";
import { WalletContext } from "./WalletProvider";

export default function WalletConnectButton() {
  const { address, connected, connect, disconnect } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    if (connected) {
      disconnect();
      return;
    }

    try {
      setLoading(true);
      await connect();
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const buttonText = loading
    ? "Connecting..."
    : connected && address
      ? `Disconnect (${address})`
      : "Connect Wallet";

  return (
    <button
      onClick={handleButtonClick}
      disabled={loading}
      className="cursor-pointer rounded-lg bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-[var(--button-bg-hover)] disabled:opacity-50"
    >
      {buttonText}
    </button>
  );
}
