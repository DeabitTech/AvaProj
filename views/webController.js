var Web3 = require('web3'); //import web3
var web3 = new Web3(new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc')); //set provider

const MongoClient = require('../connector/mongodb');

//calculate burned fees
const feesCalculator = (_gasUsed) => {
    var gasPrice = 470; //gasPrice*10^(-9)
    var expConversion = 0.000000000001; //10^(-12) 
    let tempFees = (_gasUsed * gasPrice) * expConversion;
    let fees = tempFees.toFixed(9);
    return fees;
}

//get block data, process them and add to db (skip duplicates)
const getLatestBlock = async () => {
    let block = await web3.eth.getBlock("latest");
    let hash = block.hash;
    let gasUsed = web3.utils.hexToNumber(block.gasUsed);    //get gas used
    let blockNumber = block.number; //get block number
    let burnedAvax = feesCalculator(gasUsed);
    console.log("Block Number: " + block.number);
    console.log("Hash: " + hash);
    console.log("Burned fees: " + burnedAvax + " AVAX");     //take 9decimals
    console.log("");
    MongoClient.addBlockToDB(blockNumber, hash, burnedAvax);      //Add block data to mongodb
}

module.exports = {
    getLatestBlock
}