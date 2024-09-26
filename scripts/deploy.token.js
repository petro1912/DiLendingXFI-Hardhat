const dotenv = require('dotenv');
const { ContractFactory, Wallet, JsonRpcProvider, keccak256, toUtf8Bytes } = require('ethers');

const eMPXArtifact = require('../artifacts/contracts/mock/tokens/eMPX.sol/eMPX.json');
const EXEArtifact = require('../artifacts/contracts/mock/tokens/EXE.sol/EXE.json');
const lpMPXArtifact = require('../artifacts/contracts/mock/tokens/lpMPX.sol/lpMPX.json');
const lpUSDArtifact = require('../artifacts/contracts/mock/tokens/lpUSD.sol/lpUSD.json');
const lpXFIArtifact = require('../artifacts/contracts/mock/tokens/lpXFI.sol/lpXFI.json');
const USDCArtifact = require('../artifacts/contracts/mock/tokens/USDC.sol/USDC.json');
const USDTArtifact = require('../artifacts/contracts/mock/tokens/USDT.sol/USDT.json');
const WETHArtifact = require('../artifacts/contracts/mock/tokens/WETH.sol/WETH.json');
const WXFIArtifact = require('../artifacts/contracts/mock/tokens/WXFI.sol/WXFI.json');
const XFTArtifact = require('../artifacts/contracts/mock/tokens/XFT.sol/XFT.json');
const XUSDArtifact = require('../artifacts/contracts/mock/tokens/XUSD.sol/XUSD.json');


dotenv.config();

// Setup provider and wallet (assume you have an RPC provider URL and a private key)
const provider = new JsonRpcProvider(process.env.RPC_URL); 
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const deployer = wallet.address;

const tokens = [
    eMPXArtifact,
    EXEArtifact,
    lpMPXArtifact,
    lpUSDArtifact,
    lpXFIArtifact,
    USDCArtifact,
    USDTArtifact,
    WETHArtifact,
    WXFIArtifact,
    XFTArtifact,
    XUSDArtifact
]

async function deployTokens() {
    
    for (var tokenArtifact of tokens) {
        const tokenFactory = new ContractFactory(
            tokenArtifact.abi,
            tokenArtifact.bytecode,
            wallet
        );

        var tokenContract;
        if (tokenArtifact.contractName == "WXFI")
            tokenContract = await tokenFactory.deploy();
        else
            tokenContract = await tokenFactory.deploy(deployer);

        await tokenContract.waitForDeployment();
        
        console.log(tokenArtifact.contractName, tokenContract.target)
    }
}

(async () => {
    await deployTokens();
})();