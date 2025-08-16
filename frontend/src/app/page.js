"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroIllustration = () => (
  <img
    src="/car-home.avif"
    alt="House, Car, Crypto Illustration"
    className="w-full max-w-md h-auto drop-shadow-lg"
  />
);

export default function Home() {
  const [sparklePositions, setSparklePositions] = useState([]);
  useEffect(() => {
    const positions = Array.from({ length: 14 }, () => ({
      top: `${10 + Math.random() * 80}%`,
      left: `${5 + Math.random() * 90}%`,
    }));
    setSparklePositions(positions);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center min-h-[90vh] px-6 md:px-20 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a]">
      {/* Gradient orbs */}
      <div className="absolute -top-40 left-10 w-96 h-96 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="absolute -bottom-40 right-10 w-[30rem] h-[30rem] bg-gradient-to-r from-blue-700 to-purple-600 rounded-full opacity-20 blur-3xl z-0"></div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {sparklePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white opacity-40 rounded-full blur-sm"
            style={pos}
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Left - Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col justify-center items-start space-y-6 z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Fractional Ownership for Any Asset — On-Chain
          </span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-lg leading-relaxed">
          Seamlessly fractionalize any NFT-backed asset and distribute rental income or yields directly to token holders
        </p>
        <Link
          href="/asset"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1e3a8a] via-[#312e81] to-[#1e40af] px-8 py-3 rounded-xl font-semibold text-lg text-white shadow-lg shadow-indigo-900/40 hover:shadow-indigo-800/60 hover:scale-105 transition-transform duration-300"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <rect width="22" height="14" y="4" rx="4" />
            <path d="M7 11h8" />
          </svg>
          Create Asset
        </Link>
      </motion.div>

      {/* Right - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex-1 flex items-center justify-center z-10"
      >
        <div className="p-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10">
          <HeroIllustration />
        </div>
      </motion.div>
    </div>
  );
}
