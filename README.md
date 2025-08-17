# 🏠 AssetSlice – Fractional Ownership of Assets

## ❓ The Problem
- In many countries, **currency devaluation and inflation** eat away at savings.  
- Rental agreements are often **denominated in unstable local currencies**, exposing both landlords and tenants to volatility.  
- Traditional ownership of real estate, cars, or art is **illiquid, slow, and limited to a few**, making it inaccessible for everyday investors.  
- Rental yield and long-term appreciation are locked away, while investors seek **stable, transparent, and global alternatives**.  


---

## 💡 The Solution
**AssetSlice** makes it possible to:  
- Represent a property or high-value asset as an **NFT (digital proof of ownership)**.  
- **Fractionalize** it into **any number of ERC20 tokens (shares)** chosen by the asset owner.  
- Allow investors to **buy, sell, or hold shares** in a simple on-chain marketplace.  
- Distribute **rental yield in stablecoins** to protect against currency devaluation.  

👉 In short: **turn any expensive asset into affordable, tradeable, and stable yield-earning slices.**  

---

## ⚙️ Technical Architecture

1. **RWA NFT ERC721**  
   - Each property or asset is minted as a unique NFT.  
   - Metadata (name, description, image) is stored on IPFS.  

2. **Fractals of NFT (ERC20) and Yield**  
   - NFT locked inside the **Fractionalizer contract**.  
   - Asset owner chooses how many shares to mint (e.g., 500, 1,000, 10,000).  
   - ERC20 tokens are minted to represent **fractional ownership**
   - Asset owner deposits rental income (mock stablecoin).  
   - Shareholders claim their proportional share of yield.  
   
   **Formula:**  
```
entitled = (yourShares / totalShares) * totalDeposited
payout = entitled - alreadyClaimed
```

3. **Marketplace Layer (Demo)**  
- Users can buy/sell shares at a **fixed price** (1 USDC = 1 share).  
- Simple, intuitive mechanism for hackathon demonstration.  

---

## 📊 System Flow

```mermaid
flowchart TD
 A[🏠 Asset NFT] --> B[🔒 Fractionalizer Contract]
 B --> C[🪙 1000 ERC20 Shares]
 C --> D[👥 Users Buy & Sell Shares]
 B --> E[💰 Rental Income Deposited]
 E --> F[📤 Users Claim Proportional Yield]
