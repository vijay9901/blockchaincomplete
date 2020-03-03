
const Block = require('./block');

const block =  new Block('VIAJY','VINAY','VINESH','VIKAS');

//console.log(block.toString());

//console.log(Block.genesis().toString());
console.log(Block.mineBlock(Block.genesis(),'foo').toString())