import {SocketControl} from '../command/SocketControl';
import {HlkControl} from '../command/HlkControl';
import {EventEmitter} from 'events';
import {Settings} from '../model/Settings';
import Worker from  "../worker/WeightSerial.worker";
var SerialPort = window.require('serialport');
enum Mode{
  left,
  right,
  none
};
class MainLogic{
    _zsHandle:SocketControl;
    _hlkHandle:HlkControl;
    _event:EventEmitter;
    _worker:Worker;
    _serialPort:any;
    _mode:Mode;
    _MainLogicEvent:EventEmitter;
    data:number;
    isStable:boolean;
    isRecognize:boolean;
    isFinishedFirst:boolean;
    stableData:any;
    license:any;
    isSame:any;
    settings:any;

    constructor(settings:any,_MainLogicEvent:EventEmitter,getWeighing:(data:any)=>void,mode:Mode=Mode.left,isSame:(data:any)=>void,license:(license:string)=>void){
        this.isFinishedFirst = false;
        this.isRecognize = false;
        this.isStable = false;
        this.stableData = 0;
        this.data = 0;
        this._event = new EventEmitter();
        this._MainLogicEvent = _MainLogicEvent;
        this._worker = new Worker();
        this._mode = mode;
        this.settings = settings;
        this._worker.onerror = (event:any)=>{
          console.log(event);
          this._worker = new Worker();
        };
        this._event.on('getSetStateData',getWeighing);
        this.isSame = isSame;
        this._event.on('getTriggerLicense',license);
        this._event.on('setLicense',(license)=>{
          this.license = license;
        });
        this._zsHandle = new SocketControl({
            host : '14.10.25.16',
            port : 8131
          },()=>{});
        this._hlkHandle = new HlkControl({
            host : '14.10.25.203',
            port : 8080
          },()=>{});
        this._serialPort = new SerialPort('COM1', {
            baudRate : 9600,
            autoOpen:false
        });
        this._serialPort.open(function (err:string) {});
        this._serialPort.on('data',(data:Buffer) => {
            let tmpData = new Uint8Array(data);
            this._worker.postMessage({
              cmd:'getWeighing',
              data: tmpData
            },[tmpData.buffer]);
            this._worker.onmessage = (event:any)=>{
              let tmpBuf = event.data.data;
              if(this.settings.isAutoWeighing.value == 1){
                if(event.data.cmd === 'getWeighing'){
                  this.serialProc(tmpBuf);
                  this.data = tmpBuf;
                  this._event.emit('getSetStateData',this.data);
                }
                else if(event.data.cmd === 'isSame'){
                  if(event.data.isStable === true){
                    this.isStable = true;
                    this.stableData = event.data.data;
                    this._event.emit('getSetStateStableAndStableData',{
                      isStable:this.isStable,
                      stableData:this.stableData,
                      license:this.license
                    });
                  }
                }
              }
              else if(this.settings.isAutoWeighing.value == 2){
                if(event.data.cmd === 'getWeighing'){
                  this.serialProc(tmpBuf);
                  this.data = tmpBuf;
                  this._event.emit('getSetStateData',this.data);
                }
              }
            }
        });

        this._MainLogicEvent.on('manualTriggerWeigh',()=>{
          this.isStable = true;
          this.stableData = this.data;
          this._event.emit('getSetStateStableAndStableData',{
            isStable:this.isStable,
            stableData:this.stableData,
            license:this.license
          });
        });
    }

    serialProc(data:any){
        if(data > parseFloat(this.settings.minWeight.value)){
            this._event.emit('trigger-close-left-light');
            this._event.emit('trigger-close-right-light');
        }
        else if(data < parseFloat(this.settings.minWeight.value)){
            this._event.emit('trigger-open-left-light');
            this._event.emit('trigger-open-right-light');
        }
          
        if(this.isRecognize === true){
            if(data > parseFloat(this.settings.minWeight.value)){
              if(this._mode === Mode.left){
                this._event.emit('trigger-close-left-switch');
              }
              else if(this._mode === Mode.right){
                this._event.emit('trigger-close-right-switch');
              }
             
              this._worker.postMessage({
                cmd: 'isSame'
              });
              if(this.isStable === true){
                if(this._mode === Mode.left){
                  this._event.emit('trigger-open-right-switch');
                }
                else if(this._mode === Mode.right){
                  this._event.emit('trigger-open-left-switch');
                }
                
                this.isFinishedFirst = true;
                // this.setState({stableData:this.stableData,isFinishedFirst:true});
              }
            }
            else if(data < parseFloat(this.settings.minWeight.value)){
              if(this.isFinishedFirst === true){
                if(this._mode === Mode.left){
                  this._event.emit('trigger-close-right-switch');
                }
                else if(this._mode === Mode.right){
                  this._event.emit('trigger-close-left-switch');
                }
                this.isFinishedFirst = false;
                this.isStable = false;
                this.isRecognize = false;
                // this.setState({isFinishedFirst:false,isStable:false,isRecognize:false});
              }
            }
        }
    }
    
