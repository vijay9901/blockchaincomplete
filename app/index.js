const express = require('express');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server');
const HTTP_PORT = process.env.HTTP_PORT||3001;

const app = express();
app.use(bodyParser.json());
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

app.get('/blocks',(req,res)=>{
    // console.log("bc.chain ",bc.chain)
    res.json(bc.chain);
})

app.post('/mine',(req,res)=>{
    console.log(req.body);
    const block =bc.addBlock(req.body.data);
    console.log(`new block added:${block.toString()}`);
    
    p2pServer.syncChain();
    res.redirect('/blocks');   
})

app.listen(HTTP_PORT,()=>
console.log(`Listening on port ${HTTP_PORT}`))
p2pServer.listen();

// HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev

// HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
//HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev