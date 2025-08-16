'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { avalanche, avalancheFuji, sepolia, arbitrum, mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'My Next.js 15 App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, // from WalletConnect Cloud
  chains: [avalanche, avalancheFuji, sepolia, mainnet, arbitrum],
  ssr: true, // important for Next.js App Router
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
