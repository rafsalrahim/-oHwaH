pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contract/security/ReentrancyGuard.sol";

contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemSold;

    address payable owner;
    uint256 listPrice = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint256 itemId;
        address nftContractor;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    mapping(uint256 => MarketItem) private idToMarketitem;
    event MarkwtItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool soled
    );

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function createMarketItem() public view returns (address nftContract,
    uint256 tokenId,
    uint256 price) public payable nonReentrant{ //non rentrent for preventing re entry
    require(price >= 0,"price must be > 0");
    require(msg.value == listPrice,"price  must be equal ti listing price");

    _itemIds.increment();
    uint256 itemId= _itemIds.current();

    idToMarketitem[itemId] =MarketItem(
        itemId,
        nftContract,
        tokenId,
        payable(msg.sender),
        payable(address(0)),
        price,
        false);

    IERC721(nftContract).transferFrom(msg.sender,address(this),tokenId);

    emit MarketItemCreated(itemId,nftContract,tokenId,msg.sender,address(0),price,false);


    }

    function createMarketSale(address nftContract, uint256 itemId) public payable nonReentrant{
        uint price = idToMarketitem[itemId].price;
        uint tokenId = idToMarketitem[itemId].tokenId;
        require(msg.value == price, "price submited is not correct");
        idToMarketitem[itemId].seller.transfer[msg.value] ;
        IERC721(nftContract).transfer(address(this),msg.sender,tokenId) ;
        idToMarketitem[itemId].owner =payable(msg.sender);
         idToMarketitem[itemId].sold = true ;
        _itemSold.increment();
        payable(owner).transfer(listingprice);

    }

}
