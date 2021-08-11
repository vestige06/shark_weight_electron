import {Signature} from './Signature';
const iconv   = require('iconv-lite');
const signature = new Signature();
// const SharkIvsResult = require('../db/SharkIvsResult.js');
var cppMsg = require('cppmsg');
let fs = require('fs');

class Transcoder{
    constructor(){
    }
    
    cmdSend(socket:any,cmd:string = '',packId:number = 0,isKeepAlive:number = 0,headerSize:number = 8,afterCall = function(){}){
        if(isKeepAlive === 0){
            const headerBuf = Buffer.alloc(headerSize);
            // INIT HEADER SET
            headerBuf.writeUInt8(86,0);
            headerBuf.writeUInt8(90,1);
            headerBuf.writeUInt8(isKeepAlive,2);
            headerBuf.writeUInt8(packId,3);
            headerBuf.writeUInt32BE(cmd.length,4);
            const bodyBuf = Buffer.alloc(cmd.length);
            bodyBuf.write(cmd);
            socket.write(headerBuf);
            socket.write(bodyBuf);
            afterCall();
        }
        else if(isKeepAlive == 1){
            const headerBuf = Buffer.alloc(headerSize);
            headerBuf.writeUInt8(86,0);
            headerBuf.writeUInt8(90,1);
            headerBuf.writeUInt8(isKeepAlive,2);
            headerBuf.writeUInt8(packId,3);
            headerBuf.writeUInt32BE(0,4);
            socket.write(headerBuf);
            afterCall();
        }
    }
    decode(buffer:Buffer,encoding = 'utf-8'):any{
        const header = buffer.slice(0,8);
        var dataLen = buffer.readUInt32BE(4);
        if(header.readUInt8(0) == 86 && header.readUInt8(1) == 90){
            const body  = buffer.slice(8,8+dataLen);
            return {
                packId: header.readUInt8(3),
                packLen: header.readUInt32BE(4),
                packType: header.readUInt8(2),
                header: header, 
                body: body,
                bodyStr: body.toString(),
                bodyJson: JSON.parse(body.toString())
                // data: iconv.decode(body,'gbk')
            }
        }
    }
    // data 为buffer 转485 封包函数
    encrype(cmd = 0x00, data:Buffer){
        var dataLen = data.length;
        var buf0 = Buffer.alloc(2);
        buf0.writeUInt16LE(21930,0);
        var buf = Buffer.alloc(6);
        buf.writeUInt8(1,0);
        buf.writeUInt8(100,1);
        buf.writeUInt8(0,2);
        buf.writeUInt8(cmd,3);
        buf.writeUInt16BE(dataLen,4);

        var buf_data = data;
        var buf_mask = Buffer.alloc(2);
        buf_mask.writeUInt16BE(0,0);

        var buf3 = Buffer.concat([buf,buf_data,buf_mask],(buf.length+buf_data.length+buf_mask.length));
        var crc = signature.crc16_modbus(buf3,buf3.length);
        var buf_crc = Buffer.alloc(2);
        buf_crc.writeUInt16LE(crc);

        var buf_end = Buffer.alloc(1);
        buf_end.writeUInt8(175);
        var final = Buffer.concat([buf0,buf,buf_data,buf_crc,buf_end],(buf0.length+buf.length+buf_data.length+buf_crc.length+buf_end.length));
        
        var origin_len = final.length;
        var origin_b64 = final.toString('base64');
        return {
            'length': origin_len,
            'b64content': origin_b64
        };
    }

    iterateTcpPack(data:Buffer,callback:any){
        // console.log(data.toString());
        this.processTcpPack(data,callback);
        /*
        var dataArr = data.toString().replace(/\n/g,"").split(/(?=VZ.{6})/);
        var decode = this.decode;
        dataArr.forEach(function(item){
            var tmp = item.replace(/VZ.{6}/g, "");
            if(!tmp){
                // console.log(item);
                // console.log(item);
                // console.log(item.length);
                // console.log(Buffer.from(item,'utf8'));
                // Buffer.from()
                // console.log(item);
            }
            else{
                var obj = decode(Buffer.from(item));
                console.log(obj);
                callback(item);
            }
        },decode);
        */
    }

