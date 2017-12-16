var IOTA = require('iota.lib.js');


  var myUri      = 'http://iota.bitfinex.com';
  var myPort     = 80;
  var mySeed     = 'ABCDEFG9';  //["SEEDONE", "SEEDTWO"]
  // var nAddr   = 2
  var myAddress  = '';
 // var myAmount   = []; 



var myIota = new IOTA({
  'host': myUri,
  'port': myPort
});

//Takes a list of seeds and generates the first X addresses for each seed. 
function myBalance() {


    myIota.api.getNewAddress(mySeed, {'total': 1}, function(e, myAddress) {
        if (e)  {
          console.log(" Error 1 is " + e);
        }
        else {
          
          console.log(  "The address " + myAddress);

            // myIota.api.getBalances(myAddress, 100, function(e2, myAmount) {
            //    if (e2){ console.log(" Error 2 is " + e); } else
            //    {     console.log(" Amount is " + myAmount);}
            // });
        }
  
    });
  };




//Takes a list of addresses as argument and should get the balance for each address
function getBalanceWorks(addresses) {
  myIota.api.getBalances(addresses,  function(error, inputs) {
      if (error){console.log(" Error balances is " + error);} else 
          console.log(  "The input " + inputs.balances);
          console.log(  "The address " + addresses);
        });
}


function getBalance() {
  myIota.api.getInputs(mySeed,  {'start':0, 'end':1, 'threshold' : 0}, function(error, myInputs) {
    

        console.log("The input " + myInputs);
        console.log(" Error is " + error); 
        //  console.log(  "The input " + inputs.inputs.address);
        //  console.log(  "The input " + inputs.inputs.balance);
        //  console.log(  "The input " + inputs.inputs.keyIndex);
      
    });
}









myBalance();
getBalance()
