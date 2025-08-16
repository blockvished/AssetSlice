"use client"; // only if using Next.js App Router

import { useEffect, useState } from "react";
import { deployPropertyNFT, getProperty } from "../utils/property";

export default function PropertyPage() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load saved contracts from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("property_contracts") || "[]");
    setContracts(saved);
  }, []);

  // Save contract address into localStorage
  function saveContract(address) {
    const newContracts = [...contracts, { address }];
    setContracts(newContracts);
    localStorage.setItem("property_contracts", JSON.stringify(newContracts));
  }

  // Deploy a PropertyNFT
  async function handleDeploy() {
    try {
      setLoading(true);

      // Hardcoded example values — you can later replace with a form
      const { contractAddress } = await deployPropertyNFT(
        "0xYourWalletAddressHere", // recipient of minted NFT
        "My Property NFT",
        "PROP",
        "Villa Sunset",
        "House",
        "Luxury villa with sea view",
        "ipfs://CID/image.png"
      );

      saveContract(contractAddress);
    } catch (err) {
      console.error(err);
      alert("Deployment failed");
    } finally {
      setLoading(false);
    }
  }

  // Fetch property metadata from contract
  async function handleGetProperty(address) {
    try {
      const data = await getProperty(address);
      setContracts((prev) =>
        prev.map((c) => (c.address === address ? { ...c, metadata: data } : c))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to fetch property");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>PropertyNFT</h1>
      <p>Deploy and view PropertyNFT contracts</p>
      <p>list of nfts</p>
    </div>
  );
}