    binaryToStr(str:string){
        var result = [];
        var list = str.split(" ");
        for(var i=0;i<list.length;i++){
             var item = list[i];
             var asciiCode = parseInt(item,2);
             var charValue = String.fromCharCode(asciiCode);
             result.push(charValue);
        }
        return result.join("");
    }

    processTcpPack(data:Buffer,callback: (item:any) => void){
        // heart beat pack
        if(data.readUInt8(0) === 0x56 && data.readUInt8(1) === 0x5a && data.readUInt8(2) === 0x01){
            data = data.slice(8);
        }
        else if(data.readUInt8(0) === 0x56 && data.readUInt8(1) === 0x5a && data.readUInt8(2) === 0x00){
            var dataLen = data.readUInt32BE(4);
            // console.log(8+dataLen+'======'+data.length+"===="+data.slice(0,8+dataLen).length);
            if(data.slice(0,8+dataLen).length < data.length){
                // more than one 
                console.log('more than one pack');
            }
            else{
                //预判是不是 "cmd": "ivs_result" 命令, 单独处理
                var reg = RegExp(/"cmd":"ivs_result"/g);
                if(reg.test(data.slice(8,8+dataLen).toString())){
                    var clipImgSize:any = data.slice(8,8+dataLen).toString().match(/"clipImgSize":(\d*),/);
                    var fullImgSize:any = data.slice(8,8+dataLen).toString().match(/"fullImgSize":(\d*),/);
                    var bodyJsonLen = dataLen - (parseInt(clipImgSize[1]) + parseInt(fullImgSize[1]));
                    var bodyFullImgLen = fullImgSize[1];
                    var bodyClipImgLen = clipImgSize[1];
                    // console.log(dataLen - (clipImgSize[1] + fullImgSize[1]));
                    var bodyJson:Buffer = data.slice(8,7+bodyJsonLen);
                    var bodyJsonParse = JSON.parse(iconv.decode(bodyJson,'gbk'));
                    var license = bodyJsonParse.PlateResult.license;
                    var bodyFullImg = data.slice(8+bodyJsonLen,8+bodyJsonLen+bodyFullImgLen);
                    var bodyClipImg = data.slice(8+bodyJsonLen+bodyFullImgLen,8+bodyJsonLen+bodyFullImgLen+bodyClipImgLen);
                    var final =  {
                            packId: data.readUInt8(3),
                            packLen: data.readUInt32BE(4),
                            packType: data.readUInt8(2),
                            header: data.slice(0,8), 
                            body: data.slice(8,dataLen),
                            bodyStr: data.slice(8,dataLen).toString(),
                            bodyFullImg: bodyFullImg,
                            bodyClipImg: bodyClipImg,
                            bodyJson: bodyJson,
                            license:license
                            // data: iconv.decode(body,'gbk')
                    }
                    callback(final);
                    //  var a =  new SharkIvsResult(); 
                    //  a.add(JSON.stringify(final.bodyJson));
                }
                else{
                    callback(this.decode(data));
                    // console.log(this.decode(data));
                }
            }
        }
    }
    arrayBufferToBase64(buffer:Buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return btoa(binary);

    };

    saveImage(data:Buffer,path= ''){
        // var body = data.toString('base64');
        // console.log(data.readUInt16LE(data.length-2));
        // var base64Data = body.replace(/^data:image\/png;base64,/,"");
        // var binaryData = new Buffer(base64Data, 'base64').toString('binary');


        // require("fs").writeFile("out.jpg", file, "binary", function(err) {
        // console.log(err); // writes out file without error, but it's not a valid image
        // });
    }
}

export {Transcoder};