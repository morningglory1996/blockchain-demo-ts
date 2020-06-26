import sha256 from 'sha256';

interface Block {
    index: number;
    timeStamp: Date;
    transactions: Array<Transaction>;
    nonce: number;
    previousHash: string;
    blockHash: string;
}

interface Transaction {
    amount: number;
    sender: string;
    recipient: string;
}

export class Bitcoin {
    private blockChain: Array<Block>
    private _difficulty: number
    public transactionPool: Array<Transaction>


    constructor() {
        this.blockChain = [];
        this.transactionPool = [];
        this._difficulty = 5;
        this.createGenesisBlock();
    }


    createGenesisBlock(): void {
        const nonce = this.proofOfWork('', []);
        const blockHash = this.createHash(nonce, '', []);
        this.createNewBlock(nonce, '', blockHash);
    }


    createNewBlock(nonce: number, previousHash: string, blockHash: string): void {
        const newBlock:Block = {
            index: this.blockChain.length,
            timeStamp: new Date(),
            transactions: this.transactionPool,
            nonce,
            previousHash,
            blockHash
        }

        this.transactionPool = [];
        this.blockChain.push(newBlock);
    }

    createTx(amount: number, sender: string, recipient: string): void {
        const transaction: Transaction = {
            amount,
            sender,
            recipient
        }

        this.transactionPool.push(transaction);
    }

    createHash(nonce: number, previousHash: string, transactions: Array<Transaction>): string {
        const data = nonce.toString() + previousHash + JSON.stringify(transactions);
        const blockHash = sha256(data);
        return blockHash;
    }

    proofOfWork(previousHash: string, transactions: Array<Transaction>): number {
        let nonce = 0;
        let blockHash = this.createHash(nonce, previousHash, transactions);
        while(blockHash.substring(0, this._difficulty) !== '0'.repeat(this._difficulty)) {
            nonce += 1;
            blockHash = this.createHash(nonce, previousHash, transactions);
        }
        return nonce;
    }

    checkBlockChain(): boolean {
        for(let i = 1; i < this.blockChain.length; i++) {
            let previousBlockHash = this.blockChain[i - 1].blockHash;
            let currentBlockPreviousHash = this.blockChain[i].previousHash
            if(previousBlockHash != currentBlockPreviousHash) return false;
        }
        return true;
    }

    get lastblock(): Block {
        return this.blockChain[this.blockChain.length - 1]
    }

    set difficulty(n: number) {
        this._difficulty = n;
    }
}