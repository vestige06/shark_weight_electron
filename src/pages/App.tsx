import './App.css';
import {SquareBtn} from '../module/squareBtn';
import {RectangleBtn} from '../module/rectangleBtn';
import React,{ createElement, useRef } from 'react';
import {WeighingTemplate}  from '../model/WeighingTemplate';
import {WeighingRecord}  from '../model/WeighingRecord';
import {Car}  from '../model/Car';
import {Customer}  from '../model/Customer';
import {Goods}  from '../model/Goods';
import {Settings} from '../model/Settings';
import {Op} from 'sequelize';
import {MainLogic} from '../logic/MainLogic';
import {EventEmitter} from 'events';
import {HomeSheet} from '../module/HomeSheet';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import StyleIcon from '@material-ui/icons/Style';
import PublishIcon from '@material-ui/icons/Publish';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CreateIcon from '@material-ui/icons/Create';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ContactsIcon from '@material-ui/icons/Contacts';
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint,{useReactToPrint} from 'react-to-print';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
 

// const Latex = require('react-latex');

// import { LaTeXJSComponent } from "latex.js";

require("./App.css");
require("./table.css");
let { ipcRenderer,remote} = window.require('electron');
const mainProc = remote.require('./main');

interface AppState{
  isShow:boolean,
  data:any,
  count:number,
  isPreview:boolean,
  HomeSheetPrintComponent:any
}
enum Mode{
  left,
  right,
  none
};
class App extends React.Component<any,AppState>{
  _luckySheetEvent:EventEmitter;
  _MainLogicEvent:EventEmitter;
  Kh:any;
  Wz:any;
  HomeSheetRef:any;
  HomeSheetPrintRef:any;
  ReactToPrintRef:any;
  constructor(props:any) {
    super(props);
    this.state = {
        isShow: true,
        data:0,
        count:0,
        isPreview:false,
        HomeSheetPrintComponent:[]
    }
    this.HomeSheetPrintRef = React.createRef();
    this.printSheet = this.printSheet.bind(this);
    this.changeBtn=this.changeBtn.bind(this);
    this.refreshSheet=this.refreshSheet.bind(this);
    this.manualTriggerWeigh=this.manualTriggerWeigh.bind(this);
    this._luckySheetEvent = new EventEmitter();
    this._MainLogicEvent = new EventEmitter();
    this._luckySheetEvent.on('do-get-Kh',(Kh:any)=>{
      this.Kh = Kh.v.newValue;
    });
    this._luckySheetEvent.on('do-get-Wz',(Wz:any)=>{
      this.Wz = Wz.v.newValue;
    });
    this._luckySheetEvent.on('do-print-data',async ()=>{
      let data:any = this.HomeSheetRef.state.celldata;
      let tmp_data:any = await this.trans2dimension(data);
      let printComponent = 
      createElement(
        React.Fragment,
        {},
        [
          createElement(
            'table',
            {
              className:'formTable',
              ref:(el:any)=>this.HomeSheetPrintRef = el
            },
            [
            createElement(
              'tbody',
              {},
              tmp_data.map((item:any,key:any)=>{
                return createElement(
                  'tr',
                  {key:"tr"+item.r+"-"+key},
                  item.map((item2:any,key2:any)=>{
                  if(item2.v.hasOwnProperty('mc')){
                    if(item2.v.mc.hasOwnProperty('cs')){
                      if(item2.v.m.indexOf('_')>=0){
                        return  React.createElement(
                          'td',
                          {className:"td-r"+item2.r+"-c"+item2.c+" tb-td",key:item2.r+''+item2.c,colSpan:item2.v.mc.cs},
                          React.createElement(
                            'span',
                            {
                              className:'app_input',
                              type:'text',
                              'data-origin':item2.v.m,
                              onChange:function(){}
                            },
                            null
                          )
                        );
                      }
                      else{
                        return  React.createElement(
                          'td',
                          {className:"td-r"+item2.r+"-c"+item2.c+" HomeSheetTableThInput",key:item2.r+''+item2.c,colSpan:item2.v.mc.cs},
                          item2.v.m,
                        );
                      }
                    }
                    else{
                      return [];
                    }
                  }
                  else{
                      if(item2.v.m.indexOf('_')>=0){
                        return React.createElement(
                          'td',
                          {className:"td-r"+item2.r+"-c"+item2.c,key:item2.r+''+item2.c},
                          item2.v.newValue
                        );
                      }
                      else{
                        return React.createElement(
                          'td',
                          {className:"td-r"+item2.r+"-c"+item2.c,key:item2.r+''+item2.c},
                          item2.v.m
                        );
                      }
                  }
                  })
              )})
            ),
            ]
          ),
          createElement(
            'hr',
            {},
            null
          ),
          createElement(
            ReactToPrint,
            {
              copyStyles:false,
              pageStyle: "table { margin: auto; border-collapse: collapse; background-color: #fff; text-align: center; } .HomeSheetTableThInput { font-size: 42pt !important; font-weight: 600; } .bottom-btn{ margin-top: 20px; } table { margin: auto; border-collapse: collapse; background-color: #fff; text-align: center; } td{ border: 1px solid #000; padding: 5px 12px; font-size: 18px; white-space: nowrap; } td>span{ margin-left: 20px; font-weight: 600; padding: 15px; } hr{display:none;} button{display:none;}",
              trigger:()=><button>打印</button>,
              content:()=>this.HomeSheetPrintRef
            },
            null
          )
        ]

      )
      this.setState({HomeSheetPrintComponent:printComponent});
    });
  }

