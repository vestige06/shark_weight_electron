import React,{Fragment,ReactNode,createRef  } from 'react';
import './HomeSheet.css';
import {WeighingTemplate}  from '../model/WeighingTemplate';
import {Op} from 'sequelize';
import {Car} from '../model/Car';
// const LuckyExcel = window.require('luckyexcel');
// import {$} from 'jquery';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SelectFuzzy from './SelectFuzzy';
require('../pages/table.css');
interface HomeSheetState{
  celldata:any;
  data:any;
  component:any;
  settings:any;
  readOnlyComponent:any;
}
class BaseHomeSheet extends React.Component<any,HomeSheetState>{
    state:HomeSheetState;
    StyledTableCell:any;
    StyledTableRow:any;
    rows:any;
    wrap:any;
    printRef:any;
    // settings:any;
    public constructor(props:any){
        super(props);
        this.state = {
          celldata:[],
          data:[],
          component:[],
          settings:{},
          readOnlyComponent:{}
        }
      // Event Register
      this.props._luckySheetEvent.on('set-header',(data:any)=>{
        this.changeCode();
      });
      this.props._luckySheetEvent.on('set-license',async (license:string)=>{
        this.setValue('_ch',license);
        
      });

      this.props._luckySheetEvent.on('set-Bh', async (Bh:any)=>{
        this.setValue('_bh',Bh);
      });

      this.props._luckySheetEvent.on('set-Mz',(Mz:any)=>{
        this.setValue('_mz',Mz);
      });

      this.props._luckySheetEvent.on('set-Mzrq',(Mzrq:any)=>{
        this.setValue('_mzrq',Mzrq);
      });

      this.props._luckySheetEvent.on('set-Pz',(Pz:any)=>{
        this.setValue('_pz',Pz);
      });

      this.props._luckySheetEvent.on('set-Pzrq',(Pzrq:any)=>{
        this.setValue('_pzrq',Pzrq);
      });

      this.props._luckySheetEvent.on('set-Wz',(Wz:any)=>{
        this.setValue('_wz',Wz);
      });

      this.props._luckySheetEvent.on('set-Kh',(Kh:any)=>{
        this.setValue('_kh',Kh);
      });

      this.props._luckySheetEvent.on('set-Jz',(Zj:any)=>{
        this.setValue('_jz',Zj);
      });

      this.props._luckySheetEvent.on('get-Kh',async ()=>{
        this.props._luckySheetEvent.emit('do-get-Kh',await this.getValue('_kh'));
      });

      this.props._luckySheetEvent.on('get-Wz',async ()=>{
        this.props._luckySheetEvent.emit('do-get-Wz',await this.getValue('_wz'));
      });

      this.props._luckySheetEvent.on('do-refresh',async ()=>{
        this.setState({settings:await this.props.loadSettings()});
        await this.props.getWeighingTemplate(this,[]);
        await this.dataProc();
        // console.log(this.state.celldata);
        console.log('refresh');
      });
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.onChangeAutoCompleteHandler = this.onChangeAutoCompleteHandler.bind(this);
    }

    async getFuzzyPlateNo(license:string){
      let ret = await Car.getInstance()._model.findAll({
        where:{
          PlateNo:{
            [Op.like]:'%%'+license+'%%'
          }
        }
      });
      return ret;
    }
    
    onChangeHandler(event:any){
      if(event.target.getAttribute('data-origin') === '_bh'){
        event.preventDefault();
      }
      else{
        if(this.state.settings.isAutoWeighing.value == 1){
            event.preventDefault();
        }
        else if(this.state.settings.isAutoWeighing.value == 2){
          let tmp_origindata = event.target.getAttribute('data-origin');
          if(tmp_origindata === '_mzrq' || tmp_origindata === '_pzrq'){
            event.preventDefault();
          }
          else{
            if(tmp_origindata === '_ch'){
                  console.log(event.target.getAttribute('data-origin'),event.nativeEvent.target.value);
            }
            else if(tmp_origindata === '_kh'){
              this.setValue(event.target.getAttribute('data-origin'),event.nativeEvent.target.value);
            }
            else if(tmp_origindata === '_wz'){
              this.setValue(event.target.getAttribute('data-origin'),event.nativeEvent.target.value);
            }
            else{
              this.setValue(event.target.getAttribute('data-origin'),event.nativeEvent.target.value);
            }
          }
        }
      }
    }

    onChangeAutoCompleteHandler(dataOrigin:any,newValue:any){
      if(newValue !== null){
        if(dataOrigin === '_ch'){
            this.setValue(dataOrigin,newValue.PlateNo);
        }
        else if(dataOrigin === '_kh'){
          this.setValue(dataOrigin,newValue.Name);
        }
        else if(dataOrigin === '_wz'){
          this.setValue(dataOrigin,newValue.Type);
        }
      }
      else{
        if(dataOrigin === '_ch'){
            this.setValue(dataOrigin,'');
        }
        else if(dataOrigin === '_kh'){
          this.setValue(dataOrigin,'');
        }
        else if(dataOrigin === '_wz'){
          this.setValue(dataOrigin,'');
        }
      }
      console.log(this.state.celldata);
    } 


    async setValue(key:string,newValue:any){
      if(this.state.celldata.length > 0){
        const celldata = [...this.state.celldata];
        this.setState({
          celldata:celldata.map((item,index)=>{
              if(item.v.m === key){
                let editItem = item;
                editItem.v.newValue = newValue;
                return editItem;
              }
              else{
                return item;
              }
          })
        });
        await this.dataProc();
      }
    }

