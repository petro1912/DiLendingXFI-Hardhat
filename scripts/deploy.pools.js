const dotenv = require('dotenv');
const { Contract, Wallet, JsonRpcProvider, parseUnits, parseEther } = require('ethers');

const PoolFactoryArtifact = require('../artifacts/contracts/LendingPoolFactory.sol/LendingPoolFactory.json');
const PoolArtifact = require('../artifacts/contracts/LendingPool.sol/LendingPool.json');

dotenv.config();

// Setup provider and wallet (assume you have an RPC provider URL and a private key)
const provider = new JsonRpcProvider(process.env.RPC_URL); 
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const deployer = wallet.address;

const poolFactoryAddress = "0x9B56b45e3C3ba5Aa5E1E0BD4aD4681FD1000B2CB";
const oracleAddress = "0xEc960258F3e38E1E89dD2c01BB8988D91866CbC9";
const investAddress = "0xC99d00f8eFE62ecC0B1A588420F82BBeBf0d4340";

const poolAddresses = [
    '0x758CCb4B3A69604070c5DA9f48952543f5d74C25',
    '0x80277A81226A6156Cec4ab17732286b0ac8422F7',
    '0xbAABD24bcb4f5cc2d246282B944191508D5AD0C6',
    '0xe165C040cfe60E646AD1E08306132d413cdCbcEc',
    '0x3696b993C85DB8feaCE97eE5534DA2161410fb13'
]

const poolTokens = [
    {principal: 'USDT', collaterals: ['xusd', 'empx', 'xft', 'lpusd']},
    {principal: 'USDC', collaterals: ['xusd', 'empx', 'xft', 'lpusd', 'lpxfi', 'lpmpx']},
    {principal: 'lpxfi', collaterals: ['xusd', 'empx', 'usdt', 'usdc']},
    {principal: 'lpusd', collaterals: ['xusd', 'empx', 'usdt', 'usdc']},
    {principal: 'lpmpx', collaterals: ['xusd', 'empx', 'usdt', 'usdc']},
]

const tokens = [
    { symbol: "eMPX", address: "0x7f87b92ef6B39FCc8b10bcABf7BB2FFe2Ce8335a"},
    { symbol: "EXE", address: "0x14bdd849957fA1429a461E26cdD69060a06671FE"},
    { symbol: "lpMPX", address: "0xA72f14eA10135De25C3cb065311C4A310d7cE2bc"},
    { symbol: "lpUSD", address: "0xf17120751E59CCa0b56966f31c0C372d41456D3B"},
    { symbol: "lpXFI", address: "0x97BE97F6D8A831a405cFeF95B0Cd2c5c9B6f1276"},
    { symbol: "USDC", address: "0x14b3e5FE14154f16D706AE627e2abC2c5c1871fE"},
    { symbol: "USDT", address: "0x9a6043fa2a5777BDB8DF6774e5436ECC80311b22"},
    { symbol: "WETH", address: "0x43c846fb5C6a6239BcC8D28a84Bd92dc8cC98059"},
    { symbol: "WXFI", address: "0x1C5c4F0e47E71c9A3FFB582D7dBfE074BBc5aaF5"},
    { symbol: "XFT", address: "0xB03b0ab10C5e418b7be2910d7Ca24Afb16d22C39"},
    { symbol: "XUSD", address: "0xbd99c574b3BE14A190DCCd1F992a4Df8c0C986F5"}
]

