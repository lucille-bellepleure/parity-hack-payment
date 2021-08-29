const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaymentSplitter", function () {
  it("Should deploy, set the payees and shares.", async function () {
    const [deployer, account1, account2, account3] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const payees = [account1.address, account2.address, account3.address]
    const shares = [12,24,64]
    const PaymentSplitter = await ethers.getContractFactory("PaymentSplitter");
    const paymentSplitter = await PaymentSplitter.deploy(payees, shares);
    await paymentSplitter.deployed();

    expect(await paymentSplitter.payee(0)).to.equal(account1.address);
    expect(await paymentSplitter.payee(1)).to.equal(account2.address);
    expect(await paymentSplitter.payee(2)).to.equal(account3.address);

  });
});