    async trans2dimension(arr:any=[]){
      let tmp:any[] = [];
      arr.map((row:any,index:any)=>{
        tmp[row.r] = new Array();
      });
      arr.map((row:any,index:any)=>{
        tmp[row.r][row.c] = row;
      });
      return tmp;
    }
  async componentWillMount(){
    await this.doWeighingInit();
  }

  async doWeighingInit(){
    let settings = await this.loadSettings();
    let mainLogic = new MainLogic(settings,this._MainLogicEvent,(data:any)=>{
      this.setState({data:data});
    },Mode.right,async (data)=>{
      this.onWeighingStable(data);
    },async (license)=>{
      let tmp_car:any = await this.getCarByPlateNo(license);
      let tmp_customer:any = await this.getCustomerByPlateNo(license);
      let tmp_goods:any = await this.getGoodsByPlateNo(license);
      let record = await this.getWeighingRecordByPlateNo(license);
      if(record !== null && record.Kh){
        this._luckySheetEvent.emit('set-Kh',record.Kh);
      }
      else{
        this._luckySheetEvent.emit('set-Kh',tmp_customer.hasOwnProperty('Name')?tmp_customer.Name:'');
      }
      if(record !== null && record.Wz){
        this._luckySheetEvent.emit('set-Wz',record.Wz);
      }
      else{
        this._luckySheetEvent.emit('set-Wz',tmp_goods.Type);
      }

      this._luckySheetEvent.emit('set-license',license);
      this._luckySheetEvent.emit('set-Bh',await this.getBh());
    });
    mainLogic.initMode();
  }

  async componentWillUpdate(){
    
  }

  async manualTriggerWeigh(event:any){
    let settings:any = await this.loadSettings();
    if(settings.isAutoWeighing.value == 2){
      this._MainLogicEvent.emit('manualTriggerWeigh');
      this._luckySheetEvent.emit('get-Kh');
      this._luckySheetEvent.emit('get-Wz');
    }
  }

  async loadSettings(){
    let tmp = new Array();
    let ret = await Settings.getInstance()._model.findAll({
      where:{
        UserId:1
      }
    });
    ret.forEach((item: any, index: any) => {
      tmp[item.key] = item;
    });
    return tmp;
  }

  async refreshSheet(){
    this.setState({count:this.state.count+1});
    await this.doWeighingInit();
    this._luckySheetEvent.emit('do-refresh');
  }
  
