const Web3 = require('web3');
const protocol = "https";
const ip = "api.avax.network"

module.exports = {
  networks: {
    development: {
      provider: function () {
        return new Web3.providers.HttpProvider(`${protocol}://${ip}/ext/bc/C/rpc`)
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 470000000000
    }
  }
};

