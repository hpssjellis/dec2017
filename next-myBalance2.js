var IOTA = require('iota.lib.js');

    //
    //  Instantiate IOTA
    //
    var myIota = new IOTA({
        'host': 'http://iota.bitfinex.com:80',
        'port': 80
    });

    var mySeed = 'ABCDEEF9';
    var myAddress;    // generated
    var toAddress =  'GTUWYHPNMK9DEINTZPYM9PNEWLUDQBBPGQJWCPPJCRSZX9OLXJ9UVXEBAHIZSPSEHQOIYNCEOAY9HQOKZJ9ACTMZED'; 
    var myBalance = 0;
  //  var address;
    var name = 'Fred'
    var message = 'Wow I like this'
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

            console.log("Account data", accountData);

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
        myIota.api.sendTransfer(mySeed, 4, 18, transfer, function(e) {

            if (e){
                
                    console.log("error" + e);


            } else {

            
               // myBalance = myBalance - value;
                
               // console.log("balance"+ myBalance);

            }
        })
    }





        console.log("genAddress() started");
        genAddress()
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
  
