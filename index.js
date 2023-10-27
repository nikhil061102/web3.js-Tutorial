// Interacting with Ganache using Web3.js

// 1. Make sure “node”, “npm” and “nvm” are there.
// 2. npm init -y
// 3. npm install --save web3

const {Web3} = require('web3')
const ganacheRPClink = `HTTP://127.0.0.1:7545`;
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheRPClink));
// NOTE : Remember that the Ganache GUI must be running

//to fetch all the account addresses -
web3.eth.getAccounts().then(console.log);
web3.eth.getAccounts().then(res=>{console.log(res[0])});

// To get the balance of an account - 
// web3.eth.getBalance("paste the address of the account inside it").then(console.log);
web3.eth.getBalance("0x123AA982788dF9Cf82b354fF4157C3B0135AaAa9").then(console.log);

// To convert wei into ether - 
// web3.eth.getBalance("paste the address of the account inside it").then(res=>{console.log(web3.utils.fromWei(res,"ether"));})  
web3.eth.getBalance("0x123AA982788dF9Cf82b354fF4157C3B0135AaAa9").then(res=>{console.log(web3.utils.fromWei(res,"ether"));})  

// To transfer ether from one account to another - 
// web3.eth.sendTransaction({
//     from:"paste the address of the account inside it",
//     to:"paste the address of the account inside it",
//     value:web3.utils.toWei("amt of ether","ether")
// });
web3.eth.sendTransaction({
    from:"0x123AA982788dF9Cf82b354fF4157C3B0135AaAa9",
    to:"0xfa229E467f9B1f44Fa2a0725BF39C5Cd2266CBFF",
    value:web3.utils.toWei("5","ether")
});