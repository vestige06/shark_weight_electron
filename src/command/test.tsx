var net = require('net');
const { decode } = require('querystring');
var transcoder = require('./Transcoder');
var Signature = require('./Signature');
var iconv   = require('iconv-lite');
// 指定连接的tcp server ip，端口
var options = {
    // host : '192.168.8.101',  
    // host : '192.168.8.177',  
    host : '14.10.25.16',  
    // host : '192.168.8.100',  
    port : 8131
}

var socket = net.Socket();
var trans = new transcoder();
var signature = new Signature();
// 连接 tcp server
socket.connect(options,function(){
    console.log('connected to Server');
})

// 接收数据
socket.on('data',function(data){
    var dataArr = data.toString().replace(/\n/g,"").split(/(?=VZ.{6})/);
    console.log(data.toString());
    dataArr.forEach(function(item){
        var tmp = item.replace(/VZ.{6}/g, "");
        if(!tmp){
            console.log(tmp);
        }
        else{
            var obj = trans.decode(Buffer.from(item));
            console.log(obj);
        }
    });
})

socket.on('end',function(){
    console.log('data end!');
})

socket.on('error', function () {
    console.log('socket error!');
})

var sendKeepAlive = function(socket)
{
    setInterval(() => {
        trans.cmdSend(socket,'{}',255,1);
    }, 1000);
}

var encryptScreen = function(cmd = '0X00',dataLength = '0X0000',data = '0X00',crc = '0X0000'){
    var DA = '0X00';
    var VR = '0X64';
    var PN = '0XFFFF';
    var str = DA+" "+VR+" "+PN+" "+cmd+" "+dataLength;
    var final = signature.crc16_modbus(str);
    str = str+" "+final;
    return str;
}
// var encrypt = encryptScreen();
// var be = new Buffer('00 64 FF FF 30 02 01 31 0B 52');
// var s = be.toString('base64');
// console.log(s);
// var str2 = '00 64 FF FF 30 02 01 31 0B 52';
// console.log(str2.length)
/*
{ "cmd": "ttransmission", "id" : "999999","subcmd": "send", "datalen": 6, "data": "QUJDREVG", "comm": "rs485-1" }
{ "cmd": "ttransmission", "id" : "999999", "subcmd": "init", "data": "rs485-1" }
{ "cmd": "ttransmission", "id" : "999999", "subcmd": "uninit" }
*/

// data 为buffer
var encrype = function(cmd = 0x00, data = ''){
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
    // for(i = 0; i<data.length;i++){
    //     buf_data.writeUInt8(data.charAt(i),i);
    // }

    
    var buf_mask = Buffer.alloc(2);
    buf_mask.writeUInt16BE(0,0);

    var buf3 = Buffer.concat([buf,buf_data,buf_mask],(buf.length+buf_data.length+buf_mask.length));
    var crc = signature.crc16_modbus(buf3,buf3.length);
    var buf_crc = Buffer.alloc(2);
    buf_crc.writeUInt16LE(crc);

    var buf_end = Buffer.alloc(1);
    buf_end.writeUInt8(175);
    var final = Buffer.concat([buf0,buf,buf_data,buf_crc,buf_end],(buf0.length+buf.length+buf_data.length+buf_crc.length+buf_end.length));
    return final; 
} 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }


// encrype(0x13,'5');

// trans.cmdSend(socket,'{"cmd" : "getsn"}',0);
// trans.cmdSend(socket,'{"cmd" : "getsn"}',1);
// trans.cmdSend(socket,'{"cmd" : "getsn"}',2);
async function main(){


var dataStr = '5';
// var dataBody = iconv.encode(dataStr,'gbk');
var dataBody = Buffer.alloc(1);
dataBody.writeUInt8(1,0);
data = Buffer.concat([dataBody]);
var origin = encrype(0x12,data);


var origin_len = origin.length;
var origin_b64 = origin.toString('base64');
    sendKeepAlive(socket);
    try{
        console.log(1);
        trans.cmdSend(socket,'{ "body" : { "baud_rate" : 9600, "data_bits" : 8, "parity" : 0, "stop_bits" : 2 },"cmd" : "set_serial_para", "id" : "123", "serial_port" : 0 }',1);
        await sleep(1000);
        trans.cmdSend(socket,'{ "cmd": "ttransmission", "id" : "999999", "subcmd": "init", "data": "rs485-1" }',1);
       console.log(2);
        await sleep(1000);
        trans.cmdSend(socket,'{ "cmd": "ttransmission", "id" : "999999","subcmd": "send", "datalen": '+origin_len+', "data": "'+origin_b64+'", "comm": "rs485-1" }',2);
       console.log(3);
        await sleep(1000);
    }
    catch(e){
        console.log(e);
    }
    
}

async function main2(){
    sendKeepAlive(socket);
    console.log(1);
    await sleep(1000);
    // trans.cmdSend(socket,'{ "cmd" : "set_networkparam", "id" : "132156", "body":{ "ip":"192.168.1.177", "netmask":"255.255.255.0", "gateway":"192.168.1.1", "dns":"0.0.0.0" } }',5);
    console.log(2);
    await sleep(1000);
    trans.cmdSend(socket,'{ "cmd" : "get_networkparam", "id" : "132156" }');
    
}

