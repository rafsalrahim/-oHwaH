var myToken = artifacts.require("./MyToken.sol");
var myTokenSale = artifacts.require("./MyTokenSale.sol");
var myKycContract = artifacts.require("./KycContract.sol");
require("dotenv").config({path:"../.env"});
module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(myToken,process.env.INITIAL_TOKEN);
  await deployer.deploy(myKycContract);
  await  deployer.deploy(myTokenSale,1, addr[0],myToken.address,myKycContract.address);
  let instance = await myToken.deployed();
  await instance.transfer(myTokenSale.address,process.env.INITIAL_TOKEN);
};
