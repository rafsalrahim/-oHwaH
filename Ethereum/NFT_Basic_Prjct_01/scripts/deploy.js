const {ethers} = require('hardhat');

async function main(){
  const Cryptonft = await ethers.getContractFactory("Cryptonft")
  const cryptoNft = await Cryptonft.deploy('Cryptonft','CBEET')


    const tcryptoNft = await cryptoNft.deployed()
    console.log(`deployment successfull ${cryptoNft.address}`)
    console.log(`tcryptoNft  deployment successfull ${tcryptoNft.address}`)

    const newItemId = await cryptoNft.mintnft("https://ipfs.io/ipfs/QmScwBF51FvLVAMJ1Q8y82koVe5vkM5vnWxJ1kiHKD74wT")
    console.log(`minting was success ${newItemId}`)


  // const mintNFT = async () => {
  //   try{

  //   }catch(err){
  //     console.log(`Mint Error: ${err.message}`)
  //   }
  // }


}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