async function main3(){
    sendKeepAlive(socket);
    console.log(1);
    await sleep(1000);
    trans.cmdSend(socket,'{ "cmd": "getsn", "id":"123456" }');
    console.log(2);
    await sleep(1000);
    trans.cmdSend(socket,'{ "cmd": "getsn", "id":"123456" }');
}

async function main4(){
    sendKeepAlive(socket);
    console.log(1);
    await sleep(1000);
    trans.cmdSend(socket,'{ "cmd" : "get_rtsp_uri", "id" : "132156" }');
    console.log(2);
    await sleep(1000);
    // trans.cmdSend(socket,'{ "cmd": "getsn", "id":"123456" }');
}

async function main5(){
    trans.cmdSend(socket,'{ "cmd": "ivsresult", "id" : "123", "enable": true, "format": "json", "image": false, "image_type": 0 }',1);
    sendKeepAlive(socket);
}

 main5();
// trans.cmdSend(socket,'{ "SerialData":{"channel" : 0, "ipaddr" : "192.168.8.105" "serialChannel" : 1,"data": '+base64str+',"dataLen" : '+base64strLen+'}}')
// trans.cmdSend(socket,'{ "body" : { "baud_rate" : 19200, "data_bits" : 8, "parity" : 0, "stop_bits" : 2 },"cmd" : "set_serial_para", "id" : "123", "serial_port" : 0 }',1);
// trans.cmdSend(socket,'{ "cmd": "ttransmission", "id" : "999999", "subcmd": "init", "data": "rs485-1" }',1);

// trans.cmdSend(socket,'{ "cmd": "ttransmission", "id" : "999999","subcmd": "send", "datalen": 41, "data": "MDAgNjQgRkYgRkYgMDAgMDYgMzEgMzUgMzkgMzcgMzUgMzMgRkIgMDY=", "comm": "rs485-1" }',2);
//trans.cmdSend(socket,'{}',1);
// console.log(hexToStringWide('00 64 FF FF 6F 96 00 00 04 00 03 01 05 00 03 00 FF 00 00 00 1C 60 59 2D 60 4D 2D 60 44 20 60 67 D0 C7 C6 DA 60 56 20 60 72 60 48 3A 60 4E 3A 60 53 0D 01 01 01 05 00 03 00 00 FF 00 00 10 BC F5 CB D9 C2 FD D0 D0 C7 EB CE F0 B8 FA B3 B5 0D 02 01 01 05 00 03 00 FF 00 00 00 10 CE C4 C3 F7 BC DD CA BB D6 C8 D0 F2 CD A3 B3 B5 0D 03 01 01 05 00 03 00 00 FF 00 00 10 D7 D4 B6 AF CA B6 B1 F0 CE DE D0 E8 C8 A1 BF A8 00 0A 10 D7 D4 B6 AF CA B6 B1 F0 CE DE D0 E8 C8 A1 BF A8 00 3B F0'));

// trans.cmdSend(socket,'{ "cmd": "ivsresult", "id" : "123", "enable": true, "format": "json", "image": true, "image_type": 0 }',1);
// 获取LED 显示内容
// trans.cmdSend(socket,'{"cmd":"get_led_show", "id":"12365"}',1);

// trans.cmdSend(socket,'{ "cmd" : "set_led_show", "id" : "12365", "body" : {"led_enable" : 1, "led_content" :{ "led_proto" : 1, "led_status" : 1, "led_refresh_time" : 1, "led_line_num" : 4, "line_content": [{"show_mode" : 1, "show_content" : "5qyi6L+O5YWJ5Li0"}, {"show_mode" : 1, "show_content" : "5qyi6L+O5YWJ5Li0"}, {"show_mode" : 1, "show_content" : "5qyi6L+O5YWJ5Li0"}, {"show_mode" : 1, "show_content" : "5qyi6L+O5YWJ5Li0"}] },"voice_mode" : 1, "voice_content" : { "voice_volume":2, "voice_welcom": 1, "voice_tag" : 1, "play_content":"5qyi6L+O5YWJ5Li0" },"car_info":{ "park_time" : 32, "payment_amount" : 9, "car_type" : 1, "car_plate" : "5qyi6L+O5YWJ5Li0" } } }',2);
// '{ "cmd" : "set_led_show", "id" : "12365", "body" : {"led_enable" : 1, "led_content" :{ "led_proto" : 1, "led_status" : 1, "led_refresh_time" : 1, "led_line_num" : 4, "line_content": [{"show_mode" : 1, "show_content" : "5qyi6L+O5YWJ5Li0"}, {"show_mode" : 1, "show_content" : "5qyi6L+O5YWJ5Li0"}, {"show_mode" : 1, "show_content" : "5qyi6L+O5YWJ5Li0"}, {"show_mode" : 1, "show_content" : "5qyi6L+O5YWJ5Li0"}] },"voice_mode" : 1, "voice_content" : { "voice_volume":2, "voice_welcom": 1, "voice_tag" : 1, "play_content":"5qyi6L+O5YWJ5Li0" },"car_info":{ "park_time" : 32, "payment_amount" : 9, "car_type" : 1, "car_plate" : "5qyi6L+O5YWJ5Li0" } } }'
// trans.cmdSend(socket,'{"cmd" : "getsn"}',0);



// trans.cmdSend(socket,'{ "cmd":"get_hw_board_version", "id" : "12" }',1);