const rewardModules = [
    { name: "eMPXRewards", address: "0x64DA6e0a009443a27C79F751Fa1a4911b098b1F5"},
    { name: "EXERewards", address: "0xA97E71f6d4D02c7a76aE5E44F640aC79e0Df802F"},
    { name: "lpMPXRewards", address: "0xEc07A7c6a5695E1E194609AD0C4a3444Df2DF801"},
    { name: "lpUSDRewards", address: "0xF231D16499C49098146796248E4E3B89eBF4D99C"},
    { name: "lpXFIRewards", address: "0xC8bdac7A6806f0E8e84EB02B3167919bA2e5c749"},
    { name: "USDCRewards", address: "0xA8f75F9d48359fa6Ccccf04F01a66aC118C0D69c"},
    { name: "USDTRewards", address: "0xb6d7995a6Cd012D6265857d315FB37E66c53826e"},
    { name: "WXFIRewards", address: "0x17Dc3ac3809FB00bfbDd0b4D20F56089464989D7"},
    { name: "XFTRewards", address: "0x7CF0Fa0c7c30F4c2611E5242dC334b64906C97C6"},
    { name: "XUSDRewards", address: "0x0226e12e8888270dc801B67977f3C5F58a1D34B8"}
]

const oracleKeys = [
    "xusd/usd",
    "empx/usd",
    "wxfi/usd",
    "xft/usd",
    "weth/usd",
    "exe/usd",
    "usdt/usd",
    "usdc/usd",
    "lpmpx/usd",
    "lpusd/usd",
    "lpxfi/usd",
]

const tokenPrices = [
    0.83,
    0.02,
    0.63,
    0.35,
    2448,
    0.08,
    0.998,
    1.01,
    0.03,
    1.23,
    0.72,
]

const testUsers = [
    "0x8581B861F2E45f77eB605a0ED8D28c65d46db7D9",
    "0xACBEE5d7a78580223B76c22E9b33aE74e0D504a8"
]

const erc20ABI = [
    'function mint(address,uint256)',
    'function balanceOf(address owner) view returns (uint256)',
];

async function deployPools() {
    /**
     * USDT Pool Lib
     */
    const poolFactory = new Contract(
        poolFactoryAddress,
        PoolFactoryArtifact.abi,
        wallet
    );

    for (var i = 0; i < 5; i++) {
        const transactionResponse = await poolFactory.createLendingPool();
        console.log('Transaction hash:', transactionResponse.hash);

        const receipt = await transactionResponse.wait();
        console.log('Transaction confirmed:', receipt);  
    }
    await getPoolAddresses();    
}

async function getPoolAddresses() {
    /**
     * USDT Pool Lib
     */
    const poolFactory = new Contract(
        poolFactoryAddress,
        PoolFactoryArtifact.abi,
        wallet
    );

    try {
        // Assuming you know how many pools there are
        const numberOfPools = 5; // Replace with actual number or logic to determine it
        const pools = [];

        for (let i = 0; i < numberOfPools; i++) {
            const poolAddress = await poolFactory.poolAddresses(i);
            pools.push(poolAddress);
        }

        console.log("Pool Addresses:", pools);
        
    } catch (error) {
        console.error("Error fetching pool addresses:", error);
    }
    
}

function getCollaterals(symbols) {
    const collaterals = [];
    for (let symbol of symbols) {
        const t = tokens.find(token => token.symbol.toLowerCase() == symbol.toLowerCase())
        collaterals.push({tokenAddress: t.address, collateralKey: t.symbol.toLowerCase() + "/usd"})
    }
    
    return collaterals
}

function getPrincipal(symbol) {
    const t = tokens.find(token => token.symbol.toLowerCase() == symbol.toLowerCase())
    return {principalToken: t.address, principalKey: t.symbol.toLowerCase() + "/usd"}
}

function getTokenAddress(symbol) {
    const t = tokens.find(token => token.symbol.toLowerCase() == symbol.toLowerCase())
    return t.address
}

function getRewardModule(symbol) {
    const rM = rewardModules.find(module => module.name.toLowerCase().startsWith(symbol.toLowerCase()))
    return rM.address
}

