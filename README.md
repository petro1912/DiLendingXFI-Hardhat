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