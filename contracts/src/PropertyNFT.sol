// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyNFT is ERC721, Ownable {
    uint256 public nextTokenId;

    struct PropertyMetadata {
        string name;
        string description;
        string image; // e.g. ipfs://CID/image.png
    }

    mapping(uint256 => PropertyMetadata) private _properties;

    constructor() ERC721("PropertyNFT", "PROP") Ownable(msg.sender) {}

    function mintProperty(
        address to,
        string memory uriName,
        string memory uriDescription,
        string memory uriImage
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);

        _properties[tokenId] = PropertyMetadata({
            name: uriName,
            description: uriDescription,
            image: uriImage
        });

        return tokenId;
    }

    /// @notice Returns on-chain metadata (not the JSON URI, just struct fields)
    function getProperty(uint256 tokenId) external view returns (PropertyMetadata memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721: invalid token ID");
        return _properties[tokenId];
    }
}
