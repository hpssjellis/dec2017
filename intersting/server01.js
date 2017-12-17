var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 8080


var IOTA = require('iota.lib.js');


var myIota = new IOTA({
  'host': 'http://iota.bitfinex.com:80',
  'port': 80
});

var mySeed = 'ABCDEF9'
var myBack = 9;


function getBalance() {
  myIota.api.getInputs(mySeed, {'start':0, 'end':1, 'threshold' : 0},  function(error, myInputs) {
    
// {'start':0, 'end':1, 'threshold' : 0},   // best and fast
// {'start':0, 'end':1},     worked
// {'start':0},        really slow
// myIota.api.getInputs(mySeed, {},  function(error, myInputs) {  // slow
// myIota.api.getInputs(mySeed,   function(error, myInputs) {  // slow also worked
 
 
 
        if (error){ console.log(" Error is " + error); } else {
        console.log(myInputs);
        console.log("The inputs see above:");
       myBack = myInputs.totalBalance
        console.log(myInputs.inputs);
        console.log(myInputs.totalBalance);

        }
    });
}



app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)


console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")


wss.myBroadcast = function(data) {
  
  // I think for security make this a "for" loop with just 2 or 3 connections instead of anyone.
  // for (var i = 0; i <= 1; i++){  // this would allow one webpage and one photon
  for (var i in this.clients){
    
    
     this.clients[i].send(data);
     console.log('sent to client[' + i + '] ' + data);
     if (data == 'wow'){
       getBalance()
        console.log("Version " + myIota.version)
             this.clients[i].send("Version " + myIota.version);
     }
          if (data == 'wo0'){
       getBalance()
        console.log("myBack = " + myBack)
             this.clients[i].send("myBack = " + myBack);
     }
  }
};


wss.on("connection", function(ws) {
  var id = setInterval(function() {
      console.log("send ping: C")
      //ws.send(JSON.stringify(new Date()), function() {  })
      ws.send("C",function() {  })
    
  }, 12000)   
  
  
  console.log("websocket connection open " )
  
  ws.on('message', function(message) {
      console.log('received: %s', message);
      wss.myBroadcast(message);  
  });  
        

  ws.on("close", function() {
     console.log("websocket connection close")
     clearInterval(id)
  })
  
  
})  // end wss.on
