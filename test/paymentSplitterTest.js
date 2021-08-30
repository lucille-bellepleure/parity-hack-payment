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

let txCost

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

        expect(await paymentSplitter.payee(0)).to.equal(swarmcity.address);
        expect(await paymentSplitter.payee(1)).to.equal(aeternity.address);
        expect(await paymentSplitter.payee(2)).to.equal(edgeless.address);

        expect(await paymentSplitter.shares(swarmcity.address)).to.equal(swarmcityShare);
        expect(await paymentSplitter.shares(aeternity.address)).to.equal(aeternityShare);
        expect(await paymentSplitter.shares(edgeless.address)).to.equal(edgelessShare);
    });

    it("Hacker sends 500 eth to paymentSplitter", async function () {
        const tx = await hacker.sendTransaction({
            from: hacker.address,
            to: paymentSplitter.address,
            value: ethers.utils.parseEther("500"),
        });

        txCost = tx.gasLimit.mul(tx.gasPrice)

        expect(tx.to.exist)
    });

    it("Hacker balance is correct", async function () {
        // so the hacker just paid gas cost and 500 eth
        const txValue = txCost.add(ethers.utils.parseEther("500"))
        const hackerBalanceCheck = hackerBalance
        expect(hackerBalanceCheck.sub(txValue)).to.equal(await hacker.getBalance())
    });

    it("Swarm.city requests payout", async function () {
        const tx1 = await paymentSplitter.connect(swarmcity).release(swarmcity.address)
        expect(tx1.to.exist)
    });

    it("Swarm.city balance is correct", async function () {
        expect((await swarmcity.getBalance()).toString()).to.equal("10143935470423257334573")// 10143935470423257334573
    });

    it("Aeternity requests payout", async function () {
        const tx2 = await paymentSplitter.connect(aeternity).release(aeternity.address)
        expect(tx2.to.exist)
    });

    it("Aeternity balance is correct", async function () {
        expect((await aeternity.getBalance()).toString()).to.equal("10268523045737810969220")// 10143935470423257334573
    });

    it("Edgeless requests payout", async function () {
        const tx3 = await paymentSplitter.connect(edgeless).release(edgeless.address)
        expect(tx3.to.exist)
    });

    it("Edgeless balance is correct", async function () {
        expect((await edgeless.getBalance()).toString()).to.equal("10087541148629464728394")// 10143935470423257334573
    });

    // it("PaymentSplitter balance is correct", async function () {
    //     expect((await provider.getBalance(paymentSplitter.address)).toString()).to.equal("1022701630000000001")// 10143935470423257334573
    // });




});
