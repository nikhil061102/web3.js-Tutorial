// Deployment of Smart Contract using web3.js and Infura

const { Web3 } = require("web3");
require("dotenv").config();

const ABI = require('./abi_simpleSol');
const bytecode = require('./bytecode_simpleSol');

async function main() {
    const network = process.env.ETHEREUM_NETWORK;
    const providerid = `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`;
    const provider = new Web3.providers.HttpProvider(providerid);
    const web3 = new Web3(provider);
  
    // Creating a signing account from a private key
    // private key is found from metamask
    const signer = web3.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(signer);

    // To estimate amt of gas to be used for tx
    const limit = await web3.eth.estimateGas({
        from: signer.address,
        to: "0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93",
        value: web3.utils.toWei("0.0001", "ether"),
    });

    // Creating the transaction object
    const signedTx = await web3.eth.accounts.signTransaction({
        from: signer.address,
        to: "0xB0214ff7863eD767556Ec7fe29fEEa64B4ED0e93",
        value: web3.utils.toWei("0.000", "ether"),
        gas: limit,
        nonce: await web3.eth.getTransactionCount(signer.address),
        maxPriorityFeePerGas: web3.utils.toWei("3", "gwei"),
        maxFeePerGas: web3.utils.toWei("3", "gwei"),
        chainId: 11155111,
        type: 0x2,
    }, signer.privateKey);
    console.log("Raw transaction data: ", signedTx.rawTransaction);
    // Sending the transaction to the network
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
        console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
    console.log(`Mined in block ${receipt.blockNumber}`);


    const contract = new web3.eth.Contract(ABI);
    const deployedContract = contract.deploy( {data: bytecode, arguments: []} )
    
    const finalContract = deployedContract.send({
        from: signer.address,
        gas: 6721975
    }).on('receipt', receipt=>{
        console.log("Contract Address: ", receipt.contractAddress);
    }).then(async (contract) => {
        const data = await contract._methods.getData().call();
        console.log("Original data : ", data);

        const transactionDetails = await contract._methods.setData(1).send({from: signer.address});
        console.log("Transaction details of setting :", transactionDetails);

        const data2 = await contract._methods.getData().call();
        console.log("Updated data : ", data2);
    });
};

main();