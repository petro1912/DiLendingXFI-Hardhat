const dotenv = require('dotenv');
const { ContractFactory, Wallet, JsonRpcProvider, parseEther } = require('ethers');

const MockRewardModuleArtifact = require('../artifacts/contracts/mock/rewards/MockRewardModule.sol/MockRewardModule.json');

dotenv.config();

// Setup provider and wallet (assume you have an RPC provider URL and a private key)
const provider = new JsonRpcProvider(process.env.RPC_URL); 
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

const rewardModules = [
    {name: "eMPXRewards", address: "0x7f87b92ef6B39FCc8b10bcABf7BB2FFe2Ce8335a"},
    {name: "EXERewards", address: "0x14bdd849957fA1429a461E26cdD69060a06671FE"},
    {name: "lpMPXRewards", address: "0xA72f14eA10135De25C3cb065311C4A310d7cE2bc"},
    {name: "lpUSDRewards", address: "0xf17120751E59CCa0b56966f31c0C372d41456D3B"},
    {name: "lpXFIRewards", address: "0x97BE97F6D8A831a405cFeF95B0Cd2c5c9B6f1276"},
    {name: "USDCRewards", address: "0x14b3e5FE14154f16D706AE627e2abC2c5c1871fE"},
    {name: "USDTRewards", address: "0x9a6043fa2a5777BDB8DF6774e5436ECC80311b22"},
    {name: "WXFIRewards", address: "0x1C5c4F0e47E71c9A3FFB582D7dBfE074BBc5aaF5"},
    {name: "XFTRewards", address: "0xB03b0ab10C5e418b7be2910d7Ca24Afb16d22C39"},
    {name: "XUSDRewards", address: "0xbd99c574b3BE14A190DCCd1F992a4Df8c0C986F5"},
]

const weth = "0x43c846fb5C6a6239BcC8D28a84Bd92dc8cC98059"

async function deployRewardModules() {
    
    const APR = parseEther("0.03")
    for (var rewardModule of rewardModules) {
        const rewardsFactory = new ContractFactory(
            MockRewardModuleArtifact.abi,
            MockRewardModuleArtifact.bytecode,
            wallet
        );

        var rewardContract = await rewardsFactory.deploy(rewardModule.address, weth, APR);

        await rewardContract.waitForDeployment();
        
        console.log(rewardModule.name, rewardContract.target)
    }
}

(async () => {
    await deployRewardModules();
})();