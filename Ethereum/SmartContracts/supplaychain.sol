pragma solidity >=0.7.0 <0.9.0;

contract ItemTransfer{

    enum supplayChainState{Created, Payed, Delevered}

    struct s_Item{
        string _itemname;
        uint _itemprice;
        ItemTransfer.supplayChainState _state;

    }

    mapping(uint => s_Item) public Items;
    uint itemIndex;

    event SupplayCHainStep(uint _itemprice,uint _step );

    function createItem(string memory _itemname, uint _itemprice ) public{
        Items[itemIndex]._itemname = _itemname;
        Items[itemIndex]._itemprice = _itemprice;
        Items[itemIndex]._state = supplayChainState.Created;
        emit SupplayCHainStep(_itemprice,uint(Items[itemIndex]._state));
        itemIndex++;

    }

    function triggerPayment(uint _itemIndex ) public payable{
        require(Items[itemIndex]._itemprice == msg.value, "Only full payment accepted");
        require(Items[itemIndex]._state == supplayChainState.Created,"Item is further in the chain ");

        Items[itemIndex]._state = supplayChainState.Payed;
        emit SupplayCHainStep(_itemIndex,uint(Items[itemIndex]._state));
    }
    function triggerTransfer(uint _itemIndex ) public{
    require(Items[itemIndex]._state == supplayChainState.Payed,"Item is further in the chain ");
    Items[itemIndex]._state = supplayChainState.Delevered;
     emit SupplayCHainStep(_itemIndex,uint(Items[itemIndex]._state));
    }
}