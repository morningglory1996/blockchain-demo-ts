import { Bitcoin } from './bitcoin'
import { mining } from './mining'

const bitcoin = new Bitcoin();

bitcoin.createTx(1, 'ALICE', 'BOB');

mining(bitcoin);

bitcoin.createTx(2, 'JOHN', 'MIKE');

bitcoin.setDifficulty = 4;

mining(bitcoin);

bitcoin.createTx(3, 'MICHAEL', 'JOSH');

mining(bitcoin);

console.log(bitcoin);

console.log(bitcoin.checkBlockChain());
