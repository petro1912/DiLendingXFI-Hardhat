require('dotenv').config();
require("hardhat-contract-sizer");

module.exports = {
  solidity: "0.8.20",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200  // Lower value may help reduce bytecode size
    }
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    crossfi: {
        chainId: 4157,
        url: "https://rpc.testnet.ms", 
        accounts: [process.env.PRIVATE_KEY], 
    },
  },
};
