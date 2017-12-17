// Presently the API is at
//       http://dev.iota.org/javascript-library/   


var IOTA = require('iota.lib.js');
    
var myUri      = 'http://iota.bitfinex.com';
var myPort     = 80;
var mySeed     = 'ABCDEFGF9';  

var myIota = new IOTA({
    'host': myUri,
    'port': myPort
});







// NOTE: RETURNS AN ARRAY IF TOTAL IS GREATER THAN 1. NOT SURE IF RETURNALL OVERRIDES THAT
// Generate one address, based on the last address (determiniistically), without checksum. Easiest we can do


// index: Int If the index is provided, the generation of the address is not deterministic.
// checksum: Bool Adds 9-tryte address checksum
// total: Int Total number of addresses to generate.
// returnAll: Bool If true, it returns all addresses which were deterministically generated (until findTransactions returns null)


// options used inline not the below method for this example
var myOptionsGeneric = {
    index :1, 
    checksum : false, 
    total : 1, 
    returnAll : false
}


function myBalance() {

    myIota.api.getNewAddress(mySeed, {'index':1, 'checksum':false, 'total':1, 'returnAll':false}, function(myError, myAddress) {
        if (myError)  {
          console.log(" Error 1 is " + myError);
          
        }
        else {
          console.log(  "The address " + myAddress);
        
        }
    
    });
};






// start: int Starting key index
// end: int Ending key index
// threshold: int Minimum threshold of accumulated balances from the inputs that is requested


// Get information from your starting address only with a balance over 0 tokens
// Will need to deal with a list if the 'end' is greater than 1

function myGetInputs() {
    myIota.api.getInputs(mySeed, {'start':0, 'end':1, 'threshold' : 0},  function(error, myInputs) {

        if (error){ 
            console.log(" Error is " + error); 
            
        } else {
        console.log(myInputs);  // just prints that an object  was returned
        console.log("Showing myInputs (see above):");
        console.log("Showing the Inputs array (see below):");  // full arrays only show if no comments in console.log
        console.log(myInputs.inputs);   // This array uses (if they exist): address, balance and keyIndex
        console.log("Total Balance is " + myInputs.totalBalance);
        
        }
    });
}









//myBalance();
myAttachToTangle();








function myAttachToTangle(){


// SendTransfers API info
// seed String tryte-encoded seed. If provided, will be used for signing and picking inputs.
// depth Int depth
// minWeightMagnitude Int minWeightMagnitude

// transfers: Array of transfer objects:
    // address: String 81-tryte encoded address of recipient
    // value: Int value to be transferred.
    // message: String tryte-encoded message to be included in the bundle.
    // tag: String 27-tryte encoded tag.

// options: Object which is optional:
    // inputs: Array List of inputs used for funding the transfer
    // address: String if defined, this address will be used for sending the remainder value (of the inputs) to.


    console.log("my Attach To Tangle function has started");
    
    var myOptions1 = {
        total : 1 
    }
        //   index :1 
       //  checksum : false, 
       //  total : 1, 
       // returnAll : false   
  //myIota.api.getNewAddress(mySeed, {'index':1, 'checksum':false, 'total':1, 'returnAll':false}, function(myError1, myAddress1) {
    
   myIota.api.getNewAddress(mySeed, myOptions1, function(myError1, myAddress1) {
        // We attach the address to the tangle with an empty message transaction 
         if (myError1)  {
          console.log(" Stopped with getNewAddress, Errors getting address " + myError1);
        }
        else {   
            var myDepth = 4;
            var myMinWeightMagnitude = 18;
            
            var myTransfer = [{
                address: myAddress1,
                value: 0,
                message: '',
                tag: ''
            }]
     
     
            // NOTE not using myOptions2 the unless needed  
            
            var myOptions2 = {
                inputs : 1 
            }    
                
           // Trying to attach to Tangle with an empty message
           
            myIota.api.sendTransfer( mySeed, myDepth, myMinWeightMagnitude, myTransfer, myOptions2, function( myError2, myAttached ) {
                if (myError2) {
                    console.log("Error in sendTransactions " + myError2);
                } else
                {
                    console.log("Successfully attached your transaction to the Tangle with transaction (see below):", myAttached);
                    console.log(myAttached);
                     console.log("Now starting myGetInputs. To check it");                   
                    
                    myGetInputs();         
                }
            })
            
        
        }   // error1 check area ended
    });
    



}  // end of main function





function wow(){



    var name = 'Fred'
    var message = 'Wow I like this'
    var value = 0



    function mySendTransfer(address, value, messageTrytes) {

        var transfer = [{
            'address': address,
            'value': parseInt(value),
            'message': messageTrytes
        }]

        console.log("Sending Transfer", transfer);

        // We send the transfer from this seed, with depth 4 and minWeightMagnitude 18
        iota.api.sendTransfer(seed, 4, 18, transfer, function(e) {

            if (e){
                
                        console.log("error" + e);


            } else {


                balance = balance - value;
                
                        console.log("balance"+ balance);

            }
        })
    }












  
        // the message which we will send with the transaction
        var messageToSend = {
            'name': name,
            'message': message
        }

        // Convert the user message into trytes
        // In case the user supplied non-ASCII characters we throw an error
        try {
            console.log("Sending Message: ", messageToSend);
            
            var messageTrytes = iota.utils.toTrytes(JSON.stringify(messageToSend));
            console.log("Converted Message into trytes: ", messageTrytes);


            // call send transfer
            mySendTransfer(address, value, messageTrytes);

        } catch (e) {

            console.log(e);


        }
        
        
        
}       
     
    