    initMode(){
        this._hlkHandle.run((handle) => {
          handle.closeLeftSwitch();
          handle.closeRightSwitch();
          handle.openLeftLight();
          handle.openRightLight();
        },(data)=>{});
        if(this._mode === Mode.left){
          this._event.on('trigger-close-left-light',()=>{
            this._hlkHandle.run((handle) => { handle.closeLeftLight();},(data)=>{});
          });
          this._event.on('trigger-close-right-light',()=>{
              this._hlkHandle.run((handle) => { handle.closeRightLight();},(data)=>{});
          });
        
          this._event.on('trigger-open-left-light',()=>{
              this._hlkHandle.run((handle) => { handle.openLeftLight();},(data)=>{});
          });
          this._event.on('trigger-open-right-light',()=>{
              this._hlkHandle.run((handle) => { handle.openRightLight();},(data)=>{});
          });
        }
        else if(this._mode === Mode.right){
          this._event.on('trigger-close-right-light',()=>{
            this._hlkHandle.run((handle) => { handle.closeRightLight();},(data)=>{});
          });
          this._event.on('trigger-close-left-light',()=>{
              this._hlkHandle.run((handle) => { handle.closeLeftLight();},(data)=>{});
          });
        
          this._event.on('trigger-open-right-light',()=>{
              this._hlkHandle.run((handle) => { handle.openRightLight();},(data)=>{});
          });
          this._event.on('trigger-open-left-light',()=>{
              this._hlkHandle.run((handle) => { handle.openLeftLight();},(data)=>{});
          });
        }
        
        this._zsHandle.run((handle)=>{
          handle.sendKeepAlive();
          handle.ivsresult(true,true);
          // handle.getivsresult();
          // console.log();
        },(data)=>{
          if(data.license === '赣A25025'){
            this._event.once('getSetStateStableAndStableData',this.isSame);
            this.isRecognize = true;
            this._event.emit('getTriggerLicense',data.license);
            this._event.emit('setLicense',data.license);
            if(this._mode === Mode.left){
              this._hlkHandle.run((handle) => {
                handle.openLeftSwitch();
              },(data)=>{});
              let delayForceClose  = setTimeout(()=>{this._hlkHandle.run((handle) => { handle.closeLeftSwitch();},(data)=>{})},60000);
              this._event.on('trigger-close-left-switch',()=>{
                  this._hlkHandle.run((handle) => { handle.closeLeftSwitch();},(data)=>{});
                clearTimeout(delayForceClose);
              });
              this._event.on('trigger-open-right-switch',()=>{
                  this._hlkHandle.run((handle) => { handle.openRightSwitch();},(data)=>{});
              });
              this._event.on('trigger-close-right-switch',()=>{
                  this._hlkHandle.run((handle) => { handle.closeRightSwitch();},(data)=>{});
              });
            }
            else if(this._mode === Mode.right){
              this._hlkHandle.run((handle) => {
                handle.openRightSwitch();
              },(data)=>{});
              let delayForceClose  = setTimeout(()=>{this._hlkHandle.run((handle) => { handle.closeRightSwitch();},(data)=>{})},60000);
              this._event.on('trigger-close-right-switch',()=>{
                  this._hlkHandle.run((handle) => { handle.closeRightSwitch();},(data)=>{});
                  clearTimeout(delayForceClose);
              });
              this._event.on('trigger-open-left-switch',()=>{
                  this._hlkHandle.run((handle) => { handle.openLeftSwitch();},(data)=>{});
              });
              this._event.on('trigger-close-left-switch',()=>{
                  this._hlkHandle.run((handle) => { handle.closeLeftSwitch();},(data)=>{});
              });
            }
            
          }
        });
    }
}
export {MainLogic};
