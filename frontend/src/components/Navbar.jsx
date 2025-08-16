'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Left side: Logo */}
      <div className="flex items-center gap-3">
        <img src="/globe.svg" alt="Logo" className="h-8 w-8" />
        <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow">My App</span>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex gap-8">
        <a href="/" className="text-lg font-semibold text-white hover:text-yellow-300 transition-colors duration-200">Home</a>
        <a href="/fractionalize" className="text-lg font-semibold text-white hover:text-yellow-300 transition-colors duration-200">Fractionalize</a>
        <a href="/about" className="text-lg font-semibold text-white hover:text-yellow-300 transition-colors duration-200">About</a>
      </div>

      {/* Right side: Connect Button */}
      <div className="flex items-center gap-2">
        <ConnectButton />
      </div>
    </nav>
  );
}
