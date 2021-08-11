var SerialPort = require('serialport');

export class Serial{
    client:any;
    constructor(port = 'COM4',options = {
        baudRate : 9600,
        autoOpen:false
    }){
        //Opening a Port
        this.client = new SerialPort(port, options);
    }
}


