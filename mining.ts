import { Bitcoin } from "./bitcoin";


export function mining(bitcoin: Bitcoin): void {
    const lastBlock = bitcoin.lastblock;
    const previousHash = lastBlock.blockHash;
    const transactions = bitcoin.transactionPool;
    const nonce = bitcoin.proofOfWork(previousHash, transactions);
    const blockHash = bitcoin.createHash(nonce, previousHash, transactions);
    bitcoin.createNewBlock(nonce, previousHash, blockHash);
}