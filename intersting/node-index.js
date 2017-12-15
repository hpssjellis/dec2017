var IOTA = require('iota.lib.js');


var iotajs = new IOTA({
  'host': 'http://iota.bitfinex.com:80',
  'port': 80
});



console.log("Version " + iotajs.version)

