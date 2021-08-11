import {ASocketControl} from './ASocketControl';
import {Socket,SocketConnectOpts} from 'net';
import {hlkCmd} from './hlkCmd';
// import {Transcoder} from './base/Transcoder';
import {queue}   from 'async';
import {EventEmitter} from 'events';
class HlkControl extends ASocketControl{
    _socket:Socket;
    _queue:any;
    _data:Buffer;
    // _trans:Transcoder;
    _dataState:any;
    _cmd:hlkCmd;
    async:any;
    _event:EventEmitter;
    private static instance: HlkControl;
    constructor(options: SocketConnectOpts, connectionListener?: () => void){
        super();
        this._dataState = {
            header: Buffer.alloc(2),
            type: Buffer.alloc(1),
            flag: 0,
            dataLen:0
        };
        this._event = new EventEmitter();
        this._data= Buffer.alloc(0);
        this._socket = new Socket();
        this._cmd = new hlkCmd(this._socket);
        this._socket.connect(options,connectionListener);
        this._socket.on('end',function(){
            console.log('data end!');
        });
        this._socket.on('error',  (err) => {
            // console.log(err.message);
            console.log('socket error!');
            setTimeout(()=>{
                this._socket.connect(options,connectionListener);
            },3000);
            // this._socket.connect(options,connectionListener);
            // console.log('socket reconnect');
        });
        this.onDataConcat = this.onDataConcat.bind(this);
        this.onDataProc = this.onDataProc.bind(this);
        this._queue = queue(this.onDataProc, 1);
        this._socket.on('data',this.onDataConcat);
    }

    onDataConcat(chunk:Buffer){
        // console.log(chunk);
        // console.log(this._dataState);
        // console.log(chunk.readUInt16BE(0));
        if(this._dataState.flag === 0){
            if(this._data.length > 0){
                this._dataState.header = this._data.readUInt16BE(0);
                this._dataState.type = this._data.readUInt8(2);
                this._dataState.flag = 1;
                this._dataState.dataLen = this._data.readUInt32BE(4);
            }
            else{
                this._dataState.header = chunk.readUInt16BE(0);
                this._dataState.type = chunk.readUInt8(2);
                this._dataState.flag = 1;
                this._dataState.dataLen = chunk.readUInt32BE(4);
            }
        }

        if(this._dataState.header === 27302  && this._dataState.flag === 1){
            if(8+this._dataState.dataLen <= chunk.length){
                // console.log(this._queue);
                // return;
                this._queue.push(chunk.slice(0,8+this._dataState.dataLen));
                this._data = chunk.slice(8+this._dataState.dataLen,chunk.length);
                this._dataState.header = Buffer.alloc(2);
                // this._dataState.type =  Buffer.alloc(1);
                this._dataState.flag = 0;
                this._dataState.dataLen = 0;
            }
            else{
                this._data = Buffer.concat([this._data,chunk]);
                if(8+this._dataState.dataLen === this._data.length){
                    this._queue.push(this._data);
                    this._data = Buffer.alloc(0);
                    this._dataState.header = Buffer.alloc(2);
                    // this._dataState.type =  Buffer.alloc(1);
                    this._dataState.flag = 0;
                    this._dataState.dataLen = 0;
                }
                else if(8+this._dataState.dataLen < this._data.length){
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
        // console.log(data);
        this._event.emit('receive',data);
        if(err){
            err();
        }
    }

    // ,listening:(data:any)=>void
    async run(callback:(handle:hlkCmd)=>void,listening:(data:any)=>void){
        this._event.on('receive',listening);
        callback(this._cmd);
    }
}
export{HlkControl};