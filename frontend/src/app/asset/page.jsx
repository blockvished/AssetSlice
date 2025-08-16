"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { deployPropertyNFT } from "../../utils/property";
import Link from "next/link";

export default function DeployPropertyForm() {
  const { address } = useAccount();
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    propertyName: "",
    typeOf: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [deployedAddresses, setDeployedAddresses] = useState([]);
  const [recentAddress, setRecentAddress] = useState("");

  useEffect(() => {
    try {
      const saved =
        JSON.parse(localStorage.getItem("propertyNFTAddresses")) || [];
      setDeployedAddresses(Array.isArray(saved) ? saved : []);
    } catch {
      setDeployedAddresses([]);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDeploy = async () => {
    if (!address) {
      alert("⚠️ Wallet not connected");
      return;
    }

    if (
      !form.name ||
      !form.symbol ||
      !form.propertyName ||
      !form.typeOf ||
      !form.description ||
      !form.image
    ) {
      alert("⚠️ Please enter all details.");
      return;
    }

    try {
      setLoading(true);

      const { contractAddress } = await deployPropertyNFT(
        address,
        form.name,
        form.symbol,
        form.propertyName,
        form.typeOf,
        form.description,
        form.image
      );

      const updatedAddresses = [...deployedAddresses, contractAddress];
      localStorage.setItem(
        "propertyNFTAddresses",
        JSON.stringify(updatedAddresses)
      );

      setDeployedAddresses(updatedAddresses);
      setRecentAddress(contractAddress);
    } catch (error) {
      console.log("⚠️ Deployment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        
        {/* Left Side - Form & Recent */}
        <div className="p-8 space-y-6 bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">
          <h2 className="text-3xl font-extrabold text-white text-center">
            🏠 Deploy Asset NFT
          </h2>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Token Name"
              value={form.name}
              onChange={handleChange}
              className="border border-white/20 bg-white/5 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="symbol"
              placeholder="Symbol"
              value={form.symbol}
              onChange={handleChange}
              className="border border-white/20 bg-white/5 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="propertyName"
              placeholder="Asset Name"
              value={form.propertyName}
              onChange={handleChange}
              className="border border-white/20 bg-white/5 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="typeOf"
              placeholder="Asset Type (House, Car, etc.)"
              value={form.typeOf}
              onChange={handleChange}
              className="border border-white/20 bg-white/5 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border border-white/20 bg-white/5 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400"
              rows={3}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URI (ipfs://CID)"
              value={form.image}
              onChange={handleChange}
              className="border border-white/20 bg-white/5 p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-400"
            />

            <button
              onClick={handleDeploy}
              disabled={loading}
              className="bg-gradient-to-r from-[#1e3a8a] via-[#312e81] to-[#1e40af] text-white p-3 rounded-lg w-full shadow-lg shadow-indigo-900/40 hover:shadow-indigo-800/60 hover:scale-[1.02] transition-transform font-semibold text-lg"
            >
              {loading ? "🚀 Deploying..." : "Deploy Contract"}
            </button>
          </div>

          {/* Recently deployed contract */}
          {recentAddress && (
            <div className="p-4 bg-green-900/40 border border-green-500/40 rounded-lg text-green-200">
              <p className="font-medium">✅ Recently Deployed at:</p>
              <p className="font-mono text-sm break-all text-green-300">
                {recentAddress}
              </p>
            </div>
          )}
        </div>

        {/* Right Side - All Contracts */}
        <div className="p-8 bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">
          <h3 className="text-2xl font-bold mb-4 text-white">
            📜 All Asset Contracts
          </h3>
          {deployedAddresses.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {deployedAddresses.map((addr, idx) => (
                <Link
                  key={idx}
                  href={`/asset/${addr}`}
                  className="block rounded-lg border border-white/20 bg-white/5 p-3 shadow-sm hover:shadow-lg transition-all duration-200"
                >
                  <p className="font-mono text-sm break-all text-indigo-300 hover:text-indigo-200">
                    {addr}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">No contracts deployed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
