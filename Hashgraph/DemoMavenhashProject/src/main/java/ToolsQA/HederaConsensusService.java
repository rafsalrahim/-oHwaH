// Grab the OPERATOR_ID and OPERATOR_KEY from the .env file
private static final AccountId OPERATOR_ID = AccountId.fromString(Objects.requireNonNull(Dotenv.load().get("0.0.48556")));
private static final Ed25519PrivateKey OPERATOR_KEY = Ed25519PrivateKey.fromString(Objects.requireNonNull(Dotenv.load().get("302a300506032b65700321004fc2af7d0ce102fdb7ff708e539dd52ffb7eae4b88552720a7dc55da5f3a8bb6")));

// Build Hedera testnet client
Client client = Client.forTestnet();

// Set the operator account ID and operator private key
client.setOperator(OPERATOR_ID, OPERATOR_KEY);

private static final String MIRROR_NODE_ADDRESS = Objects.requireNonNull(Dotenv.load().get("hcs.testnet.mirrornode.hedera.com:5600"));

// Build the mirror node client
final MirrorClient mirrorClient = new MirrorClient(MIRROR_NODE_ADDRESS);

//Create a new topic
final TransactionId transactionId = new ConsensusTopicCreateTransaction()
   .execute(client);

//Grab the newly generated topic ID
final ConsensusTopicId topicId = transactionId.getReceipt(client).getConsensusTopicId();

System.out.println("Your topic ID is: " +topicId);

new MirrorConsensusTopicQuery()
    .setTopicId(topicId)
    .subscribe(mirrorClient, resp -> {
        String messageAsString = new String(resp.message, StandardCharsets.UTF_8);

        System.out.println(resp.consensusTimestamp + " received topic message: " + messageAsString);
    },
        // On gRPC error, print the stack trace
        Throwable::printStackTrace);

        //Submit a message to a topic
    new ConsensusMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage("hello, HCS! ")
        .execute(client)
        .getReceipt(client);   