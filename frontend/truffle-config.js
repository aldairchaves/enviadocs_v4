module.exports = {
  networks: {
    development: {
      host: "192.168.1.118",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    }
  },
  
  contracts_directory: './contracts',
contracts_build_directory: './src/abis',

  compilers: {
    solc: {
      version:"0.8.17",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};