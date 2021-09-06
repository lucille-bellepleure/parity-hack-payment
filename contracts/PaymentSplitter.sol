//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract _PaymentSplitter is PaymentSplitter {
    address[] payees = [
        0xe3b724C8b15BfE5A7d796F0A9C50617F5678CBDa,
        0x12B1b58d7f28f116D505ECC48C436D4381793bd5,
        0x73A89F5E8fe75c873e85664eb3C1Ba69082C0890
    ];
    uint256[] shares_ = [2879, 1751, 2879];

    constructor() PaymentSplitter(payees, shares_) {}
}
