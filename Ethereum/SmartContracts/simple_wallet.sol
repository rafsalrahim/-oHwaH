pragma solidity >=0.7.0 <0.9.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract Allowance is Ownable{

    event AllowanceChanged(address indexed _to, address indexed _from, uint _oldAmt, uint _newAmt);
mapping(address =>uint) public allowance;

    function addAllowance(address _who, uint _amount) public onlyOwner{
        emit AllowanceChanged(_who,msg.sender,allowance[_who],_amount);
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
    emit AllowanceChanged(_who,msg.sender,allowance[_who],allowance[_who] - _amount);
    allowance[_who] -= _amount;
    }

}



contract simple_wallet is Allowance {

    event MonrySend(address indexed _benificiary, uint _amount);
    event MoneyRecieved(address indexed _from, uint _amount);
    function withdrawMoney(address payable _to, uint _amount) public ownerorAllowed(_amount){
        require(_amount <= address(this).balance, "Not enough fund in Smart contract");
        if(!isOwner()){
        reduceAllowance( msg.sender,  _amount);
        }
        emit MonrySend(_to,_amount);
        _to.transfer(_amount);
    }

    fallback() external payable {
        emit MoneyRecieved(msg.sender,msg.value);
    }
}
