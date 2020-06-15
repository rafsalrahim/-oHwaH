
const {
    Client, FileCreateTransaction, ContractCreateTransaction, Hbar, Ed25519PrivateKey,
    ContractFunctionParams, ContractCallQuery, ContractExecuteTransaction, ContractRecordsQuery, ContractInfoQuery
} = require("@hashgraph/sdk");
require("dotenv").config();

function createHederaClient() {
    if (process.env.OPERATOR_KEY == null || process.env.OPERATOR_ID == null) {
        throw new Error("environment variables OPERATOR_KEY and OPERATOR_ID must be present");
    }

    const operatorPrivateKey = Ed25519PrivateKey.fromString("302e020100300506032b65700422042071bd91d45e1c9bd0aafba44670daf250e525d6401c8c8c2aae777160b5353e44");
    const operatorAccount = "0.0.71285";

    return [
        operatorPrivateKey,
        new Client({
            network: { "0.testnet.hedera.com:50211": "0.0.3" },
            operator: {
                account: operatorAccount,
                privateKey: operatorPrivateKey
            }
        })
    ];
}

async function main() {
    const [ operatorPrivateKey, hederaClient ] = createHederaClient();
    const newContractId='0.0.71281';
    console.log(newContractId)

    const record2 = await new ContractRecordsQuery()
    .setContractId(newContractId)
    .execute(hederaClient);

    console.log(record2.length)
    // record2,array.forEach(element => {
    //     console.log(element.consensusTimestamp.asDate())

    // });
    for(const rec of record2){
        console.log(rec.consensusTimestamp.asDate().toDateString())
        console.log(msToTime(rec.consensusTimestamp.nanos))
    }
    //timestamp

    function msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);
    
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
console.log(record2)

    hederaClient.close();
}

main();