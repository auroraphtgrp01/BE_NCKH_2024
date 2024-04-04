// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChain {
  address payable public owner;
  address payable public supplier;
  mapping(string => string) public contractInformation;
  string[] public contractInformationKeys;

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
    owner = payable(msg.sender);
    supplier = payable(_supplier);
    for (uint i = 0; i < _keys.length; i++) {
      contractInformation[_keys[i]] = _values[i];
      contractInformationKeys.push(_keys[i]);
    }
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

  function cancelShipment(address _petitioner) public onlyPetitioner {
    Shipment storage shipment = shipments[_petitioner];
    require(
      shipment.status == ShipmentStatus.DELOYED || shipment.status == ShipmentStatus.PROCESSING,
      'The shipment is not ready to cancel'
    );
    shipment.isCanceledShipment = true;
    shipment.status = ShipmentStatus.CANCELED;

    widthdraw(owner);
  }

  function completeShipment(
    address _petitioner,
    ProcessStatus _petitionerIsCompleted,
    ProcessStatus _supplierIsCompleted
  ) public payable onlyPetitionerOrSupplier {
    Shipment storage shipment = shipments[_petitioner];
    require(shipment.status == ShipmentStatus.PROCESSING, 'The shipment is not ready to complete');
    if (_petitionerIsCompleted == ProcessStatus.COMPLETED && _supplierIsCompleted == ProcessStatus.COMPLETED) {
      shipment.status = ShipmentStatus.COMPLETED;

      widthdraw(supplier);
    } else if (_petitionerIsCompleted == ProcessStatus.VIOLATED || _supplierIsCompleted == ProcessStatus.VIOLATED) {
      shipment.status = ShipmentStatus.VIOLATED;

      widthdraw(owner);
    } else {
      shipment.status = ShipmentStatus.LATED;

      widthdraw(owner);
    }
    shipment.supplierIsCompleted = _supplierIsCompleted;
    shipment.petitionerIsCompleted = _petitionerIsCompleted;
  }

  function widthdraw(address _to) public payable onlyPetitionerOrSupplier {
    uint amount = shipments[owner].price;
    require(amount == address(this).balance, 'The amount of ethers is not equal to the balance');
    payable(_to).transfer(amount);
    emit widthdrew(owner, _to, amount, block.timestamp);
  }

  function getShipment(address _petitioner) public view onlyPetitionerOrSupplier returns (Shipment memory) {
    return shipments[_petitioner];
  }

  function getShipmentCount() public view returns (uint) {
    return shipmentCount;
  }

  function getContractInformationArray() public view returns (string[] memory) {
    string[] memory informationArray = new string[](2 * contractInformationKeys.length);
    for (uint i = 0; i < contractInformationKeys.length; i++) {
      informationArray[2 * i] = contractInformationKeys[i];
      informationArray[2 * i + 1] = contractInformation[contractInformationKeys[i]];
    }

    return informationArray;
  }

  function getContractInformationLength() public view returns (uint) {
    return contractInformationKeys.length;
  }
}
