const dotenv = require('dotenv');
const { ContractFactory, Wallet, JsonRpcProvider, parseEther } = require('ethers');
const {linkLibraries} = require('./utils.js')

const TransferLibArtifact = require('../artifacts/contracts/libraries/TransferLib.sol/TransferLib.json');
const PriceLibArtifact = require('../artifacts/contracts/libraries/PriceLib.sol/PriceLib.json');
const InterestRateModelArtifact = require('../artifacts/contracts/libraries/InterestRateModel.sol/InterestRateModel.json');
const InvestmentLibArtifact = require('../artifacts/contracts/libraries/InvestmentLib.sol/InvestmentLib.json');
const ValveLibArtifact = require('../artifacts/contracts/libraries/ValveLib.sol/ValveLib.json');
const InitializeActionArtifact = require('../artifacts/contracts/libraries/InitializeAction.sol/InitializeAction.json');

const AccountingLibArtifact = require('../artifacts/contracts/libraries/AccountingLib.sol/AccountingLib.json');
const InitializeConfigArtifact = require('../artifacts/contracts/libraries/InitializeConfig.sol/InitializeConfig.json');
const PositionInfoArtifact = require('../artifacts/contracts/libraries/PositionInfo.sol/PositionInfo.json');
const RepayArtifact = require('../artifacts/contracts/libraries/Repay.sol/Repay.json');

const BorrowLibArtifact = require('../artifacts/contracts/libraries/Borrow.sol/Borrow.json');
const SupplyLibArtifact = require('../artifacts/contracts/libraries/Supply.sol/Supply.json');
const LiquidationLibArtifact = require('../artifacts/contracts/libraries/Liquidation.sol/Liquidation.json');
const PoolStatisticsArtifact = require('../artifacts/contracts/libraries/PoolStatistics.sol/PoolStatistics.json');

dotenv.config();

// Setup provider and wallet (assume you have an RPC provider URL and a private key)
const provider = new JsonRpcProvider(process.env.RPC_URL); 
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);


async function deployIndependentLibs() {
    
    const transferLibFactory = new ContractFactory(
        TransferLibArtifact.abi,
        TransferLibArtifact.bytecode,
        wallet
    );

    var transferLib = await transferLibFactory.deploy();
    await transferLib.waitForDeployment();

    const priceLibFactory = new ContractFactory(
        PriceLibArtifact.abi,
        PriceLibArtifact.bytecode,
        wallet
    );

    var priceLib = await priceLibFactory.deploy();
    await priceLib.waitForDeployment();

    const interestRateModelFactory = new ContractFactory(
        InterestRateModelArtifact.abi,
        InterestRateModelArtifact.bytecode,
        wallet
    );

    var interestModel = await interestRateModelFactory.deploy();
    await interestModel.waitForDeployment();

    const investmentLibFactory = new ContractFactory(
        InvestmentLibArtifact.abi,
        InvestmentLibArtifact.bytecode,
        wallet
    );

    var investmentLib = await investmentLibFactory.deploy();
    await investmentLib.waitForDeployment();

    const valveLibFactory = new ContractFactory(
        ValveLibArtifact.abi,
        ValveLibArtifact.bytecode,
        wallet
    );

    var valveLib = await valveLibFactory.deploy();
    await valveLib.waitForDeployment();

    const initializeActionFactory = new ContractFactory(
        InitializeActionArtifact.abi,
        InitializeActionArtifact.bytecode,
        wallet
    );

    var initializeAction = await initializeActionFactory.deploy();
    await initializeAction.waitForDeployment();
    
    console.log(`${TransferLibArtifact.sourceName}:${TransferLibArtifact.contractName}`, transferLib.target)
    console.log(`${PriceLibArtifact.sourceName}:${PriceLibArtifact.contractName}`, priceLib.target)
    console.log(`${InterestRateModelArtifact.sourceName}:${InterestRateModelArtifact.contractName}`, interestModel.target)
    console.log(`${InvestmentLibArtifact.sourceName}:${InvestmentLibArtifact.contractName}`, investmentLib.target)
    console.log(`${ValveLibArtifact.sourceName}:${ValveLibArtifact.contractName}`, valveLib.target)
    console.log(`${InitializeActionArtifact.sourceName}:${InitializeActionArtifact.contractName}`, initializeAction.target)    
}

