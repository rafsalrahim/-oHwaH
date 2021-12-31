var SimpleStorage = artifacts.require("./ItemTransfer.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
