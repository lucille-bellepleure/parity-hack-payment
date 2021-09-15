//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

contract _PaymentSplitter is PaymentSplitter {
    address[] payees = [
        0x3A753b048bec30Ada977E47ea78D17684C82295e, // Æternity's wallet
        0x50126e8Fcb9Be29f83c6bBd913CC85b40EAf86fC, // Swarm.city wallet
        0x0 // Edgeless wallet
    ];
    uint256[] shares_ = [537053, 287872, 175075];

    constructor() PaymentSplitter(payees, shares_) {}
}
