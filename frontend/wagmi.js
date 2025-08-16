import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { avalanche, arbitrum, mainnet, avalancheFuji, sepolia, anvil } from 'wagmi/chains';


export const avalancheFujiTo = defineChain({
  id: 43113, // Fuji testnet chainId stays the same
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji-local',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:9650/ext/bc/C/rpc'] },
    public: { http: ['http://127.0.0.1:9650/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Snowtrace (Fuji)', url: 'https://testnet.snowtrace.io' },
  },
});


export const config = getDefaultConfig({
  appName: 'My Next.js 15 App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, // from WalletConnect Cloud
  chains: [avalancheFujiTo, avalanche, sepolia, mainnet, arbitrum],
  ssr: true, // important for Next.js App Router
});