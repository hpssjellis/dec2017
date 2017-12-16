var IOTA = require('iota.lib.js');


  var myUri      = 'http://iota.bitfinex.com';
  var myPort     = 80;
  var mySeed     = 'ABCDEF9';  //["SEEDONE", "SEEDTWO"]
  // var nAddr   = 2
  var myAddress  = '';
  var myAmount   = []; 



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
          getBalance(myAddress)
            // myIota.api.getBalances(myAddress, 100, function(e2, myAmount) {
            //    if (e2){ console.log(" Error 2 is " + e); } else
            //    {     console.log(" Amount is " + myAmount);}
            // });
        }
  
    });
  };




//Takes a list of addresses as argument and should get the balance for each address
function getBalance(addresses) {
  myIota.api.getBalances(addresses, 1, function(error, inputs) {
      if (error){console.log(" Error balances is " + error);} else 
          console.log(  "The input " + inputs.balances);
          console.log(  "The address " + addresses);
        });
}









myBalance();
