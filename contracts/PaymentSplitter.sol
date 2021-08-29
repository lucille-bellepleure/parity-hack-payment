//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract _PaymentSplitter is PaymentSplitter {
    constructor (address[] memory payees, uint[] memory shares_) PaymentSplitter(payees, shares_) {}
}