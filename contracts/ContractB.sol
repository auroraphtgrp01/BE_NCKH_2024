// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ContractB {
  string public nameA;
  string public nameB;
  string public nameC;
  string public nameD;

  constructor(string memory _nameA, string memory _nameB, string memory _nameC, string memory _nameD) {
    nameA = _nameA;
    nameB = _nameB;
    nameC = _nameC;
    nameD = _nameD;
  }

  function setNameA(string memory _nameA) public {
    nameA = _nameA;
  }

  function setNameB(string memory _nameB) public {
    nameB = _nameB;
  }

  function setNameC(string memory _nameC) public {
    nameC = _nameC;
  }
  function setNameD(string memory _nameD) public {
    nameD = _nameD;
  }
}
