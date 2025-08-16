"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { deployFractionalizer } from "../utils/fractionalize";
import Link from "next/link";

export default function FractionalizeForm() {
  const searchParams = useSearchParams();
  const queryAddress = searchParams.get("address"); // ✅ read query param

  const [nftAddress, setNftAddress] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [deployedAddresses, setDeployedAddresses] = useState([]);
  const [recentAddress, setRecentAddress] = useState("");

  // Prefill address if query param exists
  useEffect(() => {
    if (queryAddress) {
      setNftAddress(queryAddress);
    }
  }, [queryAddress]);

  // Load saved addresses
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("FractionalAddresses")) || [];
      setDeployedAddresses(Array.isArray(saved) ? saved : []);
    } catch (e) {
      console.log("Invalid localStorage data, resetting...");
      setDeployedAddresses([]);
    }
  }, []);

  const handleFractionalize = async () => {
    if (!nftAddress || !nftName || !nftSymbol) {
      alert("⚠️ Please enter all details.");
      return;
    }

    try {
      setLoading(true);

      const { contractAddress } = await deployFractionalizer(
        nftAddress,
        nftName,
        nftSymbol
      );

      const updatedAddresses = [...deployedAddresses, contractAddress];
      localStorage.setItem("FractionalAddresses", JSON.stringify(updatedAddresses));

      setDeployedAddresses(updatedAddresses);
      setRecentAddress(contractAddress);
    } catch (error) {
      console.error("⚠️ Fractionalization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-4">
      <div className="p-8 w-full max-w-lg space-y-6 bg-[#0f172a]/90 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/10">
        <h2 className="text-3xl font-bold text-white text-center">
          🔗 Deploy Fractionalizer
        </h2>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="nftAddress"
            placeholder="NFT Address"
            value={nftAddress}
            onChange={(e) => setNftAddress(e.target.value)}
            className="border border-white/20 bg-white/10 placeholder-gray-400 text-white p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="nftName"
            placeholder="Token Name"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            className="border border-white/20 bg-white/10 placeholder-gray-400 text-white p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="nftSymbol"
            placeholder="Token Symbol"
            value={nftSymbol}
            onChange={(e) => setNftSymbol(e.target.value)}
            className="border border-white/20 bg-white/10 placeholder-gray-400 text-white p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleFractionalize}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg w-full shadow-md hover:shadow-xl hover:scale-105 transition-all font-semibold"
          >
            {loading ? "🚀 Deploying..." : "Deploy"}
          </button>
        </div>

        {/* Recently deployed contract */}
        {recentAddress && (
          <div className="p-4 bg-green-600/20 border border-green-500/40 rounded-lg">
            <p className="text-green-400 font-medium">
              ✅ Recently Deployed at:
            </p>
            <p className="font-mono text-sm break-all text-green-300">
              {recentAddress}
            </p>
          </div>
        )}

        {/* All contracts list */}
        {deployedAddresses.length > 0 && (
          <div>
            <h3 className="font-bold text-lg mb-3 text-white">📜 All Contracts</h3>
            <div className="grid gap-3">
              {deployedAddresses.map((addr, idx) => (
                <Link
                  key={idx}
                  href={`/fractionalize/${addr}`}
                  className="block rounded-lg border border-white/10 bg-white/5 p-3 shadow-sm hover:shadow-md hover:bg-white/10 transition-all duration-200"
                >
                  <p className="font-mono text-sm break-all text-blue-400 hover:text-blue-300">
                    {addr}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
