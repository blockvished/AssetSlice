"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { deployPropertyNFT } from "../utils/property";

export default function DeployPropertyForm() {
  const { address } = useAccount(); // connected wallet
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

  // Load saved addresses on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("propertyNFTAddresses")) || [];
      setDeployedAddresses(Array.isArray(saved) ? saved : []);
    } catch (e) {
      console.error("Invalid localStorage data, resetting...");
      setDeployedAddresses([]);
    }
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDeploy = async () => {
    if (!address) {
      alert("Wallet not connected");
      return;
    }

    if (!form.name || !form.symbol || !form.propertyName || !form.typeOf || !form.description || !form.image) {
      alert("Details unentered");
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

      // Always append to the existing array
      const updatedAddresses = [...deployedAddresses, contractAddress];

      // Save in localStorage
      localStorage.setItem(
        "propertyNFTAddresses",
        JSON.stringify(updatedAddresses)
      );

      // Update state
      setDeployedAddresses(updatedAddresses);
      setRecentAddress(contractAddress);

    } catch (error) {
      console.log("User rejected transaction — no problem.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Deploy Property NFT</h2>

      <input
        type="text"
        name="name"
        placeholder="Collection Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="symbol"
        placeholder="Collection Symbol"
        value={form.symbol}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="propertyName"
        placeholder="Property Name"
        value={form.propertyName}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="typeOf"
        placeholder="Property Type"
        value={form.typeOf}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URI (ipfs://CID)"
        value={form.image}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <button
        onClick={handleDeploy}
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded w-full"
      >
        {loading ? "Deploying..." : "Deploy Contract"}
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
          <h3 className="font-bold text-lg">All Deployed Contracts:</h3>
          <ul className="list-disc pl-6 space-y-1">
            {deployedAddresses.map((addr, idx) => (
              <li key={idx} className="font-mono text-sm break-all">
                {addr}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
