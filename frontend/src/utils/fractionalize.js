import { writeContract } from '@wagmi/core';
import Fractionalizer from './abi/Fractionalizer.json';
import { config } from '../wagmi'; // your wagmi config file

/**
 * Deploy Fractionalizer contract
 * @param nftAddress address of ERC721 contract
 * @returns transaction hash
 */
export async function deployFractionalizer(nftAddress) {
  if (!nftAddress) throw new Error("NFT address required");

  const hash = await writeContract(config, {
    abi: Fractionalizer.abi,
    bytecode: Fractionalizer.bytecode,
    args: [nftAddress], // constructor param
  });

  const receipt = await waitForTransactionReceipt(config, { hash });

  return {
    hash,
    contractAddress: receipt.contractAddress,
  };

}

/* Call fractionalize() on deployed contract */
export async function fractionalize(contractAddress, tokenId) {
  return await writeContract(config, {
    address: contractAddress,
    abi: Fractionalizer.abi,
    functionName: 'fractionalize',
    args: [tokenId],
  });
}

/* Get contract state (isLocked, lockedTokenId, etc.) */
export async function getFractionalizerState(contractAddress){([
    readContract(config, {
      address: contractAddress,
      abi: Fractionalizer.abi,
      functionName: 'isLocked',
    }),
    readContract(config, {
      address: contractAddress,
      abi: Fractionalizer.abi,
      functionName: 'lockedTokenId',
    }),
  ]);

  return { isLocked, lockedTokenId };
}
