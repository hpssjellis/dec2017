var IOTA = require('iota.lib.js');

    //
    //  Instantiate IOTA
    //
    var iota = new IOTA({
        'host': 'http://iota.bitfinex.com:80',
        'port': 80
    });

    var seed = 'ABCDEEF9';
    var toAddress = 'BBBBB9'; 
    var balance = 0;
    var address;
    var name = 'Fred'
    var message = 'Wow I like this'
    var value = 1

   
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
        iota.api.getAccountData(seed, function(e, accountData) {

            console.log("Account data", accountData);

            // Update address
            if (!address && accountData.addresses[0]) {

                address = iota.utils.addChecksum(accountData.addresses[accountData.addresses.length - 1]);

               // updateAddressHTML(address);
            }

            balance = accountData.balance;



            console.log("Balance", balance);

            // Update total balance
           // updateBalanceHTML(balance);
        })
    }

    //
    //  Generate address function
    //  Automatically updates the HTML on the site
    //
    
    
    
    //Not using this
    
    
    function genAddress() {

        console.log("Generating an address");

        // Deterministically Generates a new address with checksum for the specified seed
        iota.api.getNewAddress(seed,  { 'total': 1},  function(e,address) {

             if (!e) {

                console.log("NEW ADDRESS GENERATED: ", address)

                address = address;
                // Update the HTML on the site
                        console.log("Generating an address"+ address);
               // updateAddressHTML(address)
            }
        })
    }









    //
    //  Makes a new transfer for the specified seed
    //  Includes message and value
    //
    function mySendTransfer(toAddress, value, messageTrytes) {

        var transfer = [{
            'address': address,
            'value': parseInt(value),
            'message': messageTrytes
        }]

        console.log("Sending Transfer", transfer);

        // We send the transfer from this seed, with depth 4 and minWeightMagnitude 18
        iota.api.sendTransfer(seed, 4, 9, transfer, function(e) {

            if (e){
                
                        console.log("error" + e);

              //  var html = '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>ERROR!</strong>' + e + '.</div>'
        //        $("#send__success").html(JSON.stringify());

            //    $("#submit").toggleClass("disabled");//

              //  $("#send__waiting").css("display", "none");

            } else {

             //   var html = '<div class="alert alert-info alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> You have successfully sent your transaction. If you want to make another one make sure that this transaction is confirmed first (check in your client).</div>'
            //    $("#send__success").html(html);

              //  $("#submit").toggleClass("disabled");

            //    $("#send__waiting").css("display", "none");

                balance = balance - value;
                
                        console.log("balance"+ balance);
                
                //updateBalanceHTML(balance);
            }
        })
    }













    //
    // Menu Open/Close
    //
        // We fetch the latest transactions every 90 seconds
        getAccountInfo();
       // setInterval(getAccountInfo, 90000);    // ++++++++++++++++++++++++++++++++++++++++++++
   // });

    //
    // Generate a new address
    //
  //  $("#genAddress").on("click", function() {
  ////      if (!seed)
  //          return

      //  genAddress();
   // })

    //
    // Send a new message
    //
  
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
        //    // We display the loading screen
        //    $("#send__waiting").css("display", "block");
          //  $("#submit").toggleClass("disabled");
            // If there was any previous error message, we remove it
    //        $("#send__success").html();

            // call send transfer
            mySendTransfer(address, value, messageTrytes);

        } catch (e) {

            console.log(e);
           // var html = '<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Wrong Format!</strong> Your message contains an illegal character. Make sure you only enter valid ASCII characters.</div>'
           // $("#send__success").html(html);

        }
  
