// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChain {
  address payable owner;
  address payable supplier;
  mapping(string => string) private contractInfomation;
  enum ShipmentStatus {
    PENDING,
    DELOYED,
    PROCESSING,
    CANCELED,
    COMPLETED,
    LATED,
    VIOLATED
  }
  enum ProcessStatus {
    PENDING,
    COMPLETED,
    VIOLATED
  }

  struct Shipment {
    address petitioner;
    address supplier;
    uint deliveryDate;
    ProcessStatus petitionerIsCompleted;
    ProcessStatus supplierIsCompleted;
    bool isCanceledShipment;
    uint price;
    ShipmentStatus status;
  }

  mapping(address => Shipment) private shipments;
  uint private shipmentCount;

  constructor(address _supplier, string[] memory _keys, string[] memory _values) {
    owner = msg.sender;
    for (uint56 i = 0; i < _keys.length; i++) {
      contractInfomation[_keys[i]] = _values[i];
    }
    supplier = _supplier;
  }

  event shipmentCreated(address petitioner, address supplier, uint deliveryDate, uint amount);
  event widthdrew(address from, address to, uint amount, uint timestamp);

  modifier onlyPetitionerOrSupplier() {
    require(msg.sender == owner || msg.sender == supplier, 'Only petitioner or supplier can call this function');
    _;
  }
  modifier onlyPetitioner() {
    require(msg.sender == owner, 'Only petitioner can call this function');
    _;
  }
  modifier notEnoughEthers(uint _amount) {
    require(msg.value >= _amount, 'Not enough ethers');
    _;
  }

  function createShipment(address _supplier, uint _deliveryDate, uint _amount) public payable notEnoughEthers(_amount) {
    require(msg.value == _amount, 'The amount of ethers is not equal to the amount of the contract');
    require(_deliveryDate > block.timestamp, 'The contract has expired');
    Shipment memory shipment = Shipment(
      msg.sender,
      _supplier,
      _deliveryDate,
      ProcessStatus.PENDING,
      ProcessStatus.PENDING,
      false,
      _amount,
      ShipmentStatus.DELOYED
    );
    shipments[msg.sender] = shipment;
    shipmentCount++;

    emit shipmentCreated(owner, _supplier, _deliveryDate, _amount);
  }

  function startShipment(address _petitioner) public onlyPetitioner {
    Shipment storage shipment = shipments[_petitioner];
    require(shipment.status == ShipmentStatus.DELOYED, 'The shipment is not ready to start');
    require(block.timestamp < shipment.deliveryDate, 'The contract has expired');
    shipment.status = ShipmentStatus.PROCESSING;
  }

  // Neu muon huy hop dong thi goi ham nay
  function cancelShipment(address _petitioner) public onlyPetitioner {
    Shipment storage shipment = shipments[_petitioner];
    require(
      shipment.status == ShipmentStatus.DELOYED || shipment.status == ShipmentStatus.PROCESSING,
      'The shipment is not ready to cancel'
    );
    shipment.isCanceledShipment = true;
    shipment.status = ShipmentStatus.CANCELED;

    this.widthdraw(owner);
  }

  // Ham nay se thuc thi khi het thoio gian gia hang
  function completeShipment(
    address _petitioner,
    ProcessStatus _petitionerIsCompleted,
    ProcessStatus _supplierIsCompleted
  ) public payable onlyPetitionerOrSupplier {
    Shipment storage shipment = shipments[_petitioner];
    require(shipment.status == ShipmentStatus.PROCESSING, 'The shipment is not ready to complete');
    if (_petitionerIsCompleted == ProcessStatus.COMPLETED && _supplierIsCompleted == ProcessStatus.COMPLETED) {
      shipment.status = ShipmentStatus.COMPLETED;

      this.widthdraw(supplier);
    } else if (_petitionerIsCompleted == ProcessStatus.VIOLATED || _supplierIsCompleted == ProcessStatus.VIOLATED) {
      shipment.status = ShipmentStatus.VIOLATED;

      this.widthdraw(owner);
    } else {
      shipment.status = ShipmentStatus.LATED;

      this.widthdraw(owner);
    }
    shipment.supplierIsCompleted = _supplierIsCompleted;
    shipment.petitionerIsCompleted = _petitionerIsCompleted;
  }

  function widthdraw(address _to) external payable onlyPetitionerOrSupplier() {
    uint amount = shipments[owner].price;
    require(amount == address(this).balance, 'The amount of ethers is not equal to the balance');
    _to.transfer(amount);
    emit widthdrew(owner, _to, amount, block.timestamp);
  }

  function getShipment(address _petitioner) public view onlyPetitionerOrSupplier() returns (Shipment memory) {
    return shipments[_petitioner];
  }

  function getShipmentCount() public view onlyPetitionerOrSupplier() returns (uint) {
    return shipmentCount;
  }
}

// {
// "_keys": ["addressWalletSupplier","total","deliveryDate"]
// ["0xc89efdaa54c0f20c7adf612882df0950f5a95877726e1f786df78519f0e40a0b","1000000000000000000","0x01"]
