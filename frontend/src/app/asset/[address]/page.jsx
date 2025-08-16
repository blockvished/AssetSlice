"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link"; // ✅ Import Link
import { getTokenURI, getERC721Name, getERC721Symbol } from "../../../utils/property";

export default function FractionalizeDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  const [address, setAddress] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params?.address) {
      setAddress(params.address);
    } else if (pathname) {
      const pathParts = pathname.split("/");
      setAddress(pathParts[pathParts.length - 1]);
    }
  }, [params, pathname]);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="p-8 w-full max-w-3xl space-y-6 bg-white shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 justify-center">
          🏠 Asset Details
        </h2>

        {/* Contract Address */}
        {address && (
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Contract Address</p>
            <p className="font-mono break-all text-blue-700 font-medium">
              {address}
            </p>
          </div>
        )}

        {loading && (
          <p className="text-gray-500 animate-pulse text-center">
            ⏳ Loading property data...
          </p>
        )}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {property && (
          <div className="mt-6 space-y-6">
            {/* Image preview */}
            {property.image && (
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src={
                    property.image.startsWith("ipfs://")
                      ? `https://ipfs.io/ipfs/${property.image.replace("ipfs://", "")}`
                      : `https://ipfs.io/ipfs/${property.image}`
                  }
                  alt={property.propertyName || property.name}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-sm">Asset Name</p>
                <p className="font-semibold text-gray-900">{property.name}</p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-sm">Token / Symbol</p>
                <p className="font-semibold text-gray-900">
                  {property?.tokenName} / {property?.symbol}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm mb-1">Description</p>
              <p className="text-gray-800 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Link
                href={`/fractionalize?address=${address}`} // ✅ Pass as query param
                className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              >
                Fractionalize this Asset
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
