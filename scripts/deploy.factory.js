const dotenv = require('dotenv');
const { ContractFactory, Wallet, JsonRpcProvider, parseEther } = require('ethers');
const {linkLibraries} = require('./utils.js')

const PoolFactoryArtifact = require('../artifacts/contracts/LendingPoolFactory.sol/LendingPoolFactory.json');

dotenv.config();

// Setup provider and wallet (assume you have an RPC provider URL and a private key)
const provider = new JsonRpcProvider(process.env.RPC_URL); 
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

async function deployPoolFactory() {
    /**
     * Accounting Lib
     */
    const poolFactoryFactory = new ContractFactory(
        PoolFactoryArtifact.abi,
        linkLibraries(PoolFactoryArtifact.bytecode),
        wallet
    );

    var poolFactory = await poolFactoryFactory.deploy();
    await poolFactory.waitForDeployment();    

    console.log(`${PoolFactoryArtifact.sourceName}:${PoolFactoryArtifact.contractName}`, poolFactory.target)      
}


(async () => {
    await deployPoolFactory();
})();