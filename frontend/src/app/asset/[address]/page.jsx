"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  getTokenURI,
  getERC721Name,
  getERC721Symbol,
} from "../../../utils/property";

export default function FractionalizeDetailPage() {
  const pathname = usePathname();
  const [address, setAddress] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const pathParts = pathname.split("/");
    setAddress(pathParts[pathParts.length - 1]);
  }, [pathname]);

  useEffect(() => {
    if (!address) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);

        const uri = await getTokenURI(address, 1);
        const tokenName = await getERC721Name(address);
        const symbol = await getERC721Symbol(address, 1);

        let metadata = null;
        if (uri.startsWith("data:application/json,")) {
          const jsonStr = uri.replace("data:application/json,", "");
          metadata = JSON.parse(jsonStr);
        } else {
          const res = await fetch(uri);
          metadata = await res.json();
        }

        const combined = { ...metadata, tokenName, symbol };
        setProperty(combined);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("⚠️ Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [address]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] px-4 py-10">
      <div className="p-8 w-full max-w-3xl space-y-6 bg-[#1e293b] shadow-2xl rounded-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2 justify-center">
          🏠 Asset Details
        </h2>

        {/* Contract Address */}
        {address && (
          <div className="bg-[#0f172a] p-4 rounded-lg text-center border border-gray-700">
            <p className="text-sm text-gray-400">Contract Address</p>
            <p className="font-mono break-all text-blue-400 font-medium">
              {address}
            </p>
          </div>
        )}

        {loading && (
          <p className="text-gray-400 animate-pulse text-center">
            ⏳ Loading property data...
          </p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {property && (
          <div className="mt-6 space-y-6">
            {/* Image preview */}
            {property.image && (
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src={
                    property.image.startsWith("ipfs://")
                      ? `https://ipfs.io/ipfs/${property.image.replace(
                          "ipfs://",
                          ""
                        )}`
                      : `https://ipfs.io/ipfs/${property.image}`
                  }
                  alt={property.propertyName || property.name}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-700 rounded-lg bg-[#0f172a]">
                <p className="text-gray-400 text-sm">Asset Name</p>
                <p className="font-semibold text-white">{property.name}</p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-[#0f172a]">
                <p className="text-gray-400 text-sm">Token / Symbol</p>
                <p className="font-semibold text-white">
                  {property?.tokenName} / {property?.symbol}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 border border-gray-700 rounded-lg bg-[#0f172a]">
              <p className="text-gray-400 text-sm mb-1">Description</p>
              <p className="text-gray-200 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                href={`/fractionalize?address=${address}`}
                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 rounded-xl font-semibold text-lg text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
              >
                🔗 Fractionalize this Asset
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
