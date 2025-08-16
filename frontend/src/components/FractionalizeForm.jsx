"use client";
import React, { useState } from "react";

const FractionalizeForm = () => {
  const [nftAddress, setNftAddress] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(nftAddress, nftName, nftSymbol)
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-md bg-white max-w-md mx-auto">
      <div>
        <label htmlFor="nftAddress" className="block text-sm font-medium text-gray-700">NFT Address</label>
        <input
          type="text"
          id="nftAddress"
          value={nftAddress}
          onChange={(e) => setNftAddress(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="nftName" className="block text-sm font-medium text-gray-700">NFT Name</label>
        <input
          type="text"
          id="nftName"
          value={nftName}
          onChange={(e) => setNftName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="nftSymbol" className="block text-sm font-medium text-gray-700">NFT Symbol</label>
        <input
          type="text"
          id="nftSymbol"
          value={nftSymbol}
          onChange={(e) => setNftSymbol(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700"
      >
        Fractionalize NFT
      </button>
    </form>
  );
};

export default FractionalizeForm;
