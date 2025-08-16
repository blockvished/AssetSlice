'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Left side */}
      <div className="text-xl font-bold">My DApp</div>

      {/* Right side */}
      <ConnectButton />
    </nav>
  );
}
