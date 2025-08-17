import {
  waitForTransactionReceipt,
  readContract,
  writeContract
} from "@wagmi/core";
import Marketplace from './abi/MarketPlace.json';
import { config } from '../../wagmi'; // your wagmi config file

export async function fundMarket(contractAddress, usdcAmount, shareAmount) {
  return await writeContract(config, {
    address: contractAddress,
    abi: Marketplace.abi,
    functionName: 'fundMarket',
    args: [usdcAmount, shareAmount],
  });
}

export async function buyShares(contractAddress, amount) {
  return await writeContract(config, {
    address: contractAddress,
    abi: Marketplace.abi,
    functionName: 'buyShares',
    args: [amount],
  });
}

export async function sellShares(contractAddress, amount) {
  return await writeContract(config, {
    address: contractAddress,
    abi: Marketplace.abi,
    functionName: 'buyShares',
    args: [amount],
  });
}

// read 
export async function usdc(contractAddress) {
  return await readContract(config, {
    address: contractAddress,
    abi: Marketplace.abi,
    functionName: "usdc",
  });
}

export async function shares(contractAddress) {
  return await readContract(config, {
    address: contractAddress,
    abi: Marketplace.abi,
    functionName: "shares",
  });
}