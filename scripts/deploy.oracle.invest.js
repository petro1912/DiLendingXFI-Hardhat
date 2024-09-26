const dotenv = require('dotenv');
const { ContractFactory, Wallet, JsonRpcProvider, parseEther } = require('ethers');

const DIAOracleArtifact = require('../artifacts/contracts/oracle/DIAOracleV2Multiupdate.sol/DIAOracleV2.json');
const InvestmentModuleArtifact = require('../artifacts/contracts/invest/InvestmentModule.sol/InvestmentModule.json');

dotenv.config();

// Setup provider and wallet (assume you have an RPC provider URL and a private key)
const provider = new JsonRpcProvider(process.env.RPC_URL); 
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const deployer = wallet.address;


async function deployOracleAndInvestment() {
    
    const oracleFactory = new ContractFactory(
        DIAOracleArtifact.abi,
        DIAOracleArtifact.bytecode,
        wallet
    );

    var oracleContract = await oracleFactory.deploy();
    await oracleContract.waitForDeployment();

    const investFactory = new ContractFactory(
        InvestmentModuleArtifact.abi,
        InvestmentModuleArtifact.bytecode,
        wallet
    );

    var investContract = await investFactory.deploy();
    await investContract.waitForDeployment();
    
    console.log(`${DIAOracleArtifact.sourceName}:${DIAOracleArtifact.contractName}`, oracleContract.target)
    console.log(`${InvestmentModuleArtifact.sourceName}:${InvestmentModuleArtifact.contractName}`, investContract.target)
    
}

(async () => {
    await deployOracleAndInvestment();
})();