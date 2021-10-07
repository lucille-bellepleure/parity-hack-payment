require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const { MNEMONIC, PROD_MNEMONIC } = process.env;


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/27T3vhA0TO3m8d5BmuaQZZ4QylbTOnMu",
      accounts: {
        mnemonic: MNEMONIC
      }
    },
    mainnet: {
      url: "https://eth-mainnet.alchemyapi.io/v2/P-zhIazK1lPyMPSHkkbWgYjHwXtil5ft",
      accounts: {
        mnemonic: PROD_MNEMONIC
      }
    },
    ganache: {
      url: "HTTP://127.0.0.1:7545"
    },
  },
  solidity: "0.8.4",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
