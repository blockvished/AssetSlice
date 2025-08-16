"use client";

import { useState } from "react";
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
  const [deployedAddress, setDeployedAddress] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDeploy = async () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);

      const { contractAddress } = await deployPropertyNFT(
        address, // `to` = connected wallet
        form.name,
        form.symbol,
        form.propertyName,
        form.typeOf,
        form.description,
        form.image
      );

      // Store contract address in localStorage
      localStorage.setItem("propertyNFTAddress", contractAddress);

      setDeployedAddress(contractAddress);
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

      {deployedAddress && (
        <p className="mt-4">
          ✅ Deployed at: <span className="font-mono">{deployedAddress}</span>
        </p>
      )}
    </div>
  );
}
