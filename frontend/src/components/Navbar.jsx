"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Assets", href: "/asset" },
    { name: "Fractionalize", href: "/fractionalize" },
    { name: "Marketplace", href: "/marketplace" },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-[#0a1a2f] via-[#0d213f] to-[#111827] border-b border-indigo-800/40 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left side: Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">
            Asset<span className="text-indigo-400">Slice</span>
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex gap-2 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  active
                    ? "bg-indigo-500 text-white shadow-md"
                    : "text-gray-300 hover:bg-indigo-600/30 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right side: Connect Button */}
        <div className="flex items-center gap-3">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
