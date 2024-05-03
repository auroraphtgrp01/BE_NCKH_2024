// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChain {
  address public owner;
  address payable public user;
  address payable public supplier;
  mapping(string => bytes) public contractInformation;
  string[] public contractInformationKeys;

  // Mỗi lần sẽ tự deploy 1 smart contract mới
  // Mỗi smart contract sẽ có 1 address user (người chi trả), supplier
  // Thông tin bao gồm thông tin contract (key, value: bytes)
  // Chức năng chính: Transfer ethers từ smart contract tới supplier
  // Withdraw ethers từ smart contract tới user hoặc supplier
  // Update Status SmartContract: cập nhật trạng thái của smart contract
  // Get contract Infomation
  constructor(address _user, address _supplier, string[] memory _keys, bytes[] memory _values) {
    supplier = payable(_supplier);
    user = payable(_user);
    owner = msg.sender;
    for (uint i = 0; i < _keys.length; i++) {
      contractInformation[_keys[i]] = _values[i];
      contractInformationKeys.push(_keys[i]);
    }
  }

  event contractCreated(address user, address supplier, uint deployAt, uint amount);
  event widthdrew(address from, address to, uint amount, uint transferAt);

  modifier onlyPetitionerOrSupplier(address addressWallet) {
    require(addressWallet == user || addressWallet == supplier, 'Only petitioner or supplier can call this function');
    _;
  }

  modifier onlyPetitioner(address addressWallet) {
    require(addressWallet == user, 'Only petitioner can call this function');
    _;
  }

  modifier notEnoughEthers(uint _amount) {
    require(msg.value >= _amount, 'Not enough ethers');
    _;
  }

  function transferByPercent(
    address payable _addressWallet,
    uint _percent
  ) public payable onlyPetitioner(msg.sender) onlyPetitionerOrSupplier(_addressWallet) {
    _addressWallet.transfer((msg.value * _percent) / 100);
  }

  function transferByCurrency(
    address payable _addressWallet,
    uint _amount
  ) public payable onlyPetitioner(msg.sender) onlyPetitionerOrSupplier(_addressWallet) {
    _addressWallet.transfer(_amount);
  }

  // function widthdraw(address _to) public payable onlyPetitionerOrSupplier(_to) {
  //   uint amount = shipments[owner].price;
  //   require(amount == address(this).balance, 'The amount of ethers is not equal to the balance');
  //   _to.transfer(amount);
  //   emit widthdrew(owner, _to, amount, block.timestamp);
  // }

  function getBalance(address _addressWallet) public view onlyPetitionerOrSupplier(_addressWallet) returns (uint) {
    return _addressWallet.balance;
  }

  function getContractInformation() public view returns (bytes[] memory) {
    bytes[] memory values = new bytes[](contractInformationKeys.length);
    for (uint i = 0; i < contractInformationKeys.length; i++) {
      values[i] = contractInformation[contractInformationKeys[i]];
    }
    return values;
  }
}
