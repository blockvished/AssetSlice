import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalanche, arbitrum, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'My Next.js 15 App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, // from WalletConnect Cloud
  chains: [avalanche, mainnet, arbitrum],
  ssr: true, // important for Next.js App Router
});