  getCalculateWeight(mz:any,pz:any,dst_type:any){
    if(mz.unit == 'T'){
      mz.number = ((mz.number)*1000);
    }
    if(pz.unit == 'T'){
      pz.number = (pz.number*1000);
    }
    if(dst_type == 'KG'){
      return {
        unit:'KG',
        mz:(mz.number),
        pz:(pz.number),
        jz:(mz.number - pz.number).toFixed(2)
      };
    }
    else if(dst_type == 'T'){
      return {
        unit:'T',
        mz:(mz.number/1000).toFixed(2),
        pz:(pz.number/1000).toFixed(2),
        jz:((mz.number - pz.number)/1000).toFixed(2)
      };
    }
    else{
      // throw('单位不正确');
      console.log('单位不正确,请前往配置');
      return null;
    }
}

  getTransformWeight(one:any){

  }
  
  async onWeighingStable(data:any){
    let final:any;
    let tmp_cal:any;
    let tmp_car:any = await this.getCarByPlateNo(data.license);
    // let tmp_customer:any = await this.getCustomerByPlateNo(data.license);
    // let tmp_goods:any = await this.getGoodsByPlateNo(data.license);
    let tmp_date = this.dateFormat("YYYY-mm-dd HH:MM:SS",new Date());
    let settings:any = await this.loadSettings();
    //First Weight Mode
    if(parseFloat(tmp_car.VehicleWeight) > 0){
      tmp_cal = this.getCalculateWeight({
        unit:settings.WeightUnit.value == 2?'T':'KG',
        number:parseFloat(data.stableData)
      },{
        unit:tmp_car.WeightUnit == 'KG'?'KG':'T',
        number:parseFloat(tmp_car.VehicleWeight)
      },settings.WeightUnit.value == 2?'T':'KG');
      this._luckySheetEvent.emit('set-Mz',tmp_cal.mz);
      this._luckySheetEvent.emit('set-Mzrq',tmp_date);
      this._luckySheetEvent.emit('set-Jz',tmp_cal.jz);
      // this._luckySheetEvent.emit('set-Jzrq',tmp_date);
      this._luckySheetEvent.emit('set-Pz',tmp_cal.pz);
      this._luckySheetEvent.emit('set-Pzrq',tmp_date);

      final = {
        AutoNo:null,
        Bh:await this.getBh(),
        Kh:this.Kh,
        Wz:this.Wz,
        Ch:data.license,
        Mz:tmp_cal.mz,
        Mzrq:tmp_date,
        Pz:tmp_cal.pz,
        Pzrq:tmp_date,
        Jz:tmp_cal.jz,
        Jzrq:tmp_date,
        WeighingTimes:1,
        IsFinish:1,
        Valid:1,
        WeightUnit:settings.WeightUnit.value == 1?'KG':'T'
      };
      await WeighingRecord.getInstance()._model.create(final);
      console.log(final);
    }
    //Second Weight Mode
    else{
      let record = await this.getWeighingRecordByPlateNo(data.license);
      if(record){
        //update
        if(parseFloat(data.stableData) > parseFloat(record.Mz)){
            let Pzrq = record.Mzrq;
            tmp_cal = this.getCalculateWeight({
              unit:settings.WeightUnit.value == 2?'T':'KG',
              number:parseFloat(data.stableData)
            },{
              unit:record.WeightUnit == 'KG'?'KG':'T',
              number:parseFloat(record.Mz)
            },settings.WeightUnit.value == 2?'T':'KG');
            this._luckySheetEvent.emit('set-Mz',tmp_cal.mz);
            this._luckySheetEvent.emit('set-Mzrq',tmp_date);
            this._luckySheetEvent.emit('set-Pz',tmp_cal.pz);
            this._luckySheetEvent.emit('set-Pzrq',Pzrq);
            this._luckySheetEvent.emit('set-Jz',tmp_cal.jz);
            this._luckySheetEvent.emit('set-Jzrq',tmp_date);
            // this._luckySheetEvent.emit('set-Kh',tmp_customer.hasOwnProperty('Name')?tmp_customer.Name:'');
            // this._luckySheetEvent.emit('set-Wz',tmp_goods.Type);
            final = {
              Kh:this.Kh,
              Wz:this.Wz,
              Ch:data.license,
              Mz:tmp_cal.mz,
              Mzrq:tmp_date,
              Pz:tmp_cal.pz,
              Pzrq:Pzrq,
              Jz:tmp_cal.jz,
              Jzrq:tmp_date,
              WeighingTimes:2,
              IsFinish:1,
              Valid:1,
              WeightUnit:settings.WeightUnit.value == 1?'KG':'T'
            };
            await WeighingRecord.getInstance()._model.update(final,{
              where:{
                Bh: record.Bh
              }
            });
            console.log(final);
        }
        else{
            tmp_cal = this.getCalculateWeight({
              unit:record.WeightUnit == 'KG'?'KG':'T',
              number:parseFloat(record.Mz)
            },{
              unit:settings.WeightUnit.value == 2?'T':'KG',
              number:parseFloat(data.stableData)
            },settings.WeightUnit.value == 2?'T':'KG');
            this._luckySheetEvent.emit('set-Mz',tmp_cal.mz);
            this._luckySheetEvent.emit('set-Mzrq',record.Mzrq);
            this._luckySheetEvent.emit('set-Pz',tmp_cal.pz);
            this._luckySheetEvent.emit('set-Pzrq',tmp_date);
            this._luckySheetEvent.emit('set-Jz',tmp_cal.jz);
            this._luckySheetEvent.emit('set-Jzrq',tmp_date);
            // this._luckySheetEvent.emit('set-Kh',tmp_customer.hasOwnProperty('Name')?tmp_customer.Name:'');
            // this._luckySheetEvent.emit('set-Wz',tmp_goods.Type);
            final = {
              Kh:this.Kh,
              Wz:this.Wz,
              Ch:data.license,
              Mz:tmp_cal.mz,
              Mzrq:record.Mzrq,
              Pz:tmp_cal.pz,
              Pzrq:tmp_date,
              Jz:tmp_cal.jz,
              Jzrq:tmp_date,
              WeighingTimes:2,
              IsFinish:1,
              Valid:1,
              WeightUnit:settings.WeightUnit.value == 1?'KG':'T'
            };
            await WeighingRecord.getInstance()._model.update(final,{
              where:{
                Bh: record.Bh
              }
            });
            console.log(final);
        }
      }
      else{
        this._luckySheetEvent.emit('set-Mz',parseFloat(data.stableData).toFixed(2));
        this._luckySheetEvent.emit('set-Mzrq',tmp_date);
        // this._luckySheetEvent.emit('set-Kh',tmp_customer.hasOwnProperty('Name')?tmp_customer.Name:'');
        // this._luckySheetEvent.emit('set-Wz',tmp_goods.Type);
        final = {
          AutoNo:null,
          Bh:await this.getBh(),
          Kh:this.Kh,
          Wz:this.Wz,
          Ch:data.license,
          Mz:parseFloat(data.stableData).toFixed(2),
          Mzrq:tmp_date,
          WeighingTimes:1,
          IsFinish:0,
          Valid:1,
          WeightUnit:settings.WeightUnit.value == 1?'KG':'T'
        };
        console.log(final);
        await WeighingRecord.getInstance()._model.create(final);
      }
    }
  }