function getInitParam(collaterals, principal) {
      
    const tokenConfig = {
        principalToken: principal.principalToken,
        principalKey: principal.principalKey,
        oracle: oracleAddress,
        collaterals: collaterals,
        investModule: investAddress
    };
      
    const feeConfig = {
        protocolFeeRate: parseUnits("0.05", 18), // 0.05e18
        protocolFeeRecipient: deployer
    };
      
    const riskConfig = {
        loanToValue: parseUnits("0.75", 18), // 75%
        liquidationThreshold: parseUnits("0.8", 18), // 80%
        minimumBorrowToken: parseUnits("0.1", 18), // 0.1
        borrowTokenCap: parseUnits("1", 27), // 1e27
        healthFactorForClose: parseUnits("0.95", 18), // 0.95
        liquidationBonus: parseUnits("0.02", 18) // 2%
    };
      
    const rateConfig = {
        baseRate: parseUnits("0.02", 18), // 2%
        rateSlope1: parseUnits("0.04", 18), // 4%
        rateSlope2: parseUnits("0.2", 18), // 20%
        optimalUtilizationRate: parseUnits("0.9", 18), // 90%
        reserveFactor: parseUnits("0.08", 18) // 8%
    };
      
    // Full initialize param
    const initParam = {
        tokenConfig: tokenConfig,
        feeConfig: feeConfig,
        riskConfig: riskConfig,
        rateConfig: rateConfig
    };

    return initParam
}


const mintToken = async (token_address, to, amount) => {
    try {
        const contract = new Contract(token_address, erc20ABI, wallet);
        const transactionResponse = await contract.mint(to, amount);
        await transactionResponse.wait();

        console.log('Transaction hash:', transactionResponse.hash);
    } catch (error) {
        console.log('Transaction Failed', token_address, error)
    }
  }
  
async function mintTokens(to, amount) {
    for (let idx in tokens) {
        if (tokens[idx].symbol == "WXFI")
            continue;

        const tokenAddress = tokens[idx].address;
        if (tokens[idx].symbol != "USDC")
            await mintToken(tokenAddress, to, parseEther(amount.toString()));
        else
            await mintToken(tokenAddress, to, parseUnits(amount.toString(), 6));
    }
}



async function initializePools() {
    // Create contract instance
    const poolContract = new Contract(poolAddresses[4], PoolArtifact.abi, wallet);

    // Call initialize function with initParam
    const collaterals = getCollaterals(poolTokens[4].collaterals); 
    const principal = getPrincipal(poolTokens[4].principal)

    const initParam = getInitParam(collaterals, principal);
    const tx = await poolContract.initialize(initParam);
    console.log('initParam', initParam);

    const receipt = await tx.wait();
    console.log("Transaction successful with receipt:", receipt);
}

async function setRewardModules() {
    for (var idx in poolAddresses) {
        const poolContract = new Contract(poolAddresses[idx], PoolArtifact.abi, wallet);
        const collaterals = poolTokens[idx].collaterals;

        for (var i = 0; i < collaterals.length; i++) {
            const tx = await poolContract.setTokenRewardModule(getTokenAddress(collaterals[i]), getRewardModule(collaterals[i]));    
            const receipt = await tx.wait();
            console.log('receipt'+ i);    
        }
    }        
}

async function setOraclePrice() {
    try {
        const contractABI = [`function setMultipleValues(string[],uint256[])`]
        const contract = new Contract(oracleAddress, contractABI, wallet);
        const currentTime = new Date().getTime() - 60;
        const prices = tokenPrices.map(_price => BigInt(parseInt(_price * 10 ** 8) * 2 ** 128 + currentTime))
    
        const transactionResponse = await contract.setMultipleValues(oracleKeys, prices);
        await transactionResponse.wait();
        console.log('Oracle Price Transaction confirmed', transactionResponse.hash);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

async function mintTestTokensToUsers() {
    await mintTokens(testUsers[0], 20000000)
    await mintTokens(testUsers[1], 20000000)
}

async function mintTokensToRewardModules() {
    const wethToken = tokens.find(token => token.symbol.toLowerCase() == 'weth').address
    for (var rewardModule of rewardModules) {
        await mintToken(wethToken, rewardModule.address, parseEther("5000000"));
    }
}


(async () => {
    // await deployPools();
    // await getPoolAddresses();
    // await initializePools()
    // await setRewardModules();
    // await setOraclePrice();
    // await mintTestTokensToUsers();
    await mintTokensToRewardModules()
})();