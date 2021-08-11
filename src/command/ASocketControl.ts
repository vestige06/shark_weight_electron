import {Socket,SocketConnectOpts} from 'net';

export abstract class ASocketControl{
    // connect(options:SocketConnectOpts, callback:Function){}
    onDataConcat(chunk:Buffer){}
    async onDataProc(data:any,completed:any){}
}
