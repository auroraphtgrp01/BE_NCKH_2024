// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChain {
	mapping(string => bytes) public contractInfomation;
	enum ShipmentStatus { PENDING, DELOYED, PROCESSING, CANCELED, COMPLETED, LATED, VIOLATED }

	struct Shipment {
		address petitioner;
		address supplier;
		uint deliveryDate;
		bool petitionerIsCompleted;
		bool supplierIsCompleted;
		bool isCanceledShipment;
		uint price;
		ShipmentStatus status;
	}

	constructor(string[] memory _keys, bytes[] memory _values) {
		for (uint56 i = 0; i < _keys.length; i++) {
				contractInfomation[_keys[i]] = _values[i];
		}
	}
}

// { 
// "_keys": ["name","age","gender"]
// ["0xc89efdaa54c0f20c7adf612882df0950f5a95877726e1f786df78519f0e40a0b","0x15","0x01"]
