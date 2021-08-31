// scripts/create-box.js
const { ethers } = require("hardhat");

async function main() {
  const [deployer, account1, account2, account3] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const payees = [account1.address, account2.address, account3.address]
  const swarmcityShare = 2879
  const aeternityShare = 5371
  const edgelessShare = 1751
  const shares = [swarmcityShare, aeternityShare, edgelessShare]
  const PaymentSplitter = await ethers.getContractFactory("PaymentSplitter");
  const paymentSplitter = await PaymentSplitter.deploy(payees, shares);
  await paymentSplitter.deployed();
  console.log("PaymentSplitter deployed to:", paymentSplitter.address);
  console.log("Payee 0:", (await paymentSplitter.payee(0)).toString())
  console.log("Payee 1:", (await paymentSplitter.payee(1)).toString())
  console.log("Payee 2:", (await paymentSplitter.payee(2)).toString())
  console.log("Shares 0:", (await paymentSplitter.shares(account1.address)).toString())
  console.log("Shares 1:", (await paymentSplitter.shares(account2.address)).toString())
  console.log("Shares 2:", (await paymentSplitter.shares(account3.address)).toString())
  console.log("TotalShares:", (await paymentSplitter.totalShares()).toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });