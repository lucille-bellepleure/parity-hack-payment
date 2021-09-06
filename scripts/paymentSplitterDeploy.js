// scripts/create-box.js
const { ethers } = require("hardhat");

async function main() {
  const deployer = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());


  const PaymentSplitter = await ethers.getContractFactory("_PaymentSplitter");
  const paymentSplitter = await PaymentSplitter.deploy();
  await paymentSplitter.deployed();

  console.log("PaymentSplitter deployed to:", paymentSplitter.address);

  let payee0 = (await paymentSplitter.payee(0)).toString()
  let payee1 = (await paymentSplitter.payee(1)).toString()
  let payee2 = (await paymentSplitter.payee(2)).toString()

  console.log("Payee 0:", (payee0))
  console.log("Payee 1:", (payee1))
  console.log("Payee 2:", (payee2))

  console.log("Shares 0:", (await paymentSplitter.shares(payee0)).toString())
  console.log("Shares 1:", (await paymentSplitter.shares(payee1)).toString())
  console.log("Shares 2:", (await paymentSplitter.shares(payee2)).toString())
  console.log("TotalShares:", (await paymentSplitter.totalShares()).toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });