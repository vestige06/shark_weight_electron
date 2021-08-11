import React from 'react';
import {EventEmitter} from 'events';
// import LuckyExcel from 'luckyexcel';
const LuckyExcel = window.require('luckyexcel');
var fs = window.require("fs");
const path = window.require('path');

interface LuckSheetProps{
    luckyCss?:object
    isOrigin?:boolean,
    sheets?:object,
    _luckySheetEvent?:EventEmitter;
}
class LuckySheet extends React.Component<any,LuckSheetProps> {
    public constructor(props:LuckSheetProps){
        super(props);
        this.state = {
            sheets: [{}]
        }
        // console.log(this.props.luckyCss.height);
    }

    async _setRefresh(ctx:any,sheets:any[]){
        await this.props.getWeighingTemplate(ctx,sheets);
    }
    async getLuckySheet() {
        await this._setRefresh(this,[]);
        if(this.props.isOrigin === false){
            // console.log(this.props.sheets[0].length !== undefined);
            // console.log(this.props.getWeighingTemplate);
            const luckysheet = window.luckysheet;
            // this.state.sheets
            // exportJson.sheets[0].showGridLines = 0;
            // exportJson.sheets[0].row = 5;
            // exportJson.sheets[0].column = 6;
            // console.log(exportJson.sheets[0]);
            // console.log(this.props.luckyCss.height);
            // console.log(exportJson.sheets[0].rh_height);
            // this.props.luckyCss.width = exportJson.sheets[0].ch_width;
            // this.props.luckyCss.height= exportJson.sheets[0].rh_height;
            let sheets:any = this.state.sheets;
            sheets[0].showGridLines = 0;
            luckysheet.create({
                container: 'luckysheet', // luckysheet is the container id
                data:this.state.sheets,
                title:'称重磅单',
                userInfo:'',
                lang: 'zh',
                isPivotTable: false,
                showtoolbar: false,
                showtoolbarConfig:{
                    image: false,
                    print: false,
                },
                showinfobar: false,
                showsheetbar: false,
                showsheetbarConfig:{
                    add: false,
                    menu: false,
                },
                showstatisticBar: true,
                showstatisticBarConfig:{
                    zoom: true,
                    count: false,  
                    view: true,  
                },
                enableAddRow:false,
                enableAddBackTop:false,
                rowHeaderWidth:0,
                columnHeaderHeight:0,
                sheetFormulaBar:false,
                hook:{
                    cellMousedown:function(cell:any,postion:any,sheetFile:any,ctx:any){
                        // console.log(cell);
                    },
                    cellEditBefore:function(cell:any,postion:any,sheetFile:any,ctx:any){
                        // console.log(postion);
                    },
                    cellRenderBefore:(cell:any,postion:any,sheetFile:any,ctx:any):any =>{
                        if(cell instanceof Object){
                            if([
                                        '_bh',
                                        '_kh',
                                        '_kh2',
                                        '_kh3',
                                        '_ch',
                                        '_kh',
                                        '_mz',
                                        '_mzrq',
                                        '_wz',
                                        '_pz',
                                        '_pzrq',
                                        '_jz',
                                        '_mzsby',
                                        '_pzsby',
                                        '_jzrq',
                                        '_dyrq',
                                        '_kz',
                                        '_kl',
                                        '_sz',
                                        '_bz',
                                        '_by1',
                                        '_by2',
                                        '_by3',
                                        '_by4',
                                        '_by5'
                                    ].includes(cell.m)){
                                        cell.v = '';
                                        if(cell.m === '_bh'){
                                            console.log(postion);
                                            return false;
                                        }
                                        else{
                                            return false;
                                        }
                                }
                        }
                        // if(cell.v !== null){
                            // console.log(typeof cell);
                        // }
                        
                        // if(this.props.sheets[1] == undefined){
                        //     if([
                        //         '_bh',
                        //         '_kh',
                        //         '_kh2',
                        //         '_kh3',
                        //         '_ch',
                        //         '_kh',
                        //         '_mz',
                        //         '_mzrq',
                        //         '_wz',
                        //         '_pz',
                        //         '_pzrq',
                        //         '_jz',
                        //         '_mzsby',
                        //         '_pzsby',
                        //         '_jzrq',
                        //         '_dyrq',
                        //         '_kz',
                        //         '_kl',
                        //         '_sz',
                        //         '_bz',
                        //         '_by1',
                        //         '_by2',
                        //         '_by3',
                        //         '_by4',
                        //         '_by5'
                        //     ].includes(cell.m)){
                        //         cell.v = '';
                        //         return false;
                        //     }
                        // }
                        // else{
                        //     return true
                        // }
                        
                    },
                    cellDbClick(cell:any,postion:any){
                        console.log(cell);
                    },
                    cellUpdateBefore:function(r:any,c:any,value:any,isRefresh:any){
                        console.info('cellUpdateBefore',r,c,value,isRefresh)
                    },
                },
                xScrollHiding: true,
                yScrollHiding: true
            });
        }
        else{
            // let sheets:any = this.state.sheets;
            const luckysheet = window.luckysheet;
                luckysheet.create({
                    container: 'luckysheet', // luckysheet is the container id
                    data:this.state.sheets,
                    title:'称重磅单',
                    userInfo:'',
                    lang: 'zh',
                    showinfobar: false,
                    plugins: ['chart']
            });
        }
    }
    
    componentWillUpdate(){
        // this.getLuckySheet();
    }
    componentWillMount(){
        // this.props._luckySheetEvent.on('set-firstData',(firstData:any)=>{
        //     // console.log('zzz');
        //     // console.log(window.luckysheet.setCellValue(2,1,1726371236));
        //     // console.log(window.luckysheet.getCellValue(2,1));
        //     console.log(window.luckysheet.replace('/_mz/',firstData,{isRegularExpression:true}));
        // });
    }
    componentDidMount() {
        this.getLuckySheet();
        // this.props._ins.afterUpdate((instance:any,options:any) => {
        //     // this.getLuckySheet();
        // });
    }
    render() {
        return (
            <div
            id="luckysheet"
            style={this.props.luckyCss}
            ></div>
        )
    }
}

export default LuckySheet