    async getValue(key:any){
      let tmp_item = {};
      if(this.state.celldata.length > 0){
        const celldata = [...this.state.celldata];
        celldata.forEach((item,index)=>{
            if(item.v.m === key){
              tmp_item = item;
            }
        });
      }
      return tmp_item;
    }

    async componentDidMount(){
        this.setState({settings:await this.props.loadSettings()});
        await this.props.getWeighingTemplate(this,[]);
        // this.rows = [
        //   this.createData('编号','','车号','','客户',''),
        //   this.createData('毛重','','毛重日期','','物资',''),
        //   this.createData('皮重','','皮重日期','','净重',''),
        //   this.createData('备注','','','','',''),
        // ];
        await this.dataProc();
    }
// new Array().map
    async dataProc(){
      let handleChResult = await this.props.getPresetChRecord();
      let handleKhResult = await this.props.getPresetKhRecord();
      let handleWzResult = await this.props.getPresetWzRecord();

      if(this.state.celldata){
        let tmp:any = [];
        let procArr = await this.trans2dimension(this.state.celldata);
        let component = procArr.map<ReactNode>((item:any,index:any) => {
          return React.createElement(
            'tr',
            {key:"tr"+item.r+"-"+index},
            item.map((item2:any,index2:any)=>{
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
                      React.createElement('input',{
                        className:'app_input',
                        value:item2.v.m,
                        onChange:function(){}
                      },null)
                    );
                  }
                }
                else{
                  return [];
                }
              }
              else{
                if(item2.v.m.indexOf('_')>=0){
                  if(item2.v.m === '_mz' || item2.v.m === '_pz' || item2.v.m === '_jz'){
                    return React.createElement(
                      'td',
                      {className:"td-r"+item2.r+"-c"+item2.c+" tb-td",key:item2.r+''+item2.c},
                      [
                        React.createElement(
                          'input',
                          {
                            type:'text',
                            disabled:true,
                            className:'app_input',
                            'data-origin':item2.v.m,
                            value:item2.v.newValue,
                            onChange:this.onChangeHandler
                          },
                          null
                        ),
                        React.createElement('span',null,this.state.settings.WeightUnit.value==1?'KG':'T')
                      ]
                      
                    );
                  }
                  else if(this.state.settings.isAutoWeighing.value == 2){
                    if(item2.v.m === '_ch' || item2.v.m === '_kh' || item2.v.m === '_wz'){
                      let tmp_origindata = item2.v.m;
                      let handleResult = [];
                      let tmp_selected = {};
                      if(tmp_origindata === '_ch'){
                        handleResult = handleChResult;
                        tmp_selected = {PlateNo:item2.v.newValue};
                      }
                      else if(tmp_origindata === '_kh'){
                        handleResult = handleKhResult;
                        tmp_selected = {Name:item2.v.newValue};
                      }
                      else if(tmp_origindata === '_wz'){
                        handleResult = handleWzResult;
                        tmp_selected = {Type:item2.v.newValue};
                      }
  
                      return React.createElement(
                        'td',
                        {className:"td-r"+item2.r+"-c"+item2.c+" tb-td",key:item2.r+''+item2.c},
                        React.createElement(
                          SelectFuzzy,
                          {
                            options: handleResult,
                            type:tmp_origindata,
                            // type:'text',
                            className:'app_input',
                            'data-origin':item2.v.m,
                            value:tmp_selected,
                            // defaultValue:item2.v.newValue,
                            onChange:this.onChangeAutoCompleteHandler
                          },
                          null
                        )
                      );
                    }
                    else{
                      return React.createElement(
                        'td',
                        {className:"td-r"+item2.r+"-c"+item2.c+" tb-td",key:item2.r+''+item2.c},
                        React.createElement(
                          'input',
                          {
                            type:'text',
                            className:'app_input',
                            'data-origin':item2.v.m,
                            value:item2.v.newValue,
                            onChange:this.onChangeHandler
                          },
                          null
                        )
                      );
                    }
                  }
                  else{
                    return React.createElement(
                      'td',
                      {className:"td-r"+item2.r+"-c"+item2.c+" tb-td",key:item2.r+''+item2.c},
                      React.createElement(
                        'input',
                        {
                          type:'text',
                          className:'app_input',
                          'data-origin':item2.v.m,
                          value:item2.v.newValue,
                          onChange:this.onChangeHandler
                        },
                        null
                      )
                    );
                  }
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
          );
        });
        this.setState({component:component}); 
      }
      else{
        // return [];
      }
    }

    componentWillUpdate(){

    }

    async changeCode(){
      if(this.state.celldata.length>0){
        let tmp = this.state.celldata;
        tmp[0].v.m = '新磅单';
        this.setState({celldata:tmp});
        await this.dataProc();
      }
    }

    async trans2dimension(arr:any){
      let tmp:any[] = [];
      arr.map((row:any,index:any)=>{
        tmp[row.r] = new Array();
      });
      arr.map((row:any,index:any)=>{
        tmp[row.r][row.c] = row;
      });
      return tmp;
    }
   

    createData(c1: string, c2: string, c3: string, c4: string, c5: string,c6: string) {
        return { c1 ,c2, c3, c4, c5, c6 };
    }

    render(){
        const { classes } = this.props;
        return (
          <React.Fragment>
          <table ref={el=>this.printRef = el} className='formTable'>
              <tbody>
                {this.state.component}
              </tbody>
          </table>
          </React.Fragment>
        );
    }
    
}

const HomeSheet = withStyles({table: {minWidth: 700}})(BaseHomeSheet);
export{HomeSheet};