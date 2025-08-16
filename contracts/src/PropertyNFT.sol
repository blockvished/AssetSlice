// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyNFT is ERC721, Ownable {
    struct PropertyMetadata {
        string name;         // property name
        string type_of;      // type of property
        string description;  // property description
        string image;        // e.g. ipfs://CID/image.png
        bool isActive;       // track active status
    }

    PropertyMetadata private property;

    constructor(
        address to,
        string memory name_,
        string memory symbol_,
        string memory property_name_,
        string memory typeOf_,
        string memory description_,
        string memory image_
    )
        ERC721(name_, symbol_)
        Ownable(msg.sender)
    {
        uint256 tokenId = 1; // always the first (and only) token
        _mint(to, tokenId);

        property = PropertyMetadata({
            name: property_name_,
            type_of: typeOf_,
            description: description_,
            image: image_,
            isActive: true
        });
    }

    function getProperty() external view returns (PropertyMetadata memory) {
        return property;
    }

    /// @notice Metadata JSON for wallets
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "ERC721: invalid token ID");

        return string(
            abi.encodePacked(
                "data:application/json,{",
                '"name":"', property.name,
                '","description":"', property.description,
                '","image":"', property.image,
                '"}'
            )
        );
    }
}
