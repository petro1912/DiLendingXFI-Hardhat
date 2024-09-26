// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XUSD is ERC20, Ownable {
    uint private _timeTrigger;
    uint private _maxAmountToMint = 500_000 * 10 ** 18; // 500_000$
    uint private constant _mintingUpdate = 1 days;
    uint private _totalMintedAmountPerTime; //total mint per 1 minting Update

    constructor(address owner_) ERC20("Mock CrossFi USD", "XUSDMock") Ownable(owner_) {}

    modifier isAvailableToMint(uint amountToMint) {
        uint currentTime = block.timestamp;
        // require(currentTime - _timeTrigger);
        // if (currentTime - _timeTrigger < _mintingUpdate) {
        //     require(
        //         amountToMint <= _maxAmountToMint - _totalMintedAmountPerTime,
        //         "XUSD: Minting Limit is exceeded"
        //     );
        // } else {
        //     _timeTrigger = currentTime;
        //     _totalMintedAmountPerTime = 0;
        //     require(
        //         amountToMint <= _maxAmountToMint,
        //         "XUSD: Minting Limit is exceeded"
        //     );
        // }
        _;
    }

    function mint(address to, uint256 amount) external onlyOwner isAvailableToMint(amount) {
        _totalMintedAmountPerTime += amount;
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }

    function setMaxAmountToMint(uint value) external onlyOwner{
        _maxAmountToMint = value;
    }

    function getMaxAmountToMint() external view returns(uint){
        return _maxAmountToMint;
    }
}