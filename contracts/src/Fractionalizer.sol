// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Fractionalizer is ERC20, Ownable {
    IERC721 public propertyNFT;
    uint256 public lockedTokenId;
    bool public isLocked;

    constructor(address _nft) ERC20("Property Shares", "PSHARE")  Ownable(msg.sender) {
        propertyNFT = IERC721(_nft);
    }

    function fractionalize(uint256 tokenId) external onlyOwner {
        require(!isLocked, "Already fractionalized");
        propertyNFT.transferFrom(msg.sender, address(this), tokenId);
        lockedTokenId = tokenId;
        isLocked = true;

        // Mint 1000 shares to owner
        _mint(msg.sender, 1000 * 1e18);
    }
}
