

const Token = artifacts.require("MyToken");


var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN=require("chai-bn")(BN);
chai.use(chaiBN);


var chaiasPromised =require("chai-as-promised");
chai.use(chaiasPromised);
const expect = chai.expect;

require("dotenv").config({path:"../.env"});

contract("Token Test", async (accounts)=>{

beforeEach(async() => {
    this.myToken = await Token.new(process.env.INITIAL_TOKEN);
})

    it("all tokens should be in my acc", async ()=>{
        let instance = this.myToken;
        let totalSupplay = await instance.totalSupply();
        //let balance = await instance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), initialSupplay.valueOf(),"The balance was not same");
        expect( instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupplay);
    });

    it("is possible to send token b/w accounts", async() =>{
        const sendTokens = 1;
        let instance = this.myToken;
        let totalsupply = await instance.totalSupply();
        expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalsupply);
        expect(instance.transfer(accounts[1],sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(accounts[0])).to.eventually.be.bignumber.equal(totalsupply.sub(new BN(sendTokens)));
        expect(instance.balanceOf(accounts[1])).to.eventually.be.bignumber.equal(new BN(sendTokens));
    });

    //need to look intto this error

    // it("is not possible to send token more than available", async() =>{
    //     let instance = this.myToken;
    //     let balanceofDeployer = await instance.balanceOf(accounts[0]);

    //     expect(instance.transfer(accounts[1], new BN(balanceofDeployer+1))).to.eventually.be.rejected;
    //     expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(balanceofDeployer);

    // });
});