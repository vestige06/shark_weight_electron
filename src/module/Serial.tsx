var SerialPort = require('serialport');

class Serial{
    client:any;
    constructor(port = 'COM4',options = {
        baudRate : 9600,
        autoOpen:false
    }){
        //Opening a Port
        this.client = new SerialPort(port, options);
    }
    // this.client.open(function (err) {});

    // this.client.on('data',function (data) {
    //     console.log('data received: '+data)
    // });

    // this.client.on('error',function (error) {
    //     console.log('error: '+error)
    // });
}

export {Serial};