  async getCarByPlateNo(license:string){
    let ret = await Car.getInstance()._model.findOne({
      where:{
        PlateNo: license
      }
    });
    return ret?ret:{};
  }

  async getGoodsByPlateNo(license:string){
    let sql = "select g.* from Car as c left join ICCard as ic on c.AutoNo = ic.CarAutoNo left join Goods as g on ic.GoodsId = g.Id where c.PlateNo = '"+license+"'";
    let [ret] = await Customer.getInstance()._ins.query(sql);
    return ret.length>0?ret[0]:{Type:''};
  }
  
  async getCustomerByPlateNo(license:string){
    let sql = "select Cu.* from Car as c left join ICCard as ic on c.AutoNo = ic.CarAutoNo left join Customer as Cu on ic.CustomerId = Cu.Id where c.PlateNo = '"+license+"'";
    let [ret] = await Customer.getInstance()._ins.query(sql);
    return ret.length>0?ret[0]:{Name:''};
  }

  async getWeighingRecordByPlateNo(license:string){
    let ret = await WeighingRecord.getInstance()._model.findOne({
      where:{
        'Ch':license,
        'IsFinish':0
      }
    });
    if(ret){
      return ret;
    }
    else{
      return null;
    }
  }

  async whichDataWeight(license:string){
    let ret = await WeighingRecord.getInstance()._model.findOne({
      where:{
        'Ch':license,
        'isFinish':0
      }
    });
    if(ret){
      return 2;
    }
    else{
      return 1;
    }
  }
  
