"use client";

import { useState } from "react";

export default function MarketPlace() {
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [fundUsdc, setFundUsdc] = useState("");
  const [fundShares, setFundShares] = useState("");
  const [txStatus, setTxStatus] = useState("");

  const handleBuy = async () => {
    if (!buyAmount) return alert("⚠️ Enter amount to buy");
    try {
      setTxStatus("⏳ Processing buy...");
      setTimeout(() => {
        setTxStatus(`✅ Bought ${buyAmount} shares successfully!`);
        setBuyAmount("");
      }, 1500);
    } catch (e) {
      console.error(e);
      setTxStatus("❌ Buy failed.");
    }
  };

  const handleSell = async () => {
    if (!sellAmount) return alert("⚠️ Enter amount to sell");
    try {
      setTxStatus("⏳ Processing sell...");
      setTimeout(() => {
        setTxStatus(`✅ Sold ${sellAmount} shares successfully!`);
        setSellAmount("");
      }, 1500);
    } catch (e) {
      console.error(e);
      setTxStatus("❌ Sell failed.");
    }
  };

  const handleFundMarket = async () => {
    if (!fundUsdc || !fundShares) return alert("⚠️ Enter USDC & Shares to fund");
    try {
      setTxStatus("⏳ Funding market...");
      setTimeout(() => {
        setTxStatus(
          `✅ Funded with ${fundUsdc} USDC & ${fundShares} Shares successfully!`
        );
        setFundUsdc("");
        setFundShares("");
      }, 1500);
    } catch (e) {
      console.error(e);
      setTxStatus("❌ Fund failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        
        {/* Left Panel → Buy & Sell */}
        <div className="p-8 rounded-2xl bg-[#0f172a]/90 backdrop-blur-xl shadow-2xl border border-white/10 space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">🛒 Trade Shares</h2>

          {/* Buy Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Buy Shares</h3>
            <input
              type="number"
              placeholder="Amount to Buy"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="border border-white/20 bg-white/10 placeholder-gray-400 text-white p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleBuy}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg w-full shadow-md hover:shadow-xl hover:scale-105 transition-all font-semibold"
            >
              Buy
            </button>
          </div>

          {/* Sell Form */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Sell Shares</h3>
            <input
              type="number"
              placeholder="Amount to Sell"
              value={sellAmount}
              onChange={(e) => setSellAmount(e.target.value)}
              className="border border-white/20 bg-white/10 placeholder-gray-400 text-white p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSell}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg w-full shadow-md hover:shadow-xl hover:scale-105 transition-all font-semibold"
            >
              Sell
            </button>
          </div>
        </div>

        {/* Right Panel → Fund Market & Status */}
        <div className="p-8 rounded-2xl bg-[#0f172a]/90 backdrop-blur-xl shadow-2xl border border-white/10 space-y-6">
          <h2 className="text-3xl font-bold text-white text-center">💰 Fund Market</h2>

          {/* Fund Market Form */}
          <div className="space-y-4">
            <input
              type="number"
              placeholder="USDC Amount"
              value={fundUsdc}
              onChange={(e) => setFundUsdc(e.target.value)}
              className="border border-white/20 bg-white/10 placeholder-gray-400 text-white p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Share Amount"
              value={fundShares}
              onChange={(e) => setFundShares(e.target.value)}
              className="border border-white/20 bg-white/10 placeholder-gray-400 text-white p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleFundMarket}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg w-full shadow-md hover:shadow-xl hover:scale-105 transition-all font-semibold"
            >
              Fund Market
            </button>
          </div>

          {/* Tx Status */}
          {txStatus && (
            <div className="p-4 bg-blue-600/20 border border-blue-500/40 rounded-lg text-center">
              <p className="text-blue-300 font-medium">{txStatus}</p>
            </div>
          )}

          {/* Example contract */}
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2 text-white">📜 Marketplace Contract</h3>
            <p className="font-mono text-sm break-all text-blue-400">
              0x346019e77287e910bf776d9be040ab731da7671
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
