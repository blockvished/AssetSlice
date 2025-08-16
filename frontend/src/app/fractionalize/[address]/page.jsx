"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getERC20Name,
  getERC20Symbol,
  getTotalShares,
  getPropertyNFT,
  getIsLocked,
  fractionalize,
  unfractionalize,
  approveNFT,
  isApprovedForFractionalizer,
} from "../../../utils/fractionalize";

export default function FractionalizedNFTDetailPage() {
  const { address } = useParams(); // fractionalizer contract address
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fractionalData, setFractionalData] = useState(null);

  // form inputs
  const [tokenId] = useState("1"); // ✅ fixed to 1
  const [shareCount, setShareCount] = useState("");
  const [toAddress, setToAddress] = useState("");

  const [txStatus, setTxStatus] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    if (!address) return;

    const fetchFractionalData = async () => {
      try {
        setLoading(true);

        const [name, symbol, totalShares, propertyNFT, isLocked] =
          await Promise.all([
            getERC20Name(address),
            getERC20Symbol(address),
            getTotalShares(address),
            getPropertyNFT(address),
            getIsLocked(address),
          ]);

        setFractionalData({
          name,
          symbol,
          totalShares,
          propertyNFT,
          isLocked,
        });
      } catch (err) {
        console.error("Error fetching fractionalized NFT:", err);
        setError("⚠️ Failed to fetch fractionalized NFT details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFractionalData();
  }, [address]);

  // ✅ Check approval whenever propertyNFT changes
  useEffect(() => {
    const check = async () => {
      if (!fractionalData?.propertyNFT) return;
      try {
        const approved = await isApprovedForFractionalizer(
          fractionalData.propertyNFT,
          address,
          tokenId
        );
        setIsApproved(approved);
      } catch (err) {
        console.error("Approval check failed:", err);
        setIsApproved(false);
      }
    };
    check();
  }, [fractionalData?.propertyNFT, tokenId, address]);

  const handleFractionalize = async () => {
    try {
      if (!fractionalData?.propertyNFT || !shareCount) return;

      if (!isApproved) {
        setTxStatus("❌ NFT not approved for fractionalizer contract.");
        return;
      }

      setTxStatus("Sending fractionalize tx...");
      const tx = await fractionalize(address, tokenId, shareCount);
      setTxStatus("✅ Fractionalized! Tx: " + tx.hash);
    } catch (err) {
      console.error("Fractionalize failed:", err);
      setTxStatus("❌ Transaction failed");
    }
  };

  const handleUnfractionalize = async () => {
    try {
      if (!toAddress) return;

      setTxStatus("Sending unfractionalize tx...");
      const tx = await unfractionalize(address, toAddress);
      setTxStatus("✅ Unfractionalized! Tx: " + tx.hash);
    } catch (err) {
      console.error("Unfractionalize failed:", err);
      setTxStatus("❌ Transaction failed");
    }
  };

  const handleApprove = async () => {
    try {
      if (!fractionalData?.propertyNFT) return;
      setTxStatus("Sending approve tx...");
      const tx = await approveNFT(fractionalData.propertyNFT, address, tokenId);
      setTxStatus("✅ Approved! Tx: " + tx.hash);
      setIsApproved(true);
    } catch (err) {
      console.error("Approval failed:", err);
      setTxStatus("❌ Approval failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="p-8 w-full max-w-3xl space-y-6 bg-white shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 justify-center">
          🔗 Fractionalized NFT
        </h2>

        {address && (
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Fractionalizer Address</p>
            <p className="font-mono break-all text-blue-700 font-medium">
              {address}
            </p>
          </div>
        )}

        {loading && (
          <p className="text-gray-500 animate-pulse text-center">
            ⏳ Loading fractionalized data...
          </p>
        )}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {fractionalData && (
          <div className="mt-6 space-y-6">
            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-sm">Token Name</p>
                <p className="font-semibold text-gray-900">
                  {fractionalData.name}
                </p>
              </div>
              <div className="p-4 border rounded-lg bg-gray-50">
                <p className="text-gray-500 text-sm">Symbol</p>
                <p className="font-semibold text-gray-900">
                  {fractionalData.symbol}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm mb-1">Total Shares</p>
              <p className="text-gray-800 leading-relaxed">
                {Number(fractionalData.totalShares) / 1e18}
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm mb-1">Underlying NFT</p>
              <p className="font-mono break-all text-blue-700">
                {fractionalData.propertyNFT}
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-500 text-sm mb-1">Locked?</p>
              <p
                className={`font-semibold ${
                  fractionalData.isLocked ? "text-red-600" : "text-green-600"
                }`}
              >
                {fractionalData.isLocked ? "Yes 🔒" : "No 🔓"}
              </p>
            </div>

            {/* Forms */}
            {fractionalData.isLocked ? (
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold text-lg mb-2">Unfractionalize</h3>
                <input
                  type="text"
                  placeholder="Recipient address"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                />
                <button
                  onClick={handleUnfractionalize}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  🔓 Unfractionalize
                </button>
              </div>
            ) : (
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold text-lg mb-2">Fractionalize</h3>

                {/* No tokenId input → always using 1 */}

                {!isApproved ? (
                  <button
                    onClick={handleApprove}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    ✅ Approve NFT (Token ID = 1)
                  </button>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Share Count"
                      value={shareCount}
                      onChange={(e) => setShareCount(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 mb-2"
                    />
                    <button
                      onClick={handleFractionalize}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      🔗 Fractionalize (Token ID = 1)
                    </button>
                  </>
                )}
              </div>
            )}

            {txStatus && (
              <p className="text-center text-sm text-gray-700">{txStatus}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
