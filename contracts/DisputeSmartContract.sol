// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DisputeSmartContract {
  address private supplier;
  address private user;
  uint private balance;

  constructor(address _supplier, address _user) {
    supplier = _supplier;
    user = _user;
  }

  modifier onlySenderAndReceiver(address _address) {
    require(_address == supplier || _address == user, 'You are not a participant');
    _;
  }

  fallback() external payable {}
  receive() external payable {}

  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  function withdraw(address addressWallet) public payable onlySenderAndReceiver(addressWallet) {
    payable(addressWallet).transfer(address(this).balance);
  }
}