  async getBh(){
    // this.dateFormat("YYYYMMdd",new Date())+this.PrefixInteger(1,4)
    let tmp_date  = this.dateFormat("YYYYmmdd",new Date());
    const ret = await WeighingRecord.getInstance()._model.findOne({
      where:{
        Bh:{
          [Op.like]:'%%'+tmp_date+'%%'
        }
      },
      order:[
        ['AutoNo', 'DESC'],
      ]
    });
    if(ret){
      const ret2 = await WeighingRecord.getInstance()._model.findOne({
        where:{
          Bh:ret.Bh,
          IsFinish:1
        }
      });
      if(ret2){
        let number = parseInt(ret.Bh.substring(ret.Bh.indexOf(tmp_date)+tmp_date.length,ret.Bh.length))+1;
        return tmp_date+this.PrefixInteger(number,4);
      }
      else{
        let number = parseInt(ret.Bh.substring(ret.Bh.indexOf(tmp_date)+tmp_date.length,ret.Bh.length));
        return tmp_date+this.PrefixInteger(number,4);
      }
    }
    else{
      return tmp_date+this.PrefixInteger(1,4);
    }
  }

  async getWeighingTimes(){
    let ret = await Settings.getInstance()._model.findOne({
      where:{
        key: 'weighingMode'
      }
    });
    return ret.value;
  }

changeBtn() {
  if(this.state.isShow === true){
    this.setState({
      isShow: false
    });
  }
  else{
    this.setState({
      isShow: true
    });
  }
}

openTemplateSetting() {
  try {
      mainProc.createWindow({
          url: process.env.NODE_ENV === 'production' ? '/#/TemplateSetting' : 'http://localhost:3000/#/TemplateSetting',
          protocal: process.env.NODE_ENV === 'production' ? 'FILE' : 'URL',
          isDevTools: true
      });
  }
  catch (e) {
      console.log(e);
  }
}

dateFormat(fmt:any, date:any) {
  let ret;
  let opt:any = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}

PrefixInteger(num:any, n:any) {
  return (Array(n).join('0') + num).slice(-n);
}

async componentDidMount(){
	ipcRenderer.on('sendMain',(e:string,msg1:any,msg2:any) => {
      // this.setState({msg1:msg1,msg2:msg2});
  });
  // WeighingRecord.getInstance()._model.create({
  //   AutoNo:null,
  //   Mz:NaN,
  //   Jz:NaN,
  //   Pz:NaN
  // });
  /*
  let tmp_car:any = await this.getCarByPlateNo('蒙A25021');
  let tmp_customer:any = await this.getCustomerByPlateNo('蒙A25021');
  let tmp_goods:any = await this.getGoodsByPlateNo('蒙A25021');
  console.log(tmp_car.VehicleWeight,tmp_customer,tmp_goods);
  */


}

beforeChange(){
  var show = '';
  var show2 = "";
  if (this.state.isShow == true){
    show = "on";
    show2 = "off";
  }else{
    show = 'off';
    show2 = "on";
  }
  return {
    show:show,
    show2:show2
  };
}

async getWeighingTemplate(ctx:any,sheets:any[] = []){
  if(sheets.length === 0){
    let ret = await WeighingTemplate.getInstance()._model.findOne({
      where:{
          tag: 'current'
      }
    });
    let celldata = JSON.parse(ret.sheets)[0].celldata;
    celldata.map((item:any,key:any)=>{
      let tmp_item = item;
      tmp_item.v.newValue = '';
      return tmp_item;
    });
    ctx.setState({
      celldata:celldata,
      data:JSON.parse(ret.sheets)[0].data
    });
  }
  else{
    await ctx.setState({sheets:sheets});
  }
}

async getPresetChRecord(){
  let ret = await Car.getInstance()._model.findAll({attributes: ['PlateNo'],raw : true});
  return ret;
}

async getPresetWzRecord(){
  let ret = await Goods.getInstance()._model.findAll({attributes: ['Type'],raw : true});
  return ret;
}

async getPresetKhRecord(){
  let ret = await Customer.getInstance()._model.findAll({attributes: ['Name'],raw : true});
  return ret;
}

// 跳转到称重记录
goRecord(){

  window.open('/#/WeightRecord');
}
goData(){
  window.open('/#/DataManage');
}
goSetting(){
  window.open('/#/SystemSettings');
}

printSheet(){
  this._luckySheetEvent.emit('do-print-data');
  this.setState({isPreview:true});
  // remote.getCurrentWebContents().print();
  // this.ReactToPrintRef.triggerPrint(this.HomeSheetRef);
  //window.print();
}

