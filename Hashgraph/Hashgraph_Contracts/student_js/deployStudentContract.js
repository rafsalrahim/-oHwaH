
const {
    Client, FileCreateTransaction, ContractCreateTransaction, Hbar, Ed25519PrivateKey,
    ContractFunctionParams, ContractCallQuery, ContractExecuteTransaction, ContractRecordsQuery, ContractInfoQuery
} = require("@hashgraph/sdk");
require("dotenv").config();
var express = require("express");
var app = express();app.listen(3000, () => {
 console.log("Server running on port 3000");
});

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

//async function main() {
    const [ operatorPrivateKey, hederaClient ] = createHederaClient();

    const smartContract = require("./studentContract.json");
    //const smartContractByteCode = smartContract.contracts[ "stateful.sol:StatefulContract" ].bin;
    const smartContractByteCode = smartContract.object;

    console.log("contract bytecode size:", smartContractByteCode.length, "bytes");
// }

// main();

async function deployContract(){
    // First we must upload a file containing the byte code
    const byteCodeFileId = (await (await new FileCreateTransaction()
        .setMaxTransactionFee(new Hbar(3))
        .addKey(operatorPrivateKey.publicKey)
        .setContents(smartContractByteCode)
        .execute(hederaClient))
        .getReceipt(hederaClient))
        .getFileId();

    console.log("contract bytecode file:", byteCodeFileId.toString());

    // Next we instantiate the contract instance
    const record = await (await new ContractCreateTransaction()
        .setMaxTransactionFee(new Hbar(100))
        // Failing to set this to an adequate amount
        // INSUFFICIENT_GAS
        .setGas(17000) // ~1260
        // Failing to set parameters when parameters are required
        // CONTRACT_REVERT_EXECUTED
        .setConstructorParams(new ContractFunctionParams()
            .addString("hello from hedera"))
        .setBytecodeFileId(byteCodeFileId)
        .execute(hederaClient))
        .getRecord(hederaClient);

    const newContractId = record.receipt.getContractId();

    console.log("contract create gas used:", record.getContractCreateResult().gasUsed);
    console.log("contract create transaction fee:", record.transactionFee.asTinybar());
    console.log("contract:", newContractId.toString());
}

app.get("/deployContract", (req, res, next) => {
    deployContract();
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
    });

    async function addRecord() {

    //add record
        const getRecord = await (await new ContractExecuteTransaction()
            .setContractId(newContractId)
            .setGas(29000) // ~6016
            .setFunction("addRecord", new ContractFunctionParams()
                .addUint32(1)  
                .addString("ab1")
                .addString("10")
                .addString("13/30/30")
           )
            .execute(hederaClient))
            // [getReceipt] or [getRecord] waits for consensus before continuing
            //      and will throw an exception
            //      on an error received during that process like INSUFFICENT_GAS
            .getRecord(hederaClient);
    
        console.log("execute gas used:", getRecord.getContractExecuteResult().gasUsed);
    
        // hederaClient.close();
    }

    app.get("/addRecord", (req, res, next) => {
        addRecord();
        res.json(["Tony","Lisa","Michael","Ginger","Food"]);
        });

    async function history(){
        const record2 = await new ContractRecordsQuery()
        .setContractId(newContractId)
        .execute(hederaClient);
        return record2;
    }   

    app.get("/recordhistory", (req, res, next) => {
        const result=addRecord();
        res.json(result[0]);
    });

    app.get("/close", (req, res, next) => {
        hederaClient.close();
        res.json(["true","result true"]);
    });

    async function updateRecord(){
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
    } 

    app.get("/updateRecord", (req, res, next) => {
        updateRecord();
        res.json(["true","result true"]);
    });

    async function  display(){
        let callResult = await new ContractCallQuery()
        .setContractId(newContractId)
        .setGas(11000) // ~897
        .setFunction("display", new ContractFunctionParams()
        .addUint32(1))
        .execute(hederaClient);

    console.log("message first:", callResult.getUint32(0));
    console.log("message first:", callResult.getString(1));
    console.log("message first:", callResult.getString(2));
        return {
            "id":callResult.getUint32(0),
            "name":callResult.getString(1),
            "mark":callResult.getString(2)
        }
    }
    app.get("/display", (req, res, next) => {
        const result=display();
        res.json(result);
    });