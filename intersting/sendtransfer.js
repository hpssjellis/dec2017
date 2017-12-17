var seed = 'ABCDEFG';
var options = {
    index: 1
}
iota.api.getNewAddress( seed, options, function( error, address ) {
    // We attach the address to the tangle with an empty message transaction 
    var transfer = [{
        address: address,
        value: 0,
        message: '',
        tag: ''
    }]
    // Depth for the tip selection
    var depth = 4;
    // If we're on the mainnet, minWeightMagnitude is 18
    var minWeightMagnitude = 18;
    // Call the sendTransfer API wrapper function 
    // It takes care prepareTransfers, attachToTangle, broadcast and storeTransactions
    iota.api.sendTransfer( seed, depth, minWeightMagnitude, transfer, function( e, attached ) {
        if (!e) {
            console.log("Successfully attached your transaction to the Tangle with transaction", attached);
        }
    })
});
