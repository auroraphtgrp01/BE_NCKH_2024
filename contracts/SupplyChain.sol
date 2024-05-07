// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChain {
  struct Stage {
    uint percent;
    uint deliveryAt;
    string description;
    bool userConfirm;
    bool supplierConfirm;
    bool isDone;
  }

  enum Status {
    ENFORCE,
    CANCELLED,
    DONE
  }

  struct StageData {
    uint percent;
    uint deliveryAt;
    string description;
  }
  address private owner;
  address[] private users;
  mapping(address => uint) private assets;
  address private supplier;
  mapping(string => bytes) private contractInformation;
  string[] private contractInformationKeys;
  uint private totalBalance;
  Stage[] private stages;
  uint8 private currentStage = 0;
  Status private status;
  string private privateKey;

  event contractCreated(
    address owner,
    address[] user,
    address supplier,
    uint totalBalance,
    uint currentBalance,
    uint deployAt
  );
  event widthdrew(address to, uint amount, uint totalBalance, uint currentBalance, uint widthdrewAt);
  event received(address sender, uint amount, uint totalBalance, uint currentBalance, uint receivedAt);
  event confirmedStage(uint percent, bool userConfirm, bool supplierConfirm, bool isDone, uint confirmedAt);

  // Mỗi lần sẽ tự deploy 1 smart contract mới
  // Mỗi smart contract sẽ có 1 address user (người chi trả), supplier
  // Thông tin bao gồm thông tin contract (key, value: bytes)
  // Chức năng chính: Transfer ethers từ smart contract tới supplier
  // Withdraw ethers từ smart contract tới user hoặc supplier
  // Update Status SmartContract: cập nhật trạng thái của smart contract
  // Get contract Infomation
  constructor(
    address[] memory _user,
    address _supplier,
    string[] memory _keys,
    bytes[] memory _values,
    uint _total,
    StageData[] memory _stages,
    string memory _privateKey
  ) {
    privateKey = _privateKey;
    status = Status.ENFORCE;
    totalBalance = _total * 1 ether;
    supplier = _supplier;
    owner = msg.sender;
    for (uint8 i = 0; i < _user.length; i++) {
      users.push(_user[i]);
      assets[_user[i]] = 0;
    }
    for (uint8 i = 0; i < _keys.length; i++) {
      contractInformation[_keys[i]] = _values[i];
      contractInformationKeys.push(_keys[i]);
    }
    for (uint8 i = 0; i < _stages.length; i++) {
      stages.push(Stage(_stages[i].percent, _stages[i].deliveryAt, _stages[i].description, false, false, false));
    }

    emit contractCreated(owner, users, supplier, totalBalance, address(this).balance, block.timestamp);
  }

  modifier onlyPetitionerOrSupplier(address addressWallet) {
    bool handle = false;
    for (uint8 i = 0; i < users.length; i++) {
      if (addressWallet == users[i]) {
        handle = true;
        break;
      }
    }
    require(handle || addressWallet == supplier, 'Only participant or supplier can call this function');
    _;
  }

  modifier checkUserReceive(address addressWallet) {
    bool handle = false;
    for (uint8 i = 0; i < users.length; i++) {
      if (addressWallet == users[i]) {
        handle = true;
        break;
      }
    }
    require(handle || addressWallet == supplier, 'Only participant or supplier can receive');
    _;
  }

  modifier onlyPetitioner(address addressWallet) {
    bool handle = false;
    for (uint8 i = 0; i < users.length; i++) {
      if (addressWallet == users[i]) {
        handle = true;
        break;
      }
    }
    require(handle, 'Only participant without supplier can call this function');
    _;
  }

  modifier onlySupplier(address addressWallet) {
    require(addressWallet == supplier, 'Only supplier can call this function');
    _;
  }

  modifier notEnoughEthers(uint _amount) {
    require(address(this).balance >= _amount, 'Not enough ethers');
    _;
  }

  modifier checkPrivateKey(string memory _privateKey) {
    require(
      keccak256(abi.encodePacked((_privateKey))) == keccak256(abi.encodePacked((privateKey))),
      'Private key is not correct'
    );
    _;
  }

  function setPrivateKey(string memory _privateKey) public onlyPetitioner(msg.sender) {
    privateKey = _privateKey;
  }

  function setUsers(address[] memory _users) public onlyPetitioner(msg.sender) {
    for (uint8 i = 0; i < _users.length; i++) {
      users.push(_users[i]);
      assets[_users[i]] = 0;
    }
  }

  function setAddressSupplier(address _supplier) public onlySupplier(msg.sender) {
    supplier = _supplier;
  }

  function setTotal(uint _total) public onlyPetitionerOrSupplier(msg.sender) {
    totalBalance = _total;
  }

  //   address private owner;
  // address[] private users;
  // mapping(address => uint) private assets;
  // address private supplier;
  // mapping(string => bytes) private contractInformation;
  // string[] private contractInformationKeys;
  // uint private totalBalance;
  // Stage[] private stages;
  // uint8 private currentStage = 0;

  function setStages(StageData[] memory _stages) public onlyPetitioner(msg.sender) {
    for (uint8 i = 0; i < _stages.length; i++) {
      stages.push(Stage(_stages[i].percent, _stages[i].deliveryAt, _stages[i].description, false, false, false));
    }
  }

  function setInformation(string[] memory _keys, bytes[] memory _values) public onlyPetitionerOrSupplier(msg.sender) {
    for (uint8 i = 0; i < _keys.length; i++) {
      contractInformation[_keys[i]] = _values[i];
      contractInformationKeys.push(_keys[i]);
    }
  }

  function confirmStage() public onlyPetitionerOrSupplier(msg.sender) {
    if (msg.sender == supplier) stages[currentStage].supplierConfirm = true;
    else stages[currentStage].userConfirm = true;

    if (stages[currentStage].supplierConfirm && stages[currentStage].userConfirm) {
      this.withDrawByPercent(payable(supplier), stages[currentStage].percent);
      currentStage++;
      this.withDrawByPercent(payable(supplier), stages[currentStage].percent);
      stages[currentStage].isDone = true;
    }

    emit confirmedStage(
      stages[currentStage].percent,
      stages[currentStage].userConfirm,
      stages[currentStage].supplierConfirm,
      stages[currentStage].isDone,
      block.timestamp
    );
  }

  function withDrawByPercent(
    address payable _addressWallet,
    uint _percent
  )
    public
    payable
    onlyPetitioner(msg.sender)
    checkUserReceive(_addressWallet)
    notEnoughEthers((totalBalance * _percent) / 100)
  {
    uint _amount = (totalBalance * _percent) / 100;
    if (_addressWallet != supplier) {
      require(assets[_addressWallet] >= _amount, 'Not enough assets');
      assets[_addressWallet] -= _amount;
    }
    _addressWallet.transfer(_amount);
    emit widthdrew(_addressWallet, _amount, totalBalance, address(this).balance, block.timestamp);
  }

  function withDrawByCurrency(
    address payable _addressWallet,
    uint _amount
  ) public payable onlyPetitioner(msg.sender) checkUserReceive(_addressWallet) notEnoughEthers(_amount) {
    if (_addressWallet != supplier) {
      require(assets[_addressWallet] >= _amount, 'Not enough assets');
      assets[_addressWallet] -= _amount;
    }
    _addressWallet.transfer(_amount);
    emit widthdrew(_addressWallet, _amount, totalBalance, address(this).balance, block.timestamp);
  }

  function getContractInformation(
    string memory _privateKey
  ) public view checkPrivateKey(_privateKey) returns (string[] memory) {
    string[] memory values = new string[](contractInformationKeys.length);
    for (uint i = 0; i < contractInformationKeys.length; i++) {
      values[i] = string(contractInformation[contractInformationKeys[i]]);
    }
    return values;
  }

  function getOwnerAddressWallet() public view returns (address) {
    return owner;
  }

  function getUserAddressWallet() public view returns (address[] memory) {
    return users;
  }

  function getSupplierAddressWallet() public view returns (address) {
    return supplier;
  }

  function sendToSmartContract() public payable onlyPetitioner(msg.sender) {
    assets[msg.sender] += msg.value;
    emit received(msg.sender, msg.value, totalBalance, address(this).balance, block.timestamp);
  }

  function getBalance() public view returns (uint) {
    return address(this).balance;
  }

  function getAssets(address _addressWallet) public view onlyPetitioner(_addressWallet) returns (uint) {
    return assets[_addressWallet];
  }

  function getTotalBalance() public view returns (uint) {
    return totalBalance;
  }

  function getStages() public view returns (Stage[] memory) {
    return stages;
  }
  function getStagesLength() public view returns (uint) {
    return stages.length;
  }
}
