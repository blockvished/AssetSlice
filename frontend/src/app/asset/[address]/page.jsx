"use client";

import { useParams } from "next/navigation";

export default function FractionalizeDetailPage() {
  const { address } = useParams(); // ✅ matches folder name [address]

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Fractionalized NFT Details</h2>
      <p>
        Contract Address:{" "}
        <span className="font-mono break-all text-blue-600">{address}</span>
      </p>

      {/* you can later fetch contract metadata here */}
      <p className="text-gray-700">
        This fractionalized NFT contract lives at {address}.
      </p>
    </div>
  );
}
