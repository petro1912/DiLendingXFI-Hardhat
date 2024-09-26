<div align="center">
    <a href="https://dilending.portfolio-as.com">
        <img alt="logo" src="https://github.com/petro1912/DILendingXFI-Frontend/blob/main/public/images/logo.png?raw=true" style="width: 160px;">
    </a>
    <h1 style="border-bottom: none">
        <b><a href="https://dilending.portfolio-as.com">DI Lending</a></b><br />
    </h1>
</div>

## DILending Protocol

**DI Lending** Protocol is the DeFI Lending protocol which puts the idle liquidity (principal) and collateral assets into other external staking/yield farming protocols to maximize capital utilization and revenue in the pool.

This repository is smart contract project that is responsible for backend part of DI Lending. 

Compile contracts
```
yarn hardhat compile
```


## Deploy Order

1. deploy mock tokens
```sh
node scripts/deploy.token.js
```
2. deploy mock reward modules
```sh
node scripts/deploy.rewards.js
```
3. deploy oracle and investment modules
```sh
node scripts/deploy.oracle.invest.js
```
4. deploy all libraries
```sh
node scripts/deploy.lib.js
```
5. deploy factory contract
```sh
node scripts/deploy.factory.js
```
(4. while deploying libraries, you need to update linkReferences right after running each function)


## XFI Scan (Explorer)
------------------------------------------------------
				Mock Tokens
------------------------------------------------------
| Token Name | Deployed Address |
|------------|------------------|
|eMPX | 0x7f87b92ef6B39FCc8b10bcABf7BB2FFe2Ce8335a |
|EXE | 0x14bdd849957fA1429a461E26cdD69060a06671FE |
|lpMPX | 0xA72f14eA10135De25C3cb065311C4A310d7cE2bc |
|lpUSD | 0xf17120751E59CCa0b56966f31c0C372d41456D3B |
|lpXFI | 0x97BE97F6D8A831a405cFeF95B0Cd2c5c9B6f1276 |
|USDC | 0x14b3e5FE14154f16D706AE627e2abC2c5c1871fE |
|USDT | 0x9a6043fa2a5777BDB8DF6774e5436ECC80311b22 |
|WETH | 0x43c846fb5C6a6239BcC8D28a84Bd92dc8cC98059 |
|WXFI | 0x1C5c4F0e47E71c9A3FFB582D7dBfE074BBc5aaF5 |
|XFT | 0xB03b0ab10C5e418b7be2910d7Ca24Afb16d22C39 |
|XUSD | 0xbd99c574b3BE14A190DCCd1F992a4Df8c0C986F5 |

------------------------------------------------------
				Mock Rewards
------------------------------------------------------
| Reward Module | Deployed Address |
|------------|------------------|
|eMPXRewards | 0x64DA6e0a009443a27C79F751Fa1a4911b098b1F5 |
|EXERewards | 0xA97E71f6d4D02c7a76aE5E44F640aC79e0Df802F |
|lpMPXRewards | 0xEc07A7c6a5695E1E194609AD0C4a3444Df2DF801 |
|lpUSDRewards | 0xF231D16499C49098146796248E4E3B89eBF4D99C |
|lpXFIRewards | 0xC8bdac7A6806f0E8e84EB02B3167919bA2e5c749 |
|USDCRewards | 0xA8f75F9d48359fa6Ccccf04F01a66aC118C0D69c |
|USDTRewards | 0xb6d7995a6Cd012D6265857d315FB37E66c53826e |
|WXFIRewards | 0x17Dc3ac3809FB00bfbDd0b4D20F56089464989D7 |
|XFTRewards | 0x7CF0Fa0c7c30F4c2611E5242dC334b64906C97C6 |
|XUSDRewards | 0x0226e12e8888270dc801B67977f3C5F58a1D34B8 |


------------------------------------------------------ 
                    Oracle & Investment
------------------------------------------------------

contracts/oracle/DIAOracleV2Multiupdate.sol:DIAOracleV2 0xEc960258F3e38E1E89dD2c01BB8988D91866CbC9
contracts/invest/InvestmentModule.sol:InvestmentModule 0xC99d00f8eFE62ecC0B1A588420F82BBeBf0d4340


------------------------------------------------------
				All Libraries
------------------------------------------------------
| Library Name | Deployed Address |
|------------|------------------|
| contracts/libraries/TransferLib.sol:TransferLib | 0x2f74146E3a055be8852B7E89f55c5Ec22d198856 |
| contracts/libraries/PriceLib.sol:PriceLib | 0x8f25AB10478af5110D8c14f449d1B8647B68c735 |
| contracts/libraries/InterestRateModel.sol:InterestRateModel | 0xaa2a5562AC3A0272726899141CEE15c01Dfc7902 |
| contracts/libraries/InvestmentLib.sol:InvestmentLib | 0x9419954a16749c25568DFaF54Ac887717fea0A3A |
| contracts/libraries/ValveLib.sol:ValveLib | 0xDFAa345dd1B354F1A0eBaaDbf939FAF38A04E050 |
| contracts/libraries/InitializeAction.sol:InitializeAction | 0x133c03f96ae8d3A5356280e4c42058Caf2A7abd0 |
| contracts/libraries/AccountingLib.sol:AccountingLib | 0xf9CB9C005a55D3D0ce6E77013f29E27C33F0f2c4 |
| contracts/libraries/InitializeConfig.sol:InitializeConfig | 0x0a78bE3aAd15F6618fc35C13591556A99E35aFF2 |
| contracts/libraries/PositionInfo.sol:PositionInfo | 0x163D2aeAa4529aF14e963F939651b4ee657bC3f2 |
| contracts/libraries/Repay.sol:Repay | 0xFF2B23a3C16036fdEBE50f7A38169fB6ba053733 |
| contracts/libraries/Borrow.sol:Borrow | 0x515c6ddc6B0Dc86Ca52002c3a6887ec8E69DB6D1 |
| contracts/libraries/Supply.sol:Supply | 0x9e15b43F6D9D600Cd7be0A35120bC0C3e6BE5d10 |
| contracts/libraries/Liquidation.sol:Liquidation | 0xC49d7E95caeAfBa1493A5bC6dAe056Fe7114eab5 |
| contracts/libraries/PoolStatistics.sol:PoolStatistics | 0x5D5f9E4be6be6d5899ba8994ECe031D41d8439A2 |


------------------------------------------------------
				Factory Contract
------------------------------------------------------
contracts/LendingPoolFactory.sol:LendingPoolFactory 0x9B56b45e3C3ba5Aa5E1E0BD4aD4681FD1000B2CB

------------------------------------------------------
				Pools Contract
------------------------------------------------------
| Pool Name  | Deployed Address |
|------------|------------------|
| USDT | 0x758CCb4B3A69604070c5DA9f48952543f5d74C25 |
| USDC | 0x80277A81226A6156Cec4ab17732286b0ac8422F7 |
| lpxfi | 0xbAABD24bcb4f5cc2d246282B944191508D5AD0C6 |
| lpusd | 0xe165C040cfe60E646AD1E08306132d413cdCbcEc |
| lpmpx | 0x3696b993C85DB8feaCE97eE5534DA2161410fb13 |