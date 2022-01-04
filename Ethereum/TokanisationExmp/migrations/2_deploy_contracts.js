var myToken = artifacts.require("./MyToken.sol");

module.exports = async function(deployer) {
  deployer.deploy(myToken,10000);
};
