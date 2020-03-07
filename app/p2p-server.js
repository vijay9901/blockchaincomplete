/**
 * definig the peers 
 */
const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  // ports from the user
  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
   // this for connecting the peers
    server.on('connection', socket => this.connectSocket(socket));
    // this for all the peers 
    this.connectToPeers();
    console.log(`Listening for peer-to-peer connectons on:${P2P_PORT}`);
}

connectToPeers(){

    peers.forEach(peer =>{
        const socket = new Websocket(peer);
    
        socket.on('open',()=> this.connectSocket(socket));
       
    })
}
  // add all peers - socket into array
  connectSocket(socket) {
    console.log(" main server peers ");
    this.sockets.push(socket);
    console.log('Socket connected');
    this.messageHandler(socket);    
    this.sendChain(socket);
   // socket.send( JSON.stringify(this.blockchain.chain));

  }

  messageHandler(socket){
    socket.on('message', message =>{
      const data = JSON.parse(message);
     // console.log('data',data);
     this.blockchain.replaceChain(data);
    })
  }
 // for building reusable used this function 
  sendChain(socket){
    socket.send( JSON.stringify(this.blockchain.chain));

  }
  
  // sync all peers chains 
  syncChain(){
    this.sockets.forEach(socket =>  this.sendChain(socket));
  }

}

module.exports = P2pServer;