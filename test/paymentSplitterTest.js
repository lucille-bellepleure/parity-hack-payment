const { expect } = require("chai");
const { ethers } = require("hardhat");

let provider;

let paymentSplitter;

let deployer;
let swarmcity;
let aeternity;
let edgeless;
let hacker;

let paymentSplitterBalance;
let swarmcityBalance;
let aeternityBalance;
let edgelessBalance;
let hackerBalance;

const swarmcityShare = 2879
const aeternityShare = 5371
const edgelessShare = 1751

describe("PaymentSplitter", function () {
    it("Deploy contract with payees and shares set", async function () {
        [deployer, swarmcity, aeternity, edgeless, hacker] = await ethers.getSigners();
        provider = ethers.getDefaultProvider()

        swarmcityBalance = await swarmcity.getBalance()
        aeternityBalance = await aeternity.getBalance()
        edgelessBalance = await edgeless.getBalance()
        hackerBalance = await hacker.getBalance()

        const payees = [swarmcity.address, aeternity.address, edgeless.address]
        const shares = [swarmcityShare, aeternityShare, edgelessShare]

        const PaymentSplitter = await ethers.getContractFactory("PaymentSplitter");
        paymentSplitter = await PaymentSplitter.deploy(payees, shares);

        await paymentSplitter.deployed();

        paymentSplitterBalance = await provider.getBalance(paymentSplitter.address)

        console.log((await provider.getBalance(paymentSplitter.address)).toString())
        console.log((await hacker.getBalance()).toString())

        expect(await paymentSplitter.payee(0)).to.equal(swarmcity.address);
        expect(await paymentSplitter.payee(1)).to.equal(aeternity.address);
        expect(await paymentSplitter.payee(2)).to.equal(edgeless.address);

        expect(await paymentSplitter.shares(swarmcity.address)).to.equal(swarmcityShare);
        expect(await paymentSplitter.shares(aeternity.address)).to.equal(aeternityShare);
        expect(await paymentSplitter.shares(edgeless.address)).to.equal(edgelessShare);

    });

    it("Send 500 eth from hacker account to payment splitter", async function () {
        await hacker.sendTransaction({
            from: hacker.address,
            to: paymentSplitter.address,
            value: ethers.utils.parseEther("1"),
        });

        console.log((await provider.getBalance(paymentSplitter.address)).toString())
        console.log((await hacker.getBalance()).toString())

        //console.log(paymentSplitterBalance)
        console.log((await provider.getBalance(paymentSplitter.address)).toString())

        //expect(paymentSplitterBalance).to.equal(paymentSplitterBalance.add(ethers.utils.parseEther("500")));
    });

    //   it("accounts ask for payout", async function(){
    //     const tx1 = await paymentSplitter.connect(swarmcity).release(swarmcity.address)
    //     const tx2 = await paymentSplitter.connect(aeternity).release(aeternity.address)
    //     const tx3 = await paymentSplitter.connect(edgeless).release(edgeless.address)
    //     paymentSplitterBalance = (await provider.getBalance(paymentSplitter.address)).toString()
    //     console.log(paymentSplitterBalance)
    //     expect((await swarmcity.getBalance()).toString()).to.equal(1000)
    //   });

});
