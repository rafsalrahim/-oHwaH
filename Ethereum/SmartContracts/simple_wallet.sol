pragma solidity >=0.7.0 <0.9.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract simple_wallet is Ownable {

mapping(address =>uint) public allowance;
    function addAllowance(address _who, uint _amount) public onlyOwner{
        allowance[_who]=_amount;
    }

    function isOwner() public view returns(bool) {
        return msg.sender == owner();
    }

    modifier ownerorAllowed(uint _amount) {
        require(isOwner()||allowance[msg.sender] >= _amount, "you are not allowed" );
        _;
    }
    function reduceAllowance(address _who, uint _amount) internal{
    allowance[_who] -= _amount;
    }
    function withdrawMoney(address payable _to, uint _amount) public ownerorAllowed(_amount){
        if(!isOwner()){
        reduceAllowance( msg.sender,  _amount);
        }
        _to.transfer(_amount);
    }

    fallback() external payable {

    }
}
