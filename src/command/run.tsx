const Net = require('net');
const Transcoder = require('./base/Transcoder');
const Signature = require('./base/Signature');
const Cmd = require('./cmd.js');
var async = require('async');
const options:any = {
    host : '14.10.25.16',
    // host : '192.168.8.100',
    port : 8131
}

const socket = Net.Socket();
const trans = new Transcoder();
const signature = new Signature();
const cmd = new Cmd(socket,trans);


var data:any = Buffer.alloc(0);
var dataState:any = {
    header: Buffer.alloc(2),
    type: Buffer.alloc(1),
    flag: 0,
    dataLen:0
};

socket.connect(options,function(){
    console.log('connected to Server');
})

var onDataConcat = function(chunk:Buffer){
    if(dataState.flag === 0){
        if(data.length > 0){
            dataState.header = data.readUInt16BE(0);
            dataState.type = data.readUInt8(2);
            dataState.flag = 1;
            dataState.dataLen = data.readUInt32BE(4);
        }
        else{
            dataState.header = chunk.readUInt16BE(0);
            dataState.type = chunk.readUInt8(2);
            dataState.flag = 1;
            dataState.dataLen = chunk.readUInt32BE(4);
        }
    }
    if(dataState.header === 22106 && dataState.type === 1 && dataState.flag === 1){
    }
    else if(dataState.header === 22106 && dataState.type === 0 && dataState.flag === 1){
        if(8+dataState.dataLen <= chunk.length){
            queue.pushAsync(chunk.slice(0,8+dataState.dataLen));
            data = chunk.slice(8+dataState.dataLen,chunk.length);
            dataState.header = Buffer.alloc(2);
            dataState.type =  Buffer.alloc(1);
            dataState.flag = 0;
            dataState.dataLen = 0;
        }
        else{
            data = Buffer.concat([data,chunk]);
            if(8+dataState.dataLen === data.length){
                queue.pushAsync(data);
                data = "";
                dataState.header = Buffer.alloc(2);
                dataState.type =  Buffer.alloc(1);
                dataState.flag = 0;
                dataState.dataLen = 0;
            }
        }
    }
    else{
    }
}

var onDataProc = async function(data:any,completed:any){
    // console.log(data);
    trans.iterateTcpPack(data,function(item:any){
    });
}
const queue = async.queue(onDataProc, 1);

socket.on('data',onDataConcat);

socket.on('end',function(){
    console.log('data end!');
})

socket.on('error', function () {
    console.log('socket error!');
})

async function main(){
    // cmd.get_image(0);
    // get_image
    // trans.cmdSend(socket,'{ "cmd": "ttransmission", "id" : "999999", "subcmd": "init", "data": "rs485-1" }',1);
    //  await cmd.sleep(1000);
    // trans.cmdSend(socket,'{ "cmd": "ttransmission", "id" : "999999","subcmd": "send", "datalen": 0, "data": "", "comm": "rs485-1" }',2);

    
    // await cmd.sleep(200);
    // setInterval(() => {
    //     cmd.getsn();
    // }, (1000));
   
    // cmd.getsn();
    cmd.ivsresult(true,true);
    cmd.getivsresult();
    //  cmd.ivsresult();
    //  await cmd.sleep(3000);
    //  cmd.sendKeepAlive();
    // await cmd.sleep(1000);
    // cmd.ivsresult();

    // cmd.playVoiceStr('5');
}

 main();
 
 export {main}