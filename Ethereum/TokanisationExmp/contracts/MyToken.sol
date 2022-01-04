pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Pokemon Americano", "PKMN") {
        _mint(msg.sender, initialSupply);
    }
}
