import {
  deployContract,
  waitForTransactionReceipt,
  readContract,
  writeContract
} from "@wagmi/core";
import Fractionalizer from './abi/Fractionalizer.json';
import PropertyNFT from './abi/PropertyNFT.json'; // ABI + bytecode
import { config } from '../../wagmi'; // your wagmi config file

/**
 * Deploy Fractionalizer contract
 * @param nftAddress address of ERC721 contract
 * @returns transaction hash
 */
export async function deployFractionalizer(nftAddress, name, symbol) {
  if (!nftAddress) throw new Error("NFT address required");

  const hash = await deployContract(config, {
    abi: Fractionalizer.abi,
    bytecode: Fractionalizer.bytecode.object,
    args: [nftAddress, name, symbol], // constructor param
  });

  const receipt = await waitForTransactionReceipt(config, { hash });

  return {
    hash,
    contractAddress: receipt.contractAddress,
  };

}

// approve on nft for transferFrom
export async function approveNFT(contractAddress, to, tokenId) {
  return await writeContract(config, {
    address: contractAddress,
    abi: PropertyNFT.abi,
    functionName: 'approve',
    args: [to, tokenId],
  });
}

/* Call fractionalize() on deployed contract */
export async function fractionalize(contractAddress, tokenId, shareCount) {
  return await writeContract(config, {
    address: contractAddress,
    abi: Fractionalizer.abi,
    functionName: 'fractionalize',
    args: [tokenId, shareCount], // both args are required
  });
}

/* Call unfractionalize(to) */
export async function unfractionalize(contractAddress, to) {
  return await writeContract(config, {
    address: contractAddress,
    abi: Fractionalizer.abi,
    functionName: 'unfractionalize',
    args: [to],
  });
}

/* Read total shares */
export async function getTotalShares(contractAddress) {
  return await readContract(config, {
    address: contractAddress,
    abi: Fractionalizer.abi,
    functionName: "totalShares",
  });
}

/* Read ERC20 share token name */
export async function getERC20Name(contractAddress) {
  return await readContract(config, {
    address: contractAddress,
    abi: Fractionalizer.abi,
    functionName: "name",
  });
}

/* Read ERC20 share token symbol */
export async function getERC20Symbol(contractAddress) {
  return await readContract(config, {
    address: contractAddress,
    abi: Fractionalizer.abi,
    functionName: "symbol",
  });
}

/* Read underlying ERC721 propertyNFT address */
export async function getPropertyNFT(contractAddress) {
  return await readContract(config, {
    address: contractAddress,
    abi: Fractionalizer.abi,
    functionName: "propertyNFT",
  });
}

/* Read isLocked state */
export async function getIsLocked(contractAddress) {
  return await readContract(config, {
    address: contractAddress,
    abi: Fractionalizer.abi,
    functionName: "isLocked",
  });
}

/* Optional: gather multiple state values at once */
export async function getFractionalizerState(contractAddress) {
  const [isLocked, totalShares, propertyNFT, name, symbol] = await Promise.all([
    getIsLocked(contractAddress),
    getTotalShares(contractAddress),
    getPropertyNFT(contractAddress),
    getERC20Name(contractAddress),
    getERC20Symbol(contractAddress),
  ]);

  return { isLocked, totalShares, propertyNFT, name, symbol };
}

export async function isApprovedForFractionalizer(
  nftAddress,
  fractionalizerAddress,
  tokenId
) {
  const approved = await readContract({
    address: nftAddress,
    abi: ERC721ABI,
    functionName: "getApproved",
    args: [tokenId],
  });

  return approved.toLowerCase() === fractionalizerAddress.toLowerCase();
}