pragma solidity >=0.7.0 <0.9.0;

contract Item{
    uint public itemPriceWei;
    uint public pricePayed;
    uint public index;

    ItemTransfer parentContract;

    constructor(ItemTransfer _parentContract, uint _priceinWei, uint _index) public {
        itemPriceWei = _priceinWei;
        index = _index;
        parentContract = _parentContract;
    }
    receive() external payable{
        require(pricePayed == 0,"payed already");
        require(itemPriceWei == msg.value,"need to pay full amt, partial payment not recevable");
       pricePayed += msg.value;
       (bool success, )= address(parentContract).call{value:msg.value}(abi.encodeWithSignature("triggerPayment(uint256)",index));
        require(success, "Not successfull cancelling");
    }
    fallback() external {}
}

contract ItemTransfer{

    enum supplayChainState{Created, Payed, Delevered}

    struct s_Item{
        Item _item;
        string _itemname;
        uint _itemprice;
        ItemTransfer.supplayChainState _state;

    }

    mapping(uint => s_Item) public Items;
    uint itemIndex;

    event SupplayCHainStep(uint _itemprice,uint _step, address _item );

    function createItem(string memory _itemname, uint _itemprice ) public{
        Item item = new Item(this,_itemprice,itemIndex);
        Items[itemIndex]._item = item;
        Items[itemIndex]._itemname = _itemname;
        Items[itemIndex]._itemprice = _itemprice;
        Items[itemIndex]._state = supplayChainState.Created;
        emit SupplayCHainStep(_itemprice,uint(Items[itemIndex]._state), address(item));
        itemIndex++;

    }

    function triggerPayment(uint _itemIndex ) public payable{
        require(Items[_itemIndex]._itemprice == msg.value, "Only full payment accepted");
        require(Items[_itemIndex]._state == supplayChainState.Created,"Item is further in the chain ");

        Items[_itemIndex]._state = supplayChainState.Payed;
        emit SupplayCHainStep(_itemIndex,uint(Items[itemIndex]._state),address(Items[_itemIndex]._item));
    }
    function triggerTransfer(uint _itemIndex ) public{
    require(Items[_itemIndex]._state == supplayChainState.Payed,"Item is further in the chain ");
    Items[_itemIndex]._state = supplayChainState.Delevered;
     emit SupplayCHainStep(_itemIndex,uint(Items[itemIndex]._state),address(Items[_itemIndex]._item));
    }
}