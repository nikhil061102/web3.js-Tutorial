// Compilation of Smart Contract using web3.js 
// npm install solc

const {Web3} = require('web3');
const ganacheRPClink = `HTTP://127.0.0.1:7545`;
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheRPClink));

const fs = require("fs");
const solc = require("solc");

fileContent = fs.readFileSync('simpleSol.sol').toString();

const input = {
    language: "Solidity",
    sources: {
        'simpleSol.sol': {content: fileContent }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contract = output.contracts['simpleSol.sol']['SimpleContract'];

const bytecode = contract.evm.bytecode.object;
const abi = JSON.stringify(contract.abi,null, 4); // The second argument is for indentation.

fs.writeFileSync(`abi_simpleSol.js`,`const abi = ${abi}; \nmodule.exports = abi;`);
fs.writeFileSync(`bytecode_simpleSol.js`,`const bytecode = "${bytecode}"; \nmodule.exports = bytecode;`);