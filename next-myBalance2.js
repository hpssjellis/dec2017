// API at
//  http://dev.iota.org/javascript-library/



var IOTA = require('iota.lib.js');

    //
    //  Instantiate IOTA
    //
    var myIota = new IOTA({
        'host': 'http://node.iotawallet.info',
        'port': 14265
    });

// 'host': 'http://iota.bitfinex.com:80',
//     'port': 80

// 'host': 'http://node.iotawallet.info',
// 'port': 14265



    var mySeed = 'ABCD'; // you put your seed in but delete befopre saving this file
    var myAddress;    // generated
    var toAddress =  'ABCDEF';    // This is the receiver address
    var myBalance = 0;
  //  var address;
    var name = 'FromOther'
    var message = 'This could be really good'
    var value = 0

   
    //
    //  Properly formats the seed, replacing all non-latin chars with 9's
    //  And extending it to length 81
    //
   

    //
    // Gets the addresses and transactions of an account
    // As well as the current balance
    //  Automatically updates the HTML on the site
    //
    function getAccountInfo() {

        // Command to be sent to the IOTA API
        // Gets the latest transfers for the specified seed
        myIota.api.getAccountData(mySeed, function(e, accountData) {

            console.log("Account data (see below)");
            console.log(accountData);
            console.log("GetAccountData error check "+e);
            console.log("");
            console.log("");
            console.log("accountData.transfers.length below");
            console.log(accountData.transfers.length);
            
            console.log("");
            
           
            console.log("accountData.addresses.length below"); 
            console.log(accountData.addresses.length);
            
            console.log("accountData.inputs.length below");
            console.log(accountData.inputs.length);
            
            
            console.log("Checking transfers (see below)");
            console.log(accountData.transfers[1]);
            console.log("1 above");

           // console.log(accountData.transfers.hash);
          //  console.log(accountData.transfers.signatureMessageFragment);
            console.log("");
           // console.log(accountData.transfers.tag);
            console.log("");
          //  console.log(accountData.transfers.value);
            console.log("");
          //  console.log(accountData.transfers.address);
            console.log("");

            // Update address
         
         
 /*        
         
         
            if (!toAddress && accountData.addresses[0]) {

                toAddress = myIota.utils.addChecksum(accountData.addresses[accountData.addresses.length - 1]);

               // updateAddressHTML(address);
            }

            myBalance = accountData.balance;


*/




            console.log("Balance", myBalance);

            // Update total balance
           // updateBalanceHTML(balance);
        })
    }



    
    
    function genAddress() {

        console.log("Generating an address");

        // Deterministically Generates a new address with checksum for the specified seed
        myIota.api.getNewAddress(mySeed, {'checksum': true}, function(e, address) {

             if (!e) {

                console.log("NEW ADDRESS GENERATED: ", address)

                myAddress = address;

            }
        })
    }







    //
    //  Makes a new transfer for the specified seed
    //  Includes message and value
    //
    function mySendTransfer(toAddress, value, messageTrytes) {

        var transfer = [{
            'address': toAddress,
            'value': parseInt(value),
            'message': messageTrytes
        }]

        console.log("Sending Transfer", transfer);

        // We send the transfer from this seed, with depth 4 and minWeightMagnitude 18
        myIota.api.sendTransfer(mySeed, 4, 14, transfer, {}, function(e) {

            if (e){
                
                    console.log("error" + e);


            } else {

                    console.log("I think your message was sent");
                    console.log("Need to login as the receive address seed");
                    console.log("In order to see it.");
            
               // myBalance = myBalance - value;
                
               // console.log("balance"+ myBalance);

            }
        })
    }





      //  console.log("genAddress() started");
      //  genAddress()
        console.log("");
        console.log("getAccountInfo() started");
        getAccountInfo();
        console.log("");
        console.log("mySendTransfer() started");

        var messageToSend = {
            'name': name,
            'message': message
        }

        try {
            console.log("Sending Message: ", messageToSend);
            var messageTrytes = myIota.utils.toTrytes(JSON.stringify(messageToSend));
            console.log("Converted Message into trytes: ", messageTrytes);

            mySendTransfer(toAddress, value, messageTrytes);

        } catch (e) {

            console.log(e);


        }
  
