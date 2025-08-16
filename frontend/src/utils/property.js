import { writeContract, waitForTransactionReceipt, readContract } from '@wagmi/core';
import PropertyNFT from './abi/PropertyNFT.json'; // ABI + bytecode
import { config } from '../../wagmi';

/**
 * Deploy PropertyNFT contract
 * @param to            address that will receive the NFT
 * @param name          ERC721 collection name
 * @param symbol        ERC721 collection symbol
 * @param propertyName  property name
 * @param typeOf        property type
 * @param description   property description
 * @param image         property image URI (e.g. ipfs://CID)
 * @returns { hash, contractAddress }
 */
export async function deployPropertyNFT(
  to,
  name,
  symbol,
  propertyName,
  typeOf,
  description,
  image
) {
  const hash = await writeContract(config, {
    abi: PropertyNFT.abi,
    bytecode: PropertyNFT.bytecode,
    args: [to, name, symbol, propertyName, typeOf, description, image],
  });

  const receipt = await waitForTransactionReceipt(config, { hash });

  return {
    hash,
    contractAddress: receipt.contractAddress,
  };
}

/**
 * Get property metadata from contract
 */
export async function getProperty(contractAddress) {
  return await readContract(config, {
    address: contractAddress,
    abi: PropertyNFT.abi,
    functionName: 'getProperty',
  });
}

/**
 * Get tokenURI JSON for given tokenId
 */
export async function getTokenURI(contractAddress, tokenId) {
  return await readContract(config, {
    address: contractAddress,
    abi: PropertyNFT.abi,
    functionName: 'tokenURI',
    args: [tokenId],
  });
}
