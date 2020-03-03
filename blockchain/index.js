/**
 * creating blockchain class with the help of block class 
 * first call genesis()
 * addblock - get previous block and send it for mineblock
 */

const Block = require('./block');

class Blockchain{

    constructor(){
        this.chain = [Block.genesis()];
    }


    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(block);

        return block;
    }

    // validating the chain, if any temper issue
    isValidChain(chain){

        if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())) return false;

            for(let i=1;i<chain.length;i++){
                const block = chain[i];
                const lastBlock = chain[i-1];

                if(block.lastHash !== lastBlock.hash ||
                    block.hash !== Block.blockHash(block)){
                        return false;
                    }

            }
        
        return true;
    }



    replaceChain(newChain){
        if (newChain.length <= this.chain.length) {
            console.log(" received chain is not longer than the curent data");
            return;
            
        } else if(!this.isValidChain(newChain)) {
           console.log("The received chain is not valid"); 
           return;
        }

        console.log("received blockchain with the new chain.");
        this.chain = newChain;

    }

}

module.exports = Blockchain;