pragma solidity >=0.7.0 <0.9.0;
import "./Ownable.sol";
import "./Item.sol";

contract ItemTransfer is Ownable {
    enum supplayChainState {
        Created,
        Payed,
        Delevered
    }

    struct s_Item {
        Item _item;
        string _itemname;
        uint256 _itemprice;
        ItemTransfer.supplayChainState _state;
    }

    mapping(uint256 => s_Item) public Items;
    uint256 itemIndex;

    event SupplayCHainStep(uint256 _itemprice, uint256 _step, address _item);

    function createItem(string memory _itemname, uint256 _itemprice)
        public
        onlyOwner
    {
        Item item = new Item(this, _itemprice, itemIndex);
        Items[itemIndex]._item = item;
        Items[itemIndex]._itemname = _itemname;
        Items[itemIndex]._itemprice = _itemprice;
        Items[itemIndex]._state = supplayChainState.Created;
        emit SupplayCHainStep(
            _itemprice,
            uint256(Items[itemIndex]._state),
            address(item)
        );
        itemIndex++;
    }

    function triggerPayment(uint256 _itemIndex) public payable {
        require(
            Items[_itemIndex]._itemprice == msg.value,
            "Only full payment accepted"
        );
        require(
            Items[_itemIndex]._state == supplayChainState.Created,
            "Item is further in the chain "
        );

        Items[_itemIndex]._state = supplayChainState.Payed;
        emit SupplayCHainStep(
            _itemIndex,
            uint256(Items[itemIndex]._state),
            address(Items[_itemIndex]._item)
        );
    }

    function triggerTransfer(uint256 _itemIndex) public onlyOwner {
        require(
            Items[_itemIndex]._state == supplayChainState.Payed,
            "Item is further in the chain "
        );
        Items[_itemIndex]._state = supplayChainState.Delevered;
        emit SupplayCHainStep(
            _itemIndex,
            uint256(Items[itemIndex]._state),
            address(Items[_itemIndex]._item)
        );
    }
}
