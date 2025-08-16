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
      console.error("⚠️ Deployment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        
        {/* Left Side - Form & Recent */}
        <div className="p-8 space-y-6 bg-white shadow-xl rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            🏠 Deploy Property NFT
          </h2>

          {/* Form */}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Token Name"
              value={form.name}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <input
              type="text"
              name="symbol"
              placeholder="Symbol"
              value={form.symbol}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <input
              type="text"
              name="propertyName"
              placeholder="Asset Name"
              value={form.propertyName}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <input
              type="text"
              name="typeOf"
              placeholder="Asset Type"
              value={form.typeOf}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
              rows={3}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URI (ipfs://CID)"
              value={form.image}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />

            <button
              onClick={handleDeploy}
              disabled={loading}
              className="bg-indigo-600 text-white p-3 rounded-lg w-full shadow-md hover:bg-indigo-700 transition"
            >
              {loading ? "🚀 Deploying..." : "Deploy Contract"}
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
        </div>

        {/* Right Side - All Contracts */}
        <div className="p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            📜 All Property Contracts
          </h3>
          {deployedAddresses.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {deployedAddresses.map((addr, idx) => (
                <Link
                  key={idx}
                  href={`/asset/${addr}`}
                  className="block rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <p className="font-mono text-sm break-all text-blue-600 hover:text-blue-800">
                    {addr}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No contracts deployed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