async function deploySecondLibs() {
    /**
     * Accounting Lib
     */
    const accountingLibFactory = new ContractFactory(
        AccountingLibArtifact.abi,
        linkLibraries(AccountingLibArtifact.bytecode),
        wallet
    );

    var accountingLib = await accountingLibFactory.deploy();
    await accountingLib.waitForDeployment();

    /**
     * InitializeConfig Lib
     */
    const initializeConfigFactory = new ContractFactory(
        InitializeConfigArtifact.abi,
        linkLibraries(InitializeConfigArtifact.bytecode),
        wallet
    );

    var initializeConfig = await initializeConfigFactory.deploy();
    await initializeConfig.waitForDeployment();

    /**
     * PositionInfo Lib
     */
    const positionInfoLibFactory = new ContractFactory(
        PositionInfoArtifact.abi,
        linkLibraries(PositionInfoArtifact.bytecode),
        wallet
    );

    var positionInfoLib = await positionInfoLibFactory.deploy();
    await positionInfoLib.waitForDeployment();

    /**
     * Repay Lib
     */
    const repayLibFactory = new ContractFactory(
        RepayArtifact.abi,
        linkLibraries(RepayArtifact.bytecode),
        wallet
    );

    var repayLib = await repayLibFactory.deploy();
    await repayLib.waitForDeployment();

    console.log(`${AccountingLibArtifact.sourceName}:${AccountingLibArtifact.contractName}`, accountingLib.target)
    console.log(`${InitializeConfigArtifact.sourceName}:${InitializeConfigArtifact.contractName}`, initializeConfig.target)
    console.log(`${PositionInfoArtifact.sourceName}:${PositionInfoArtifact.contractName}`, positionInfoLib.target)
    console.log(`${RepayArtifact.sourceName}:${RepayArtifact.contractName}`, repayLib.target)
    
} 

async function deployThirdLibs() {
    /**
     * Borrow Lib
     */
    const borrowLibFactory = new ContractFactory(
        BorrowLibArtifact.abi,
        linkLibraries(BorrowLibArtifact.bytecode),
        wallet
    );

    var borrowLib = await borrowLibFactory.deploy();
    await borrowLib.waitForDeployment();

    /**
     * Supply Lib
     */
    const supplyLibFactory = new ContractFactory(
        SupplyLibArtifact.abi,
        linkLibraries(SupplyLibArtifact.bytecode),
        wallet
    );

    var supplyLib = await supplyLibFactory.deploy();
    await supplyLib.waitForDeployment();

    /**
     * Liquidation Lib
     */
    const liquidationLibFactory = new ContractFactory(
        LiquidationLibArtifact.abi,
        linkLibraries(LiquidationLibArtifact.bytecode),
        wallet
    );

    var liquidationLib = await liquidationLibFactory.deploy();
    await liquidationLib.waitForDeployment();

    /**
     * Pool Statistics Lib
     */
    const poolStatisticsLibFactory = new ContractFactory(
        PoolStatisticsArtifact.abi,
        linkLibraries(PoolStatisticsArtifact.bytecode),
        wallet
    );

    var poolStatisticsLib = await poolStatisticsLibFactory.deploy();
    await poolStatisticsLib.waitForDeployment();

    console.log(`${BorrowLibArtifact.sourceName}:${BorrowLibArtifact.contractName}`, borrowLib.target)
    console.log(`${SupplyLibArtifact.sourceName}:${SupplyLibArtifact.contractName}`, supplyLib.target)
    console.log(`${LiquidationLibArtifact.sourceName}:${LiquidationLibArtifact.contractName}`, liquidationLib.target)
    console.log(`${PoolStatisticsArtifact.sourceName}:${PoolStatisticsArtifact.contractName}`, poolStatisticsLib.target)
    
} 

(async () => {
    // await deployIndependentLibs();
    // await deploySecondLibs();
    await deployThirdLibs();
})();