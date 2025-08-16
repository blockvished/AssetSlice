"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const HeroIllustration = () => (
  <img src="/car-home.avif" alt="House, Car, Crypto Illustration" className="w-full max-w-md h-auto" />
);

export default function Home() {
  const router = useRouter();

  // Sparkle positions state and effect
  const [sparklePositions, setSparklePositions] = useState([]);
  useEffect(() => {
    const positions = Array.from({ length: 12 }, () => ({
      top: `${10 + Math.random() * 80}%`,
      left: `${5 + Math.random() * 90}%`,
    }));
    setSparklePositions(positions);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-[85vh] bg-white px-4 md:px-16 overflow-hidden">
      {/* Dynamic color blobs background */}
      <div className="absolute -top-40 left-0 w-2/5 h-96 bg-pink-400 rounded-full opacity-30 filter blur-3xl pointer-events-none z-0"></div>
      <div className="absolute -bottom-56 right-0 w-2/4 h-96 bg-indigo-300 rounded-full opacity-30 filter blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-44 left-1/3 w-72 h-72 bg-fuchsia-300 rounded-full opacity-20 filter blur-3xl pointer-events-none z-0"></div>
      {/* Sparkles/particles overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="animate-pulse-slow">
          {sparklePositions.map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white opacity-40 rounded-full blur-md"
              style={pos}
            />
          ))}
        </div>
      </div>
      {/* Left - Text */}
      <div className="flex-1 flex flex-col justify-center items-start space-y-7 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Keep your Asset safe
        </h1>
        <p className="text-gray-800 text-lg max-w-md">
          Bring your real world assets onchain by minting them as NFTs for secure, transparent digital ownership.
        </p>
        <Link
          href="/asset"
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 px-7 py-3 rounded-lg font-semibold text-lg text-white shadow-lg hover:scale-105 hover:from-pink-600 hover:to-fuchsia-600 transition"
        >
          <svg width="22" height="22" fill="none"><rect width="22" height="14" y="4" rx="4" fill="#fff" stroke="#b832fa" strokeWidth="2"/><path d="M7 11h8" stroke="#b832fa" strokeWidth="2" strokeLinecap="round"/></svg>
          Create Asset
        </Link>
      </div>
      {/* Right - Illustration */}
      <div className="flex-1 flex items-center justify-center z-10">
        <div className="p-6 bg-white/80 rounded-2xl shadow-2xl">
          <HeroIllustration />
        </div>
      </div>
    </div>
  );
}
