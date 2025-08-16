"use client";

import { useState, useEffect } from "react";
import { deployFractionalizer } from "../utils/fractionalize";
import Link from "next/link";

export default function FractionalizeForm() {
  const [nftAddress, setNftAddress] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [deployedAddresses, setDeployedAddresses] = useState([]);
  const [recentAddress, setRecentAddress] = useState("");

  // Load saved addresses on mount
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
      alert("Details unentered");
      return;
    }

    try {
      setLoading(true);

      const { contractAddress } = await deployFractionalizer(
        nftAddress,
        nftName,
        nftSymbol
      );

      // Always append to the existing array
      const updatedAddresses = [...deployedAddresses, contractAddress];

      // Save in localStorage
      localStorage.setItem(
        "FractionalAddresses",
        JSON.stringify(updatedAddresses)
      );

      // Update state
      setDeployedAddresses(updatedAddresses);
      setRecentAddress(contractAddress);

    } catch (error) {
      console.error("⚠️ Fractionalization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Fractionalize NFT</h2>

      <input
        type="text"
        name="nftAddress"
        placeholder="NFT Address"
        value={nftAddress}
        onChange={(e) => setNftAddress(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="nftName"
        placeholder="Token Name"
        value={nftName}
        onChange={(e) => setNftName(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="nftSymbol"
        placeholder="Token Symbol"
        value={nftSymbol}
        onChange={(e) => setNftSymbol(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <button
        onClick={handleFractionalize}
        disabled={loading}
        className="bg-indigo-600 text-white p-2 rounded w-full"
      >
        {loading ? "Deploying..." : "Fractionalize NFT"}
      </button>

      {/* Recently deployed contract */}
      {recentAddress && (
        <p className="mt-4 text-green-700 font-medium">
          ✅ Recently Deployed at:{" "}
          <span className="font-mono">{recentAddress}</span>
        </p>
      )}

      {/* All contracts list */}
      {deployedAddresses.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-3">All Contracts</h3>
          <div className="grid gap-3">
            {deployedAddresses.map((addr, idx) => (
              <Link
                key={idx}
                href={`/fractionalize/${addr}`}
                className="block rounded-lg border border-gray-200 bg-white p-3 shadow-sm 
                     hover:shadow-md transition-all duration-200"
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
  );
}
