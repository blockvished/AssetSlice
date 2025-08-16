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
      console.error("Invalid localStorage data, resetting...");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="p-8 w-full max-w-lg space-y-6 bg-white shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
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
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <input
            type="text"
            name="nftName"
            placeholder="Token Name"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
          <input
            type="text"
            name="nftSymbol"
            placeholder="Token Symbol"
            value={nftSymbol}
            onChange={(e) => setNftSymbol(e.target.value)}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />

          <button
            onClick={handleFractionalize}
            disabled={loading}
            className="bg-indigo-600 text-white p-3 rounded-lg w-full shadow-md hover:bg-indigo-700 transition"
          >
            {loading ? "🚀 Deploying..." : "Deploy"}
          </button>
        </div>

        {/* Recently deployed contract */}
        {recentAddress && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✅ Recently Deployed at:
            </p>
            <p className="font-mono text-sm break-all text-green-700">
              {recentAddress}
            </p>
          </div>
        )}

        {/* All contracts list */}
        {deployedAddresses.length > 0 && (
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900">📜 All Contracts</h3>
            <div className="grid gap-3">
              {deployedAddresses.map((addr, idx) => (
                <Link
                  key={idx}
                  href={`/fractionalize/${addr}`}
                  className="block rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <p className="font-mono text-sm break-all text-blue-600 hover:text-blue-800">
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
