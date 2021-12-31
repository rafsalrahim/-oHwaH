pragma solidity >=0.7.0 <0.9.0;

import "./ItemTransfer.sol";

contract Item {
    uint256 public itemPriceWei;
    uint256 public pricePayed;
    uint256 public index;

    ItemTransfer parentContract;

    constructor(
        ItemTransfer _parentContract,
        uint256 _priceinWei,
        uint256 _index
    ) public {
        itemPriceWei = _priceinWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(pricePayed == 0, "payed already");
        require(
            itemPriceWei == msg.value,
            "need to pay full amt, partial payment not recevable"
        );
        pricePayed += msg.value;
        (bool success, ) = address(parentContract).call{value: msg.value}(
            abi.encodeWithSignature("triggerPayment(uint256)", index)
        );
        require(success, "Not successfull cancelling");
    }

    fallback() external {}
}
