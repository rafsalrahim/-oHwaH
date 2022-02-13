const {ethers} = require('hardhat');
const  cryptoNftJson = require("../artifacts/contracts/Cryptonft.sol/Cryptonft.json")

async function main(){

    const abi = cryptoNftJson.abi
    const provider = new ethers.providers.InfuraProvider('ropsten',process.env.R_ID)
    const wallet = new ethers.Wallet(process.env.PKEY,provider)
    const signer = wallet.connect(provider)

    const cryptoNft = new ethers.Contract(process.env.CONTRACTADD,abi,signer)
    const id = await cryptoNft.mintnft("https://ipfs.io/ipfs/QmPgqQtwCjLDQ4jaJtAydn4YU9afn3qsQZjyJDjwagakHU")
    console.log(`NFT Minted ${id.address}`)
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
