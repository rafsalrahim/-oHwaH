require("@nomiclabs/hardhat-waffle");
const prjctID ="786f8b535a6f4822a7e4f3c7962ba874"


module.exports = {
  networks:{
    hardhat:{
      chainId:1337
    },
    mumbai:{
      url:`https://polygon-mumbai.infura.io/v3/${prjctID}`,
      accounts: []
    },
    mainnet:{
      url: `https://polygon-mainnet.infura.io/v3/${prjctID}`,
      accounts: []
        }
  }
  solidity: "0.8.4",
};
