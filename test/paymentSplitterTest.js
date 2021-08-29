const { expect } = require("chai");
const { ethers } = require("hardhat");

let provider;
let paymentSplitter;
let deployer;
let account1;
let account2;
let account3;
let account4;

describe("PaymentSplitter", function () {
  it("Should deploy, set the payees and shares.", async function () {
    [deployer, account1, account2, account3, account4] = await ethers.getSigners();
    provider = ethers.getDefaultProvider()
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const payees = [account1.address, account2.address, account3.address]
    const shares = [12,24,64]
    const PaymentSplitter = await ethers.getContractFactory("PaymentSplitter");
    paymentSplitter = await PaymentSplitter.deploy(payees, shares);
    await paymentSplitter.deployed();

    expect(await paymentSplitter.payee(0)).to.equal(account1.address);
    expect(await paymentSplitter.payee(1)).to.equal(account2.address);
    expect(await paymentSplitter.payee(2)).to.equal(account3.address);

  });
  it("Should send eth from account4", async function () {
    await account4.sendTransaction({
        from: account4.address,
        to:paymentSplitter.address,
        value: ethers.utils.parseEther("1000"), // Sends exactly 1.0 ether
      });
      expect(await paymentSplitter.payee(0)).to.equal(account1.address);
    expect(await provider.getBalance(paymentSplitter.address)).to.equal(900);
  });
  it("accounts ask for payout", async function(){
    const tx1 = await paymentSplitter.connect(account1).release(account1.address)
    const tx2 = await paymentSplitter.connect(account2).release(account2.address)
    const tx3 = await paymentSplitter.connect(account3).release(account3.address)
  });
  
});
