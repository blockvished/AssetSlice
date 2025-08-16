"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { deployPropertyNFT } from "../utils/property";

export default function Home() {
  
  return (
    <div className="p-6 space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">OUR IDEA</h2>
      <p>more about our idea and so on design this</p>
      create an nft of your real world asset for ownership
      <>Go now http://localhost:3000/property</>
    </div>
  );
}
