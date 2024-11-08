// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/// @title IPriceFeed
/// @author Petro1912 
interface IPriceFeed {
    /// @notice Returns the price of the asset
    function getPrice() external view returns (uint256);
    /// @notice Returns the number of decimals of the price feed
    function decimals() external view returns (uint256);
}