  render(){
    // var display ="display:"+ this.state.isShow===true?'none':'block'
    var showObj = this.beforeChange();
    var window: Window & any
    return (
      <div className="App">
        {/* 第一页 */}
        {/* 最上面：显示称重+称重记录按扭+数据管理按钮+系统设置按钮 */}
        <div className='top'>
          <div className='showWeight'>{this.state.data}</div>
          <div className='icons'>
            <span onClick={this.goRecord}><SquareBtn icon='1' feature='称重记录'/></span>
            <span onClick={this.goData}><SquareBtn icon='2' feature='数据管理'/></span>
            <span onClick={this.goSetting}><SquareBtn icon='3' feature='系统设置'/></span>
          </div>
        </div>
        {/* 中间：表单的显示框框 */}
        <div className='showForm' >
        <HomeSheet ref={(el:any) => (this.HomeSheetRef = el)} loadSettings={this.loadSettings} getWeighingTemplate={this.getWeighingTemplate} _luckySheetEvent={this._luckySheetEvent} getPresetChRecord={this.getPresetChRecord} getPresetWzRecord={this.getPresetWzRecord} getPresetKhRecord={this.getPresetKhRecord}/>
        </div>
        <Dialog onClose={()=>this.setState({isPreview:false})} aria-labelledby="customized-dialog-title" open={this.state.isPreview}>
          <MuiDialogTitle id="customized-dialog-title" >
            打印预览
          </MuiDialogTitle>
          <MuiDialogContent ref={(el:any) => this.HomeSheetPrintRef = el} style={{width:'100%'}} dividers>
            <React.Fragment >
                  {this.state.HomeSheetPrintComponent}
            </React.Fragment>
          </MuiDialogContent>
          <MuiDialogActions>

          </MuiDialogActions>
        </Dialog>
        {/* 表单下面：两个按钮<==>称重按钮 */}
        <div className='reBtn'>
          <div className="on" onClick={this.manualTriggerWeigh}>
            <RectangleBtn way=' 称  重 '/>
          </div>
        </div>
        {/* 最下面一排的右下角的小按钮 */}
        <div className='btns'>
          <div>
            {/* <span className='alt1' onClick={this.changeBtn}><RepeatOneIcon /><a className='altTips altTips1'>切换称重</a></span> */}
            <span className='alt2' onClick={this.openTemplateSetting}><StyleIcon /><a className='altTips altTips2'>切换过磅单样式</a></span>
            <span className='alt3' ><PublishIcon /><a className='altTips altTips3'>手动抬杆</a></span>
            <span className='alt4' onClick={this.refreshSheet}><AutorenewIcon /><a className='altTips altTips4'>手动刷新过磅单</a></span>
            <span className='alt5'><CreateIcon /><a className='altTips altTips5'>快速输入车牌</a></span>
            <span className='alt6' onClick={this.printSheet}><LiveHelpIcon /><a className='altTips altTips6'>关于软件</a></span>
            <span className='alt7'><ContactsIcon /><a className='altTips altTips7'>切换用户</a></span>
            <span className='alt7' onClick={this.printSheet}><PrintIcon /><a className='altTips altTips7'>打印</a></span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

