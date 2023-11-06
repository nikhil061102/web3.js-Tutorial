// Deployment of Smart Contract using web3.js
// first run 'index4.js' to get abi and bytecode
// In CodeEater Video, there is error in code since updates in library 
// My code is updated one

const {Web3} = require('web3')
const ganacheRPClink = `HTTP://127.0.0.1:7545`;
const provider = new Web3.providers.HttpProvider(ganacheRPClink);
const web3 = new Web3(provider);

const ABI = require('./abi_simpleSol');
const bytecode = require('./bytecode_simpleSol');

web3.eth.getAccounts().then(accounts=>{
    const deployeracc = accounts[0];
    const contract = new web3.eth.Contract(ABI);
    const deployedContract = contract.deploy( {data: bytecode, arguments: []} );

    deployedContract.send({
        from: deployeracc,
        gas: 6721975
    }).on('receipt', receipt=>{
        console.log("Contract Address: ", receipt.contractAddress);
    }).then(async (contract) => {
        const data = await contract.methods.getData().call();
        console.log("Original data : ", data);

        const transactionDetails = await contract.methods.setData(1).send({from: deployeracc});
        console.log("Transaction details of setting :", transactionDetails);

        const data2 = await contract.methods.getData().call();
        console.log("Updated data : ", data2);
    });
});