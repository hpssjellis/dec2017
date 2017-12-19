



var Gpio = require('onoff').Gpio,
  led = new Gpio(17, 'out'),
  button = new Gpio(4, 'in', 'both');

button.watch(function (err, value) {
  if (err) {
    throw err;
  }

 // led.writeSync(value);
 
 if (value == 1){
    led.writeSync(1); 
 } else { 
    led.writeSync(0); 
 }
 
 
 
 
});

process.on('SIGINT', function () {
  led.unexport();
  button.unexport();
});
