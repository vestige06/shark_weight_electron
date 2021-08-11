import { Transcoder } from "./base/Transcoder";
import {Socket} from "net";
const iconv = require('iconv-lite');
var transcoder = new Transcoder();
class Cmd{
    socket:Socket;
    trans:Transcoder;
    constructor(socket:Socket,trans:Transcoder){
        this.socket = socket;
        this.trans = trans;
    }

    sendKeepAlive(){
        setInterval(() => {
            this.trans.cmdSend(this.socket,'{}',255,1);
        }, 1000);
    }
    
    sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    
    async send485(data:{'length':number,'b64content':string},channel = 1){
        try{
            this.trans.cmdSend(this.socket,'{ "body" : { "baud_rate" : 9600, "data_bits" : 8, "parity" : 0, "stop_bits" : 2 },"cmd" : "set_serial_para", "id" : "123", "serial_port" : 0 }',1);
            await this.sleep(1000);
            this.trans.cmdSend(this.socket,'{ "cmd": "ttransmission", "id" : "999999", "subcmd": "init", "data": "rs485-'+channel+'" }',1);
            await this.sleep(1000);
            this.trans.cmdSend(this.socket,'{ "cmd": "ttransmission", "id" : "999999","subcmd": "send", "datalen": '+data.length+', "data": "'+data.b64content+'", "comm": "rs485-'+channel+'" }',2);
            await this.sleep(1000);
        }
        catch(e){
            console.log(e);
        }
    }
    
    //[485: 0x10]; setting time; 0x10; 年(后两位)、月、日、时、分、秒 int
     setTime(option = {'Y':20,'m':1,'d':15,'H':30,'i':30,'s':30},pre = function(){},after = function(){}){
        pre();
        var dataBody = Buffer.alloc(6);
        dataBody.writeUInt8(option.Y,0);
        dataBody.writeUInt8(option.m,1);
        dataBody.writeUInt8(option.d,2);
        dataBody.writeUInt8(option.H,3);
        dataBody.writeUInt8(option.i,4);
        dataBody.writeUInt8(option.s,5);
        var data = Buffer.concat([dataBody]);
        var ret = this.trans.encrype(0x10,data);
        this.send485(ret);
        after();
    }
    
    //[485: 0x12];  红绿灯(继电器)控制 1 一般 0 为红灯，1 为绿灯
    set_traffic_signal(signal = 0, pre = function(){},after = function(){}){
        pre();
        var dataBody = Buffer.alloc(1);
        dataBody.writeUInt8(signal,0);
        var data = Buffer.concat([dataBody]);
        var ret = this.trans.encrype(0x12,data);
        this.send485(ret);
        after();
    }
    
    //[485: 0x22];  语音播放指令; 字符串
    playVoiceStr(dataStr = '', pre = function(){},after = function(){}){
        pre();
        var dataBody = iconv.encode(dataStr,'gbk');
        var data = Buffer.concat([dataBody]);
        var ret = this.trans.encrype(0x22,data);
        this.send485(ret);
        after();
    }
    
    //[485: 0x22]; 语音播放指令; 录音; UINT8 参见附录附件一 显示屏驱动卡 语音目录
    playVoiceAttach(dataInt:number = 0, pre = function(){},after = function(){}){
        pre();
        var dataBody = Buffer.alloc(1);
        dataBody.writeUInt8(dataInt,0);
        var data = Buffer.concat([dataBody]);
        var ret = this.trans.encrype(0x22,data);
        this.send485(ret);
        after();
    }
    
    /*
         [485: 0x27] 显示 加载广告内容指令
         控制字 1：定义加载内容的行号，有效值 1-4，其他值无效，行号示意如下图示 控制字 2：定义加载内容的显示颜色，有效期 1-3，1=红色，2=绿色，3=黄色，其他值默认为 1。 控制字 3：保留
         具体参见文档
    */
    show_ad_content(dataStr = '',option = {'first':2,'second':30,'third':1,'fourth':0}, pre = function(){},after = function(){}){
        pre();
        var dataCtl = Buffer.alloc(4);
        dataCtl.writeUInt8(option.first,0);
        dataCtl.writeUInt8(option.second,1);
        dataCtl.writeUInt8(option.third,2);
        dataCtl.writeUInt8(option.fourth,3);
        var dataBody = iconv.encode(dataStr,'gbk');
        var data = Buffer.concat([dataCtl,dataBody]);
        var ret = this.trans.encrype(0x27,data);
        this.send485(ret);
        after();
    }

    //ivsresult
    ivsresult(isEnablePush = true,isImage = false,format = 'json', imageType = 0){
        this.trans.cmdSend(this.socket,'{ "cmd": "ivsresult", "id" : "123", "enable": '+isEnablePush+', "format": "'+format+'", "image": '+isImage+', "image_type": '+imageType+' }');
    }

    // getsn
    getsn(){
        this.trans.cmdSend(this.socket,'{ "cmd": "getsn", "id":"123456" }');
    }

    //getivsresult 
    getivsresult(){
        this.trans.cmdSend(this.socket,'{ "cmd" : "getivsresult", "image" : true, "format" : "json" }');
    }

    //get_image
    get_image(ivsresult_id:number){
        this.trans.cmdSend(this.socket,'{ "cmd": "get_image", "id": '+ivsresult_id+' }');
    }

    // HLK PART
    
}

export{Cmd};
// module.exports = Cmd;


