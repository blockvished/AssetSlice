// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IFractionalShares is IERC20 {}

contract Marketplace is Ownable {
    IERC20 public usdc;
    IFractionalShares public shares;

    uint256 public pricePerShare = 1e6; // 1 USDC (assuming USDC = 6 decimals)

    constructor(address _usdc, address _shares, uint256 _pricePerShare) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
        shares = IFractionalShares(_shares);
        pricePerShare = _pricePerShare;
    }

    /// @notice User buys shares at fixed price
    function buyShares(uint256 amount) external {
        uint256 cost = amount * pricePerShare;
        require(usdc.transferFrom(msg.sender, address(this), cost), "USDC transfer failed");
        require(shares.transfer(msg.sender, amount), "Share transfer failed");
    }

    /// @notice User sells shares back to marketplace
    function sellShares(uint256 amount) external {
        require(shares.transferFrom(msg.sender, address(this), amount), "Share transfer failed");
        uint256 payout = amount * pricePerShare;
        require(usdc.transfer(msg.sender, payout), "USDC payout failed");
    }

    /// @notice Owner seeds marketplace with shares + USDC for liquidity
    function fundMarket(uint256 usdcAmount, uint256 shareAmount) external onlyOwner {
        require(usdc.transferFrom(msg.sender, address(this), usdcAmount), "Fund USDC failed");
        require(shares.transferFrom(msg.sender, address(this), shareAmount), "Fund Shares failed");
    }
}