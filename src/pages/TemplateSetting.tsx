import React from 'react';
import LuckySheet from '../module/LuckySheet';
import {WeighingTemplate}  from '../model/WeighingTemplate';
const fs = window.require('fs');
const LuckyExcel = window.require('luckyexcel');
let { ipcRenderer,remote} = window.require('electron');
const mainProc = remote.require('./main.js');
class TemplateSetting extends React.Component{
    state:Readonly<any>;
    constructor(props:any) {
        super(props);
        this.state = {
            sheets: [{}]
        }
    }
      
    async getWeighingTemplate(ctx:any){
        let ret = await WeighingTemplate.getInstance()._model.findOne({
            where:{
                tag: 'current'
            }
        });
        ctx.setState({sheets:JSON.parse(ret.sheets)});
    }
    async componentWillMount(){
        // window.onload = function(){
        var menu = remote.Menu.buildFromTemplate([{
            label: '保存',
            accelerator: 'Ctrl+S',
            click: async function(undef:any, event:any){
                    const ret = await WeighingTemplate.getInstance()._model.update({
                        sheets: JSON.stringify(window.luckysheet.getAllSheets())
                    },
                    {
                        where:{
                            tag: 'current'
                        }
                    });
            }
        }]);
        remote.getCurrentWindow().setMenu(menu);
        // await this.getWeighingTemplate();
        // WeighingTemplate.getInstance()._ins.afterUpdate((instance,options) => {
        //     this.getWeighingTemplate();
        // });
    }

    render(){
        // console.log(this.state.sheets);
        return (
            <div id="TemplateSetting">
                <LuckySheet luckyCss={{
                    margin: '0px',
                    padding: '0px',
                    height: '100vmin',
                }} isOrigin={true} sheets={this.state.sheets} getWeighingTemplate={this.getWeighingTemplate} _ins={WeighingTemplate.getInstance()._ins}/>
            </div>
        );
    }
}

export{TemplateSetting};