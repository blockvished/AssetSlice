// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Fractionalizer is ERC20, Ownable {
    IERC721 public propertyNFT;
    uint256 public lockedTokenId;
    uint256 public totalShares;
    bool public isLocked;

    IERC20 public stablecoin; // e.g. USDC

    // Yield accounting
    uint256 public totalDeposited; // cumulative rent deposits
    mapping(address => uint256) public claimed; // amount each user has claimed


    constructor(
        address _nft,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) Ownable(msg.sender) {
        propertyNFT = IERC721(_nft);
    }

    function fractionalize(
        uint256 tokenId,
        uint256 shareCount
    ) external onlyOwner {
        require(!isLocked, "Already fractionalized");
        require(shareCount > 0, "Share count must be > 0");

        // Transfer the NFT into this contract
        propertyNFT.transferFrom(msg.sender, address(this), tokenId);

        lockedTokenId = tokenId;
        totalShares = shareCount;
        isLocked = true;

        // Mint shares to the owner
        _mint(msg.sender, shareCount * 10 ** decimals());
    }

    function unfractionalize(address to) external {
        require(isLocked, "No NFT locked");
        require(balanceOf(msg.sender) == totalSupply(), "Must own all shares");

        // Burn all shares
        _burn(msg.sender, totalSupply());

        // Unlock NFT
        propertyNFT.transferFrom(address(this), to, lockedTokenId);

        // Reset state
        isLocked = false;
        lockedTokenId = 0;
        totalShares = 0;
    }

    function depositYield(uint256 amount) external onlyOwner {
        require(isLocked, "No NFT locked");
        require(
            stablecoin.transferFrom(msg.sender, address(this), amount),
            "Deposit failed"
        );
        totalDeposited += amount;
    }

    /// @notice Claim pending yield for msg.sender
    function claimYield() external {
        uint256 entitled = (balanceOf(msg.sender) * totalDeposited) /
            totalSupply();
        uint256 alreadyClaimed = claimed[msg.sender];
        uint256 payout = entitled - alreadyClaimed;
        require(payout > 0, "Nothing to claim");

        claimed[msg.sender] = entitled;
        require(stablecoin.transfer(msg.sender, payout), "Transfer failed");
    }

    /// @notice View how much yield a user can claim
    function pendingYield(address user) external view returns (uint256) {
        uint256 entitled = (balanceOf(user) * totalDeposited) / totalSupply();
        return entitled - claimed[user];
    }
}
