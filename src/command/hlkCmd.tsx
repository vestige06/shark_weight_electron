// import { Transcoder } from "./base/Transcoder";
import {Socket} from "net";
// const iconv = require('iconv-lite');
// var transcoder = new Transcoder();
class hlkCmd{
    socket:Socket;
    // trans:Transcoder;
    constructor(socket:Socket){
        this.socket = socket;
        // this.trans = trans;
    }
    // getsn
    openLeftSwitch(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x01]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(4,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    closeLeftSwitch(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x00]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(4,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    openRightSwitch(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x01]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(8,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    closeRightSwitch(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x00]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(8,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    turnLeftSwitch(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x02]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(128,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    turnRightSwitch(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x02]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(64,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    jogLeftSwitch(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x03]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(128,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    jogRightSwitch(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x03]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(64,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }


    openLeftLight(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x00]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(32,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    openRightLight(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05])
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x00]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(16,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    closeLeftLight(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05]);
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x01]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(32,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }
    
    closeRightLight(){
        var headerBuf:Buffer = Buffer.from([0x6a,0xa6]);
        var lengthBuf:Buffer = Buffer.from([0x05]);
        var controlBuf:Buffer = Buffer.from([0x01]);
        var dataBuf1:Buffer = Buffer.from([0x01]);
        var dataBuf2:Buffer = Buffer.alloc(2);
        dataBuf2.writeUInt16BE(16,0);
        var crc:Buffer = Buffer.concat([lengthBuf,controlBuf,dataBuf1,dataBuf2]);
        var checksum:number = 0;
        crc.forEach(element => {
            checksum+= element;
        });
        var crcStr:any = ['0x'+checksum.toString(16)];
        var checkBuf = Buffer.from([crcStr]);
        var totalBuf = Buffer.concat([headerBuf,lengthBuf,controlBuf,dataBuf1,dataBuf2,checkBuf]);
        this.socket.write(totalBuf);
    }

    



}
export{hlkCmd};


