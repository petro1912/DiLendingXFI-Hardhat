const dotenv = require('dotenv');
const { ContractFactory, Wallet, JsonRpcProvider, keccak256, toUtf8Bytes } = require('ethers');
const InterestRateModelArtifact = require('../artifacts/contracts/libraries/InterestRateModel.sol/InterestRateModel.json');
const PriceLibArtifact = require('../artifacts/contracts/libraries/PriceLib.sol/PriceLib.json');
const AccountingLibArtifact = require('../artifacts/contracts/libraries/AccountingLib.sol/AccountingLib.json');
const BorrowArtifact = require('../artifacts/contracts/libraries/Borrow.sol/Borrow.json');
const SupplyArtifact = require('../artifacts/contracts/libraries/Supply.sol/Supply.json');
const LiquidationArtifact = require('../artifacts/contracts/libraries/Liquidation.sol/Liquidation.json');
const LendingPoolFactoryArtifact = require('../artifacts/contracts/LendingPoolFactory.sol/LendingPoolFactory.json');

dotenv.config();

// Setup provider and wallet (assume you have an RPC provider URL and a private key)
const provider = new JsonRpcProvider(process.env.RPC_URL); 
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

const libraries = [
    {
        path: "contracts/libraries/InterestRateModel.sol:InterestRateModel",
        address: "24495B6Ff3C6f6D284a419BcC0B8d1793dc0D400"
    },
    {
        path: "contracts/libraries/PriceLib.sol:PriceLib",
        address: "8D895500ff729658520E2b5A111017931F4Cc4F4"
    },    
    {
        path: "contracts/libraries/TransferLib.sol:TransferLib",
        address: "e41C5Ff7891D6e53c67a02cB64524B758d75ac09"
    },
    {
        path: "contracts/libraries/AccountingLib.sol:AccountingLib",
        address: "84309fA065aC82C1cBC00027b483182Fe52B168A"
    },
    {
        path: "contracts/libraries/Supply.sol:Supply",
        address: "D61a6867e65909e9f3F76dF29737BcEFdB480D96"
    },
    {
        path: "contracts/libraries/Liquidation.sol:Liquidation",
        address: "1F98216eCD5822D5CC325e7f0880d6DFDdFD877c"
    },
    {
        path: "contracts/libraries/Borrow.sol:Borrow",
        address: "6Fbf106F0e3E4bb60906519e03EF642a72815B23"
    }
];

function linkLibraries(linkedBytecode) {
    for (var library of libraries) {
        const hashedPath = keccak256(toUtf8Bytes(library.path)).slice(2, 36);
        linkedBytecode = linkedBytecode.replaceAll(`__$${hashedPath}$__`, library.address)
    }

    return linkedBytecode
}

async function deployLibrary() {
    // Deploy InterestRateModel
    const interestRateModelFactory = new ContractFactory(
        InterestRateModelArtifact.abi,
        InterestRateModelArtifact.bytecode,
        wallet
    );
    const interestRateModel = await interestRateModelFactory.deploy();
    await interestRateModel.waitForDeployment();
    console.log("InterestRateModel deployed at:", interestRateModel.target);

    // Deploy PriceLib
    const priceLibFactory = new ContractFactory(
        PriceLibArtifact.abi,
        PriceLibArtifact.bytecode,
        wallet
    );
    const priceLib = await priceLibFactory.deploy();
    await priceLib.waitForDeployment();
    console.log("PriceLib deployed at:", priceLib.target);

    return { interestRateModel, priceLib };
}

async function deployAccountingLib() {
    
    // Replace the library link references with the deployed addresses
    const linkedBytecode = linkLibraries(AccountingLibArtifact.bytecode)
    
    // Deploy the main contract
    const factory = new ContractFactory(
        AccountingLibArtifact.abi,
        linkedBytecode,
        wallet
    );
    const accountingLib = await factory.deploy();
    await accountingLib.waitForDeployment();
    console.log("AccountingLib deployed at:", accountingLib.target);
}


async function deployBorrow() {
    
    // Replace the library link references with the deployed addresses
    const linkedBytecode = linkLibraries(BorrowArtifact.bytecode)
    
    // Deploy the main contract
    const factory = new ContractFactory(
        BorrowArtifact.abi,
        linkedBytecode,
        wallet
    );
    const borrowLib = await factory.deploy({gasLimit: 2_000_000});
    await borrowLib.waitForDeployment();
    console.log("BorrowLib deployed at:", borrowLib.target);
}

async function deploySupply() {
    
    // Replace the library link references with the deployed addresses
    const linkedBytecode = linkLibraries(SupplyArtifact.bytecode)
    
    // Deploy the main contract
    const factory = new ContractFactory(
        SupplyArtifact.abi,
        linkedBytecode,
        wallet
    );
    const supplyLib = await factory.deploy();
    await supplyLib.waitForDeployment();
    console.log("SupplyLib deployed at:", supplyLib.target);
}

async function deployLiquidation() {
    
    // Replace the library link references with the deployed addresses
    const linkedBytecode = linkLibraries(LiquidationArtifact.bytecode)
    
    // Deploy the main contract
    const factory = new ContractFactory(
        LiquidationArtifact.abi,
        linkedBytecode,
        wallet
    );
    const liquidationLib = await factory.deploy();
    await liquidationLib.waitForDeployment();
    console.log("LiquidationLib deployed at:", liquidationLib.target);
}

async function deployPoolFactory() {
    
    // Replace the library link references with the deployed addresses
    const linkedBytecode = linkLibraries(LendingPoolFactoryArtifact.bytecode)
    
    // Deploy the main contract
    const factory = new ContractFactory(
        LendingPoolFactoryArtifact.abi,
        linkedBytecode,
        wallet
    );

    const lendingPoolFactory = await factory.deploy();
    await lendingPoolFactory.waitForDeployment();
    console.log("LiquidationLib deployed at:", lendingPoolFactory.target);
}

(async () => {
    // const libraries = await deployLibrary();
    // await deployAccountingLib();
    // await deployBorrow();
    // await deploySupply();
    // await deployLiquidation();
    await deployPoolFactory();
})();