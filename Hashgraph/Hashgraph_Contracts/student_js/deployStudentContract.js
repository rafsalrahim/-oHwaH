
const {
    Client, FileCreateTransaction, ContractCreateTransaction, Hbar, Ed25519PrivateKey,
    ContractFunctionParams, ContractCallQuery, ContractExecuteTransaction, ContractRecordsQuery, ContractInfoQuery
} = require("@hashgraph/sdk");
require("dotenv").config();
var express = require("express");
var app = express();app.listen(3000, () => {
 console.log("Server running on port 3000");
});
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    var newContractId;

// main();

async function deployContract(){
    // First we must upload a file containing the byte code
    const byteCodeFileId = (await (await new FileCreateTransaction()
        .setMaxTransactionFee(new Hbar(4))
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

        newContractId = record.receipt.getContractId();

    console.log("contract create gas used:", record.getContractCreateResult().gasUsed);
    console.log("contract create transaction fee:", record.transactionFee.asTinybar());
    console.log("contract:", newContractId.toString());
}

app.get("/deployContract",async (req, res, next) => {
    await deployContract();
    res.send("Completed");
    });

    async function addRecord(data) {

    //add record
    console.log(data.id+data.name)
        const getRecord = await (await new ContractExecuteTransaction()
            .setContractId(newContractId)
            .setGas(29000) // ~6016
            .setFunction("addRecord", new ContractFunctionParams()
                .addUint32(data.id)  
                .addString(data.name)
                .addString(data.mark)
                .addString(data.time)
            )
            .execute(hederaClient))
            // [getReceipt] or [getRecord] waits for consensus before continuing
            //      and will throw an exception
            //      on an error received during that process like INSUFFICENT_GAS
            .getRecord(hederaClient);
    
        console.log("execute gas used:", getRecord.getContractExecuteResult().gasUsed);
    
        // hederaClient.close();
    }

    app.post("/addRecord", async (req, res, next) => {
        const data=req.body;
        console.log(data);
        
        res.send(await addRecord(data));
        });

    async function history(){
        const record2 = await new ContractRecordsQuery()
        .setContractId(newContractId)
        .execute(hederaClient);
        return record2;
    }   

    app.get("/recordhistory", async (req, res, next) => {
        const result=await history();
        res.send(result);
    });

    app.get("/close", async (req, res, next) => {
        await hederaClient.close();
        res.send("completed");
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

    app.get("/updateRecord", async (req, res, next) => {
        await updateRecord();
        res.send("Completed");
    });

    async function  display(data){

        let callResult = await new ContractCallQuery()
        .setContractId(newContractId)
        .setGas(11000) // ~897
        .setFunction("display", new ContractFunctionParams()
        .addUint32(data.id))
        .execute(hederaClient);

    console.log("message first:", callResult.getUint32(0));
    console.log("message first:", callResult.getString(1));
    console.log("message first:", callResult.getString(2));

    return JSON.stringify({
        'id': callResult.getUint32(0),
        'naname': callResult.getString(1),
        'mark': callResult.getString(2),
        'UpdatedTime':callResult.getString(3)                          
    });

        
    }
    app.post("/display",async(req, res, next) => {
        const result= await display(req.body);
        res.send("Display result: "+result);
    });