// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {State, RateConfig, RateData, ReserveData} from "../LendingPoolState.sol";
import {FixedPointMathLib} from "solady/src/utils/FixedPointMathLib.sol";


library InterestRateModel {
    using FixedPointMathLib for uint256;
    
    uint256 constant YEAR = 365 * 86400;   
    uint256 public constant WAD = 1e18;

    function updateInterestRates(State storage state) external {
        
        RateData storage rateData = state.rateData;
        ReserveData storage reserveData = state.reserveData;

        uint256 utilizationRate = _calculateUtilizationRate(reserveData.totalBorrows, reserveData.totalDeposits);
        uint256 borrowRate = _calculateBorrowRate(state, utilizationRate);
        uint256 liquidityRate = borrowRate.mulWad(utilizationRate).mulWad(WAD - state.rateConfig.reserveFactor);
        
        rateData.utilizationRate = utilizationRate;
        rateData.borrowRate = borrowRate;
        rateData.liquidityRate = liquidityRate;

        // update Liquidity and Debt Index
        if (block.timestamp > rateData.lastUpdated) {
            uint256 elapsed = block.timestamp - rateData.lastUpdated;
            rateData.debtIndex = rateData.debtIndex.mulWad(WAD + borrowRate.mulDiv(elapsed, YEAR));
            rateData.liquidityIndex = rateData.liquidityIndex.mulWad(WAD + liquidityRate.mulDiv(elapsed, YEAR));      
            rateData.lastUpdated = block.timestamp;            
        }
    }

    function calcUpdatedInterestRates(State storage state) external view returns (uint256 debtIndex, uint256 creditIndex) {
        
        RateData storage rateData = state.rateData;
        ReserveData storage reserveData = state.reserveData;

        uint256 utilizationRate = _calculateUtilizationRate(reserveData.totalBorrows, reserveData.totalDeposits);
        uint256 borrowRate = _calculateBorrowRate(state, utilizationRate);
        
        uint256 liquidityRate = borrowRate.mulWad(utilizationRate).mulWad(WAD - state.rateConfig.reserveFactor);

        // update Liquidity and Debt Index
        if (block.timestamp > rateData.lastUpdated) {
            uint256 elapsed = block.timestamp - rateData.lastUpdated;
            debtIndex = rateData.debtIndex.mulWad(WAD + borrowRate.mulDiv(elapsed, YEAR));
            creditIndex = rateData.liquidityIndex.mulWad(WAD + liquidityRate.mulDiv(elapsed, YEAR));        
        }
    }
    
    function calcUpdatedRates(State storage state) external view returns (uint256 utilizationRate, uint256 liquidityRate, uint256 borrowRate) {
        ReserveData storage reserveData = state.reserveData;

        utilizationRate = _calculateUtilizationRate(reserveData.totalBorrows, reserveData.totalDeposits);
        borrowRate = _calculateBorrowRate(state, utilizationRate);
        
        liquidityRate = borrowRate.mulWad(utilizationRate).mulWad(WAD - state.rateConfig.reserveFactor);
    }    
    
    function _calculateUtilizationRate(uint256 borrows, uint256 deposits) internal pure returns(uint256) {
        if (borrows == 0)
            return 0;

        return borrows.divWad(deposits);
    }

    function _calculateBorrowRate(State storage state, uint256 utilizationRate) internal view returns(uint256 borrowRate) {
        
        uint256 baseRate = state.rateConfig.baseRate;
        uint256 rateSlope1 = state.rateConfig.rateSlope1;
        uint256 rateSlope2 = state.rateConfig.rateSlope2;
        uint256 optimalUtilizationRate = state.rateConfig.optimalUtilizationRate;

        if (utilizationRate < optimalUtilizationRate) {
            borrowRate = baseRate + (utilizationRate * rateSlope1) / optimalUtilizationRate;
        } else {
            borrowRate = baseRate + rateSlope1 + ((utilizationRate - optimalUtilizationRate) * rateSlope2) / (WAD - optimalUtilizationRate);
        }
    }

    function getCreditAmount(State storage state, uint256 amount) external view returns(uint256 credit) {
        credit = amount.divWad(state.rateData.liquidityIndex);
    }

    // amount of principal => debtToken Amount
    function getDebtAmount(State storage state, uint256 amount) external view returns(uint256 debt) {
        debt = amount.divWadUp(state.rateData.debtIndex);
    }

    function getCashAmount(State storage state, uint256 credit) external view returns(uint256 cash) {
        cash = credit.mulWadUp(state.rateData.liquidityIndex);
    }

    function getRepaidAmount(State storage state, uint256 debt) external view returns(uint256 amount) {
        amount = debt.mulWadUp(state.rateData.debtIndex);
    }

}