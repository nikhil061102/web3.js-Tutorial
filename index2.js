// Interacting with Smart Contract using Web3.js

const {Web3} = require('web3')
const ganacheRPClink = `HTTP://127.0.0.1:7545`;
const provider = new Web3.providers.HttpProvider(ganacheRPClink);
const web3 = new Web3(provider);

// Deploy contract in Ganache by using its URL in remix's deploy section

// Compile contract on remix ide and get ABI code 
const abi = require('./abi_simpleSol');

// get the contract's deployed address after deployment from remix 
const contractAdd = '0x910B407585a3867C0e9519577E13dB0e944d9cCd';

const contract = new web3.eth.Contract(abi,contractAdd);

contract.methods.getData().call()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
});

// 'from' is needed bcoz when is setData is called it 
// sets a state variable so needs to pay so gas amt
contract.methods.setData(20).send({from: "0xf73568b7126A0f1f03A3fbbd6A7fF9Db47872e1f"})
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
});
