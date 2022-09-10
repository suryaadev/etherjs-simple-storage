const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  //   RPC --> http://127.0.0.1:7545
  /**
   * for deploying contract first thing we require is provider which is RPC of blockchain we can call it as IP of blockchain
   * Then we need wallet to sign contracts
   * then most imp two things abi and binaries
   * next provide all to ContractFactory
   * then await contractFactory.deloy
   *
   */

  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  //not doing this now adding encrypted key now
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf-8");

  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = await wallet.connect(provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const bin = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");

  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("deploying, please wait....");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  console.log(`contract address: ${contract.address}`);

  /* waiting code and code for getting recipet

// wait for block confirmation
const deploymentRecipt = await contract.deployTransaction.wait(1)

console.log("deployment contract : ")
console.log(contract.deployTransaction)
console.log("deployment reciept : ")
console.log(deploymentRecipt)

*/

  /**
   * sending tx with proper data
   * we have to look for nonce
   */
  /*
console.log("deployement through manual data : ")
const tx = {
  nonce : 3,
  gasPrice : 20000000000,
  gasLimit : 1000000,
  to : null,
  value : 0,
  data : '0x60806040526040518060400160405280606581526020016040518060400160405280600581526020017f526f686974000000000000000000000000000000000000000000000000000000815250815250600160008201518160000155602082015181600101908051906020019061007792919061008c565b50505034801561008657600080fd5b50610190565b8280546100989061012f565b90600052602060002090601f0160209004810192826100ba5760008555610101565b82601f106100d357805160ff1916838001178555610101565b82800160010185558215610101579182015b828111156101005782518255916020019190600101906100e5565b5b50905061010e9190610112565b5090565b5b8082111561012b576000816000905550600101610113565b5090565b6000600282049050600182168061014757607f821691505b6020821081141561015b5761015a610161565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6108748061019f6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80636057361d1161005b5780636057361d14610101578063bc832d4e1461011d578063c2a2747b14610139578063c7a0d9f6146101585761007d565b80631f1094e7146100825780632fae4ffd146100b35780632fda332e146100e3575b600080fd5b61009c60048036038101906100979190610514565b610176565b6040516100aa929190610648565b60405180910390f35b6100cd60048036038101906100c891906104cb565b610232565b6040516100da919061062d565b60405180910390f35b6100eb610260565b6040516100f8919061062d565b60405180910390f35b61011b60048036038101906101169190610514565b610269565b005b61013760048036038101906101329190610541565b610273565b005b610141610303565b60405161014f929190610648565b60405180910390f35b61016061039d565b60405161016d919061062d565b60405180910390f35b6003818154811061018657600080fd5b90600052602060002090600202016000915090508060000154908060010180546101af90610741565b80601f01602080910402602001604051908101604052809291908181526020018280546101db90610741565b80156102285780601f106101fd57610100808354040283529160200191610228565b820191906000526020600020905b81548152906001019060200180831161020b57829003601f168201915b5050505050905082565b6004818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b60008054905090565b8060008190555050565b600360405180604001604052808481526020018381525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906102d99291906103a3565b505050816004826040516102ed9190610616565b9081526020016040518091039020819055505050565b600180600001549080600101805461031a90610741565b80601f016020809104026020016040519081016040528092919081815260200182805461034690610741565b80156103935780601f1061036857610100808354040283529160200191610393565b820191906000526020600020905b81548152906001019060200180831161037657829003601f168201915b5050505050905082565b60005481565b8280546103af90610741565b90600052602060002090601f0160209004810192826103d15760008555610418565b82601f106103ea57805160ff1916838001178555610418565b82800160010185558215610418579182015b828111156104175782518255916020019190600101906103fc565b5b5090506104259190610429565b5090565b5b8082111561044257600081600090555060010161042a565b5090565b60006104596104548461069d565b610678565b90508281526020810184848401111561047557610474610807565b5b6104808482856106ff565b509392505050565b600082601f83011261049d5761049c610802565b5b81356104ad848260208601610446565b91505092915050565b6000813590506104c581610827565b92915050565b6000602082840312156104e1576104e0610811565b5b600082013567ffffffffffffffff8111156104ff576104fe61080c565b5b61050b84828501610488565b91505092915050565b60006020828403121561052a57610529610811565b5b6000610538848285016104b6565b91505092915050565b6000806040838503121561055857610557610811565b5b6000610566858286016104b6565b925050602083013567ffffffffffffffff8111156105875761058661080c565b5b61059385828601610488565b9150509250929050565b60006105a8826106ce565b6105b281856106d9565b93506105c281856020860161070e565b6105cb81610816565b840191505092915050565b60006105e1826106ce565b6105eb81856106ea565b93506105fb81856020860161070e565b80840191505092915050565b610610816106f5565b82525050565b600061062282846105d6565b915081905092915050565b60006020820190506106426000830184610607565b92915050565b600060408201905061065d6000830185610607565b818103602083015261066f818461059d565b90509392505050565b6000610682610693565b905061068e8282610773565b919050565b6000604051905090565b600067ffffffffffffffff8211156106b8576106b76107d3565b5b6106c182610816565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561072c578082015181840152602081019050610711565b8381111561073b576000848401525b50505050565b6000600282049050600182168061075957607f821691505b6020821081141561076d5761076c6107a4565b5b50919050565b61077c82610816565b810181811067ffffffffffffffff8211171561079b5761079a6107d3565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610830816106f5565b811461083b57600080fd5b5056fea2646970667358221220335b88565a6a5edc4d6b108ce83395cdbedf4a3b3f5b7878fdc9a0afba16df0a64736f6c63430008070033',
  chainId : 1337

}
 const signedTxResponse = await wallet.signTransaction(tx);
 console.log(signedTxResponse)
 const sendTxResponse = await wallet.sendTransaction(tx)
 */

  const currentFavNumber = await contract.restore();
  console.log(`current fav number : ${currentFavNumber.toString()}`);

  const addNumber = await contract.store("7878");
  const txReciept = await addNumber.wait(1);
  const updatedNum = await contract.restore();

  console.log(`Updated fav number : ${updatedNum.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
