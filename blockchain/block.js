
/**
 * Here block is the important class of block chain 
 * doing export here
 * this is basic module
 */
const SHA256 = require('crypto-js/sha256');
class Block{

    constructor(timestamp,lastHash,hash,data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    toString(){
        return `block -
        Timestamp :${this.timestamp}
        lastHash :${this.lastHash.substring(0,10)}
        hash :${this.hash.substring(0,10)}
        data :${this.data}
        `
    }
    // here  genesis means first block of the chain
    static genesis(){
        return new Block("today","----","hashh",[])
    }
    
    // creating real block
    static mineBlock(lastBlock,data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp,lastHash,data);
        return new this(timestamp,lastHash,hash,data);

    }
  // to generate a unique hash
    static hash(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block){
        const { timestamp,lastHash,data} = block;
        return Block.hash(timestamp,lastHash,data);
    }
}

module.exports = Block;