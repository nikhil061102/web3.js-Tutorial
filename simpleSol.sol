// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint data = 10;

    function setData(uint newValue) public {
        data = newValue;
    }

    function getData() public view returns (uint){
        return data;
    }
}
