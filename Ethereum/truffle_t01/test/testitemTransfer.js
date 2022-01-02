const ItemTransfer = artifacts.require("./ItemTransfer.sol");

contract("ItemTransfer", accounts => {
    it("...should be able to add a function", async function(){
        const  ItemTransferInstance = await ItemTransfer.deployed();
        const ItemName= "test";
        const ItemPrice = 500;

       const result = await ItemTransferInstance.createItem(ItemName, ItemPrice,{from:accounts[0]});
       console.log(result);
    })
});