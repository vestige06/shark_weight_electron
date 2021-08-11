import {ASocketControl} from './ASocketControl';
import {Socket,SocketConnectOpts} from 'net';
import {Cmd} from './cmd';
import {Transcoder} from './base/Transcoder';
import {queue}   from 'async';
import {EventEmitter} from 'events';
class SocketControl extends ASocketControl{
    _socket:Socket;
    _queue:any;
    _data:Buffer;
    _trans:Transcoder;
    _dataState:any;
    _cmd:Cmd;
    async:any;
    _event:EventEmitter;
    private static instance: SocketControl;
    constructor(options: SocketConnectOpts, connectionListener?: () => void){
        super();
        this._dataState = {
            header: Buffer.alloc(2),
            type: Buffer.alloc(1),
            flag: 0,
            dataLen:0
        };
        this._event = new EventEmitter();
        // this._event.on('receive',this.receive);
        this._data= Buffer.alloc(0);
        this._trans = new Transcoder();
        this._socket = new Socket();
        this._cmd = new Cmd(this._socket,this._trans);
        this._socket.connect(options,connectionListener);
        // this.connect(options,callback);
        this._socket.on('end',function(){
            console.log('data end!');
        });
        this._socket.on('error',  () => {
            console.log('socket error!');
            this._socket.connect(options,connectionListener);
        });
        this.onDataConcat = this.onDataConcat.bind(this);
        this.onDataProc = this.onDataProc.bind(this);
        this._queue = queue(this.onDataProc, 1);
        this._socket.on('data',this.onDataConcat);
    }

    onDataConcat(chunk:Buffer){
        if(this._dataState.flag === 0){
            if(this._data.length > 0){
                this._dataState.header = this._data.readUInt16BE(0);
                this._dataState.type = this._data.readUInt8(2);
                this._dataState.flag = 1;
                this._dataState.dataLen = this._data.readUInt32BE(4);
                // console.log(this._dataState.dataLen);
            }
            else{
                this._dataState.header = chunk.readUInt16BE(0);
                this._dataState.type = chunk.readUInt8(2);
                this._dataState.flag = 1;
                this._dataState.dataLen = chunk.readUInt32BE(4);
                // console.log(this._dataState.dataLen);
            }
        }
        if(this._dataState.header === 22106 && this._dataState.type === 1 && this._dataState.flag === 1){
          this._data = this._data.slice(0,8+this._dataState.dataLen);
          this._dataState.header = Buffer.alloc(2);
            this._dataState.type =  Buffer.alloc(1);
            this._dataState.flag = 0;
            this._dataState.dataLen = 0;
        }
        else if(this._dataState.header === 22106 && this._dataState.type === 0 && this._dataState.flag === 1){
            // console.log(8+this._dataState.dataLen);
            if(8+this._dataState.dataLen <= chunk.length){
                this._queue.push(chunk.slice(0,8+this._dataState.dataLen));
                this._data = chunk.slice(8+this._dataState.dataLen,chunk.length);
                this._dataState.header = Buffer.alloc(2);
                this._dataState.type =  Buffer.alloc(1);
                this._dataState.flag = 0;
                this._dataState.dataLen = 0;
            }
            else{
                this._data = Buffer.concat([this._data,chunk]);
                console.log(8+this._dataState.dataLen+"======="+this._data.length);

                if(8+this._dataState.dataLen === this._data.length){
                    this._queue.push(this._data);
                    this._data = Buffer.alloc(0);
                    this._dataState.header = Buffer.alloc(2);
                    this._dataState.type =  Buffer.alloc(1);
                    this._dataState.flag = 0;
                    this._dataState.dataLen = 0;
                }
                else if(8+this._dataState.dataLen < this._data.length){
                    // retry it 
                    this._data = Buffer.alloc(0);
                    this._dataState.header = Buffer.alloc(2);
                    this._dataState.type =  Buffer.alloc(1);
                    this._dataState.flag = 0;
                    this._dataState.dataLen = 0;
                }
                else{
                    console.log('zzz');
                }
            }
        }
        else{
        }
    }
    
    async onDataProc(data:any,err:any){
        this._trans.iterateTcpPack(data,(item:any)=>{
            this._event.emit('receive',item);
            // this.receive = this.receive.bind(item);
            // console.log(item);
            // if(item.bodyFullImg){
            //     require('fs').writeFile('img.jpg',item.bodyFullImg,(err:any)=>{
                    
            //     });
            // }
        });
        if(err){
            err();
        }
    }
    async run(callback:(handle:Cmd)=>void,listening:(data:any)=>void){
        this._event.on('receive',listening);
        callback(this._cmd);
    }
}
export{SocketControl};