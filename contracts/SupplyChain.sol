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
    bool isWithdraw;
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
  uint private totalBalance;
  Stage[] private stages;
  uint8 private currentStage;
  Status private status;
  string private privateKey;
  mapping(address => string) private signature;

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
  constructor(
    address[] memory _user,
    address _supplier,
    uint _total,
    StageData[] memory _stages,
    string memory _privateKey
  ) {
    currentStage = 0;
    privateKey = _privateKey;
    status = Status.ENFORCE;
    totalBalance = _total * 1 ether;
    supplier = _supplier;
    owner = msg.sender;
    for (uint8 i = 0; i < _user.length; i++) {
      users.push(_user[i]);
      assets[_user[i]] = 0;
    }
    for (uint8 i = 0; i < _stages.length; i++) {
      stages.push(Stage(_stages[i].percent, _stages[i].deliveryAt, _stages[i].description, false, false, false, false));
    }

    signature[_user[0]] = '';
    signature[_supplier] = '';

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

  function sign(
    string memory _signature,
    string memory _privateKey
  ) public checkPrivateKey(_privateKey) onlyPetitionerOrSupplier(msg.sender) {
    signature[msg.sender] = _signature;
  }

  function getSignature(address _addressWallet) public view returns (string memory) {
    return signature[_addressWallet];
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

  function setStages(StageData[] memory _stages) public onlyPetitioner(msg.sender) {
    for (uint8 i = 0; i < _stages.length; i++) {
      stages.push(Stage(_stages[i].percent, _stages[i].deliveryAt, _stages[i].description, false, false, false, false));
    }
  }

  function setStatus(Status _status) public onlyPetitioner(msg.sender) {
    status = _status;
  }

  function confirmStage(
    string memory _privateKey
  ) public checkPrivateKey(_privateKey) onlyPetitionerOrSupplier(msg.sender) {
    if (msg.sender == supplier) stages[currentStage].supplierConfirm = true;
    else stages[currentStage].userConfirm = true;

    if (stages[currentStage].supplierConfirm && stages[currentStage].userConfirm) {
      stages[currentStage].isDone = true;
      if (currentStage + 1 < stages.length) currentStage++;
    }
  }

  function withDrawByPercent(
    address payable _addressWallet,
    uint _percent,
    string memory _privateKey
  )
    public
    payable
    checkPrivateKey(_privateKey)
    checkUserReceive(_addressWallet)
    notEnoughEthers((totalBalance * _percent) / 100)
  {
    uint _amount = (totalBalance * _percent) / 100;
    if (_addressWallet != supplier) {
      require(assets[_addressWallet] >= _amount, 'Not enough assets');
      assets[_addressWallet] -= _amount;
    } else {
      _addressWallet.transfer(_amount);
      stages[currentStage].isWithdraw = true;
    }
    emit widthdrew(_addressWallet, _amount, totalBalance, address(this).balance, block.timestamp);
  }

  function withDrawByCurrency(
    address payable _addressWallet,
    uint _amount,
    string memory _privateKey
  )
    public
    payable
    checkPrivateKey(_privateKey)
    onlyPetitioner(msg.sender)
    checkUserReceive(_addressWallet)
    notEnoughEthers(_amount)
  {
    if (_addressWallet != supplier) {
      require(assets[_addressWallet] >= _amount, 'Not enough assets');
      assets[_addressWallet] -= _amount;
    }
    _addressWallet.transfer(_amount);
    stages[currentStage].isWithdraw = true;
    emit widthdrew(_addressWallet, _amount, totalBalance, address(this).balance, block.timestamp);
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

  function sendToSmartContract(
    string memory _privateKey
  ) public payable checkPrivateKey(_privateKey) onlyPetitioner(msg.sender) {
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

  function getCurrentStage() public view returns (Stage memory) {
    return stages[currentStage];
  }

  function getNonWithdrawalStage() public view returns (Stage memory) {
    for (uint i = 0; i < stages.length; i++) {
      if (stages[i].isWithdraw) {
        return stages[i];
      }
    }
    return Stage(0, 0, '', false, false, false, false);
  }
}
