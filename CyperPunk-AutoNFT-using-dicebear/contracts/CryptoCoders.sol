// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol"
contract CryptoCoders is ERC721, ERC721Enumerable{

    string[] public coders;

    mapping(string => bool) _coderExists;

    constructor() ERC721("CryptoCoders","CSS"){}

    function mint(string memory coder) public{
        require(_coderExists[coder] != true); // making sure coder does not exist already
        coders.push(coder);  //pushing new coder's name
        uint _id = coders.length - 1;
        _mint(msg.sender, _id);
        _coderExists[coder] = true; // making this so we can know who already exist

    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable){
            super._beforeTokenTransfer(from, to, tokenId);
    }
    // we made these functions because ERC721Enumerable was giving error 
    // becuase both external contracts has same name of function
    // which was making a override error
    function supportsInterface(bytes4 interfaceId) public view override(ERC721,ERC721Enumerable) returns(bool){
        return super.supportsInterface(interfaceId);
    }


}
