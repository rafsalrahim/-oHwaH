
const {
    Client, FileCreateTransaction, ContractCreateTransaction, Hbar, Ed25519PrivateKey,
    ContractFunctionParams, ContractCallQuery, ContractExecuteTransaction, ContractRecordsQuery, ContractInfoQuery
} = require("@hashgraph/sdk");
require("dotenv").config();

function createHederaClient() {
    if (process.env.OPERATOR_KEY == null || process.env.OPERATOR_ID == null) {
        throw new Error("environment variables OPERATOR_KEY and OPERATOR_ID must be present");
    }

    const operatorPrivateKey = Ed25519PrivateKey.fromString(process.env.OPERATOR_KEY);
    const operatorAccount = process.env.OPERATOR_ID;

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

    const getRecord = await (await new ContractExecuteTransaction()
        .setContractId(newContractId)
        .setGas(17000) // ~6016
        .setFunction("updateStudent", new ContractFunctionParams()
            .addUint32(1)  
            .addString("20"))
        .execute(hederaClient))
        // [getReceipt] or [getRecord] waits for consensus before continuing
        //      and will throw an exception
        //      on an error received during that process like INSUFFICENT_GAS
        .getRecord(hederaClient);

    console.log("execute gas used:", getRecord.getContractExecuteResult().gasUsed);

    //     // Next let's ask for the current message (we set on creation)
        let callResult = await new ContractCallQuery()
        .setContractId(newContractId)
        .setGas(11000) // ~897
        .setFunction("display", new ContractFunctionParams()
        .addUint32(1))
        .execute(hederaClient);

    console.log("message first:", callResult.getUint32(0));
    console.log("message first:", callResult.getString(1));
    console.log("message first:", callResult.getString(2));



    hederaClient.close();
}

main();