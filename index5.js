// Deployment of Smart Contract using web3.js
// first run 'index4.js' to get abi and bytecode
// In CodeEater Video, there is error in code since updates in library 
// My code is updated one

const {Web3} = require('web3')
const ganacheRPClink = `HTTP://127.0.0.1:7545`;
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheRPClink));

const ABI = require('./abi_simpleSol');
const bytecode = require('./bytecode_simpleSol');

const contract = new web3.eth.Contract(ABI);

const deployedContract = contract.deploy( {data: bytecode} );

deployedContract.send({
    from: "0x123AA982788dF9Cf82b354fF4157C3B0135AaAa9",
    gas: 6721975
}).on('receipt', receipt=>{
    console.log("Contract Address: ", receipt.contractAddress);
}).then(async (contract) => {
    const data = await contract._methods.getData().call();
    console.log("Original data : ", data);

    const transactionDetails = await contract._methods.setData(1).send({from: "0x123AA982788dF9Cf82b354fF4157C3B0135AaAa9"});
    console.log("Transaction details of setting :", transactionDetails);

    const data2 = await contract._methods.getData().call();
    console.log("Updated data : ", data2);
});
