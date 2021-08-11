import React from 'react';
import './SystemSettings.css'

import PropTypes from 'prop-types';
import { makeStyles, withTheme, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import { select } from 'async';
import { Settings } from '../model/Settings';
let { ipcRenderer, remote } = window.require('electron');
const mainProc = remote.require('./main');
class TabPanel extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        //   const { children, value, index, ...other } = this.props;

        return (
            <div
                role="tabpanel"
                hidden={this.props.value !== this.props.index}
                id={`vertical-tabpanel-${this.props.index}`}
                aria-labelledby={`vertical-tab-${this.props.index}`}
                {...this.props.other}
            >
                {this.props.value === this.props.index && (
                    <Box p={15}>
                        {this.props.children}
                    </Box>
                )}
            </div>
        );
    }
}

const useStyles = (theme: any) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 500,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
});
class SystemSettings extends React.Component<any>{
    state: any;
    constructor(props: any) {
        super(props);
        this.state = {
            value:0,
            isWeighingCompletedPrinted:{},
            printWay:{},
            printDevice:{},
            printWidth:{},
            printHeight:{},
            tare:{value:'{}'},
            weighingMode:{},
            isAutoWeighing:{},
            isOnDesktopReadCard:{value:'{}'},
            isOnQrScan:{value:'{}'},
            weighingRelayTime:{},
            minWeight:{},
            plateRecognizeWay:{value:'{}'},
            barrierWay:{},
            isMonitorCamera:{},
            isWeighingDataSync:{},
            isCarScreen:{value:'{}'},
            daemonScreen:{value:"{}"},
            volumn:{},
            isWhenRecognizePlate:{value:'{}'},
            isWhenWeighingStable:{value:'{}'},
            isWhenFirstWeighingFinished:{value:'{}'},
            isWhenOnDaemonScreen:{value:'{}'},
            WarningWeighingWay:{},
            WarningWeight:{},
            WarningWeightMessage:{},
            poundSheetDisplayWay:{},
            InstrumentModel: { value: '[]' },
            InstrumentModelSelected: {value:''},
            BaudRate: { value: '[]' },
            BaudRateSelected: {},
            InstrumentSerialPort:{value:'[]'},
            WeightUnit:{},
            isOpenCameraF:{value:'{}'},
            isOpenCameraS:{value:'{}'},
            isOpenSensingHeadF:{value:'{}'},
            isOpenSensingHeadS:{value:'{}'},
            isOpenMonitorF:{value:'{}'},
            isOpenMonitorS:{value:'{}'},
            isOpenMonitorT:{value:'{}'},
            isOpenLED:{},
            LEDwidth:{},
            LEDheight:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.loadConfig = this.loadConfig.bind(this);
        this.printWayHandler = this.printWayHandler.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.handleOnblur = this.handleOnblur.bind(this);
        this.handleSlide = this.handleSlide.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.FormulaEditor = this.FormulaEditor.bind(this);
        this.ChangeNameAndListOrder = this.ChangeNameAndListOrder.bind(this);
    }

    async componentDidMount() {
        await this.loadConfig();
    }
    async loadConfig() {
        const [ret, ret_meta] = await Settings.getInstance()._ins.query("select * from Settings");
        let tmp: any = [];
        ret.forEach((item: any, index: any) => {
            tmp[item.key] = item;
        });
        this.setState({...tmp});
        // console.log(this.state.volumn);
        // console.log(this.state.WeightUnit.value)
        const WeightUnitValue = JSON.parse(this.state.WeightUnit.value)[0]
        console.log(WeightUnitValue)
    }
    select_disable() {
        var select_name = document.getElementsByTagName('select');
        for (var i = 0; i < select.name.length; i++) {
            var select_id = select_name[i].id;

        }
    }
    a11yProps(index: any) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    getSettingsValue(key: any): any {
        // this.state.settings.forEach((item:any,index:any)=>{
        //     if(item.key === key){
        //         return item;
        //     }
        // });
        // return {};
    }

    async handleSave(event:any){
        const [ret,ret_meta] = await Settings.getInstance()._ins.query("select * from Settings");
        ret.forEach(async (item:any,index:any)=>{
            await Settings.getInstance()._model.update(this.state[item.key], {
                where: {
                  key: item.key
                }
            });
        });
    }

    handleChange(event:any, newValue:any){
    // setValue(newValue);
        this.setState({
            value: newValue
        })
    };
    handleSelected(event: any) {
        switch (event.target.name) {
            case 'printDevice':
                let tmp = this.state.printDevice;
                tmp.value = event.target.value;
                this.setState({ printDevice: tmp });
                console.log(this.state.printDevice);
                break;
            case 'isOnDesktopReadCard':
                let tmp2 = this.state.isOnDesktopReadCard;
                // if(event.target.checked === true){
                let tmp2_object = {
                    type: JSON.parse(tmp2.value).type,
                    content: event.target.value
                };
                tmp2.value = JSON.stringify(tmp2_object);
                // }
                this.setState({ isOnDesktopReadCard: tmp2 });
                console.log(this.state.isOnDesktopReadCard);
                break;
            case 'isOnQrScan':
                let tmp3 = this.state.isOnQrScan;
                let tmp3_object = {
                    type: JSON.parse(tmp3.value).type,
                    content: event.target.value
                };
                tmp3.value = JSON.stringify(tmp3_object);
                this.setState({ isOnQrScan: tmp3 });
                console.log(this.state.isOnQrScan);
                break;
            case 'InstrumentModelSelected':
                let tmp4 = this.state.InstrumentModelSelected;
                tmp4.value = event.target.value;
                this.setState({ InstrumentModelSelected: tmp4 });
                console.log(this.state.InstrumentModelSelected);
                break;
            case 'BaudRateSelected':
                let tmp5 = this.state.BaudRateSelected;
                tmp5.value = event.target.value;
                this.setState({ BaudRateSelected:tmp5 });
                console.log(this.state.BaudRateSelected);
                break;
            case 'InstrumentSerialPort':
                let tmp6 = this.state.InstrumentSerialPort;
                tmp6.value = event.target.value;
                this.setState({ InstrumentSerialPort:tmp6 });
                break;
        }
    }
    handleChecked(event: any) {
        switch (event.target.name) {
            case 'printWay':
                let tmp = this.state.printWay;
                tmp.value = event.target.value;
                this.setState({ printWay: tmp });
                console.log(this.state.printWay);
                break;
            case 'poundSheetDisplayWay':
                let tmp_0 = this.state.poundSheetDisplayWay;
                tmp_0.value = event.target.value;
                this.setState({poundSheetDisplayWay:tmp_0});
                console.log(this.state.poundSheetDisplayWay);
            break;
            case 'isWeighingCompletedPrinted':
                let tmp2 = this.state.isWeighingCompletedPrinted;
                tmp2.value = event.target.checked ? '1' : '0';
                this.setState({ isWeighingCompletedPrinted: tmp2 });
                console.log(this.state.isWeighingCompletedPrinted);
                break;
            case 'tare':
                let tmp3 = this.state.tare;
                if (event.target.checked === true) {
                    let tmp3_object = {
                        type: event.target.value,
                        content1: JSON.parse(tmp3.value).content1,
                        content2: JSON.parse(tmp3.value).content2
                    };
                    tmp3.value = JSON.stringify(tmp3_object);
                }
                // tmp2.value = event.target.checked?'1':'0';
                this.setState({ tare: tmp3 });
                console.log(this.state.tare);
            break;
            case 'weighingMode':
                let tmp4 = this.state.weighingMode;
                if (event.target.checked === true) {
                    tmp4.value = event.target.value;
                }
                this.setState({ weighingMode: tmp4 });
                console.log(this.state.weighingMode);
                break;
            case 'isAutoWeighing':
                let tmp5 = this.state.isAutoWeighing;
                if (event.target.checked === true) {
                    tmp5.value = event.target.value;
                }
                this.setState({ isAutoWeighing: tmp5 });
                console.log(this.state.isAutoWeighing);
                break;
            case 'isOnDesktopReadCard':
                let tmp6 = this.state.isOnDesktopReadCard;
                // if(event.target.checked === true){
                let tmp6_object = {
                    type: event.target.checked ? '1' : '0',
                    content: JSON.parse(tmp6.value).content
                };
                tmp6.value = JSON.stringify(tmp6_object);
                // }
                this.setState({ isOnDesktopReadCard: tmp6 });
                console.log(this.state.isOnDesktopReadCard);
                break;
            case 'isOnQrScan':
                let tmp7 = this.state.isOnQrScan;
                let tmp7_object = {
                    type: event.target.checked ? '1' : '0',
                    content: JSON.parse(tmp7.value).content
                };
                tmp7.value = JSON.stringify(tmp7_object);
                this.setState({ isOnQrScan: tmp7 });
                console.log(this.state.isOnQrScan);
                break;
            // case 'plateRecognizeWay':
            //     let tmp8 = this.state.plateRecognizeWay;
            //     if (event.target.checked === true) {
            //         let tmp8_object = {
            //             type: event.target.value,
            //             content: JSON.parse(tmp8.value).content
            //         };
            //         tmp8.value = JSON.stringify(tmp8_object);
            //     }
            //     this.setState({ plateRecognizeWay: tmp8 });
            //     console.log(this.state.plateRecognizeWay);
            //     break;
            case 'barrierWay':
                let tmp9 = this.state.barrierWay;
                if (event.target.checked === true) {
                    tmp9.value = event.target.value;
                }
                this.setState({ barrierWay: tmp9 });
                console.log(this.state.barrierWay);
                break;
            // case 'isMonitorCamera':
            //     let tmp10 = this.state.isMonitorCamera;
            //     tmp10.value = event.target.checked ? '1' : '0';
            //     this.setState({ isMonitorCamera: tmp10 });
            //     console.log(this.state.isMonitorCamera);
            //     break;
            case 'isWeighingDataSync':
                let tmp11 = this.state.isWeighingDataSync;
                tmp11.value = event.target.checked ? '1' : '0';
                this.setState({ isWeighingDataSync: tmp11 });
                console.log(this.state.isWeighingDataSync);
                break;
            case 'isCarScreen':
                let tmp12 = this.state.isCarScreen;
                let tmp12_object = {
                    type: event.target.checked ? '1' : '0',
                    content: JSON.parse(tmp12.value).content
                };
                tmp12.value = JSON.stringify(tmp12_object);
                this.setState({ isCarScreen: tmp12 });
                console.log(this.state.isCarScreen);
                break;
            case 'daemonScreen':
                let tmp13 = this.state.daemonScreen;
                let tmp13_object ={
                    type: event.target.checked ?'1':'0',
                    ip: JSON.parse(tmp13.value).ip,
                    ledWidth: JSON.parse(tmp13.value).ledWidth,
                    ledHeight: JSON.parse(tmp13.value).ledHeight
                }
                tmp13.value = JSON.stringify(tmp13_object);
                this.setState({ daemonScreen: tmp13 });
                console.log(this.state.daemonScreen);
                break;
            case 'isWhenRecognizePlate':
                let tmp14 = this.state.isWhenRecognizePlate;
                let tmp14_object = {
                    type: event.target.checked ? '1' : '0',
                    content: JSON.parse(tmp14.value).content
                };
                tmp14.value = JSON.stringify(tmp14_object);
                this.setState({ isWhenRecognizePlate: tmp14 });
                console.log(this.state.isWhenRecognizePlate);
                break;
            case 'isWhenWeighingStable':
                let tmp15 = this.state.isWhenWeighingStable;
                let tmp15_object = {
                    type: event.target.checked ? '1' : '0',
                    content: JSON.parse(tmp15.value).content
                };
                tmp15.value = JSON.stringify(tmp15_object);
                this.setState({ isWhenWeighingStable: tmp15 });
                console.log(this.state.isWhenWeighingStable);
                break;
            case 'isWhenFirstWeighingFinished':
                let tmp16 = this.state.isWhenFirstWeighingFinished;
                let tmp16_object = {
                    type: event.target.checked ? '1' : '0',
                    content: JSON.parse(tmp16.value).content
                };
                tmp16.value = JSON.stringify(tmp16_object);
                this.setState({ isWhenFirstWeighingFinished: tmp16 });
                console.log(this.state.isWhenFirstWeighingFinished);
                break;
            case 'isWhenOnDaemonScreen':
                let tmp17 = this.state.isWhenOnDaemonScreen;
                let tmp17_object = {
                    type: event.target.checked ? '1' : '0',
                    content: JSON.parse(tmp17.value).content
                };
                tmp17.value = JSON.stringify(tmp17_object);
                this.setState({ isWhenOnDaemonScreen: tmp17 });
                console.log(this.state.isWhenOnDaemonScreen);
                break;
            case 'WarningWeighingWay':
                let tmp18 = this.state.WarningWeighingWay;
                tmp18.value = event.target.value;
                this.setState({ WarningWeighingWay: tmp18 });
                console.log(this.state.WarningWeighingWay);
                break;
            case 'WeightUnit':
                let tmp19 = this.state.WeightUnit;
                if (event.target.checked === true){
                    tmp19.value = event.target.value;
                }  
                this.setState({ WeightUnit: tmp19 });
                break;
        }
    }
    handleSlide(event:any,value:any){
        let tmp = this.state.volumn;
        tmp.value = value;
        this.setState({
            volumn: tmp
        });
    }

    handleOnblur(event:any){
        switch(event.target.name){
            case 'printWidth':
                let tmp = this.state.printWidth;
                tmp.value = event.target.value;
                this.setState({ printWidth: tmp });
                console.log(this.state.printWidth);
                break;
            case 'printHeight':
                let tmp2 = this.state.printHeight;
                tmp2.value = event.target.value;
                this.setState({ printHeight: tmp2 });
                console.log(this.state.printHeight);
                break;
            case 'tare':
                let tmp3 = this.state.tare;
                if (JSON.parse(tmp3.value).type == 1) {
                    let tmp3_object = {
                        type: JSON.parse(tmp3.value).type,
                        content1: event.target.value,
                        content2: JSON.parse(tmp3.value).content2,
                    };
                    tmp3.value = JSON.stringify(tmp3_object);
                }
                else if (JSON.parse(tmp3.value).type == 2) {
                    let tmp3_object = {
                        type: JSON.parse(tmp3.value).type,
                        content1: JSON.parse(tmp3.value).content1,
                        content2: event.target.value
                    };
                    tmp3.value = JSON.stringify(tmp3_object);
                }

                // tmp2.value = event.target.checked?'1':'0';
                this.setState({ tare: tmp3 });
                console.log(this.state.tare);
                break;
            case 'weighingRelayTime':
                let tmp4 = this.state.weighingRelayTime;
                tmp4.value = event.target.value;
                this.setState({ weighingRelayTime: tmp4 });
                console.log(this.state.weighingRelayTime);
                break;
            case 'minWeight':
                let tmp5 = this.state.minWeight;
                tmp5.value = event.target.value;
                this.setState({ minWeight: tmp5 });
                console.log(this.state.minWeight);
                break;
            case 'isWhenRecognizePlate':
                let tmp6 = this.state.isWhenRecognizePlate;
                let tmp6_object = {
                    type: JSON.parse(tmp6.value).type,
                    content: event.target.value,
                };
                tmp6.value = JSON.stringify(tmp6_object);
                this.setState({ isWhenRecognizePlate: tmp6 });
                console.log(this.state.isWhenRecognizePlate);
                break;
            case 'isWhenWeighingStable':
                let tmp7 = this.state.isWhenWeighingStable;
                let tmp7_object = {
                    type: JSON.parse(tmp7.value).type,
                    content: event.target.value,
                };
                tmp7.value = JSON.stringify(tmp7_object);
                this.setState({ isWhenWeighingStable: tmp7 });
                console.log(this.state.isWhenWeighingStable);
                break;
            case 'isWhenFirstWeighingFinished':
                let tmp8 = this.state.isWhenFirstWeighingFinished;
                let tmp8_object = {
                    type: JSON.parse(tmp8.value).type,
                    content: event.target.value,
                };
                tmp8.value = JSON.stringify(tmp8_object);
                this.setState({ isWhenFirstWeighingFinished: tmp8 });
                console.log(this.state.isWhenFirstWeighingFinished);
                break;
            case 'isWhenOnDaemonScreen':
                let tmp9 = this.state.isWhenOnDaemonScreen;
                let tmp9_object = {
                    type: JSON.parse(tmp9.value).type,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                    content: event.target.value,
                };
                tmp9.value = JSON.stringify(tmp9_object);
                this.setState({ isWhenOnDaemonScreen: tmp9 });
                console.log(this.state.isWhenOnDaemonScreen);
                break;
            case 'WarningWeight':
                let tmp10 = this.state.WarningWeight;
                tmp10.value = event.target.value;
                this.setState({ WarningWeight: tmp10 });
                console.log(this.state.WarningWeight);
                break;
            case 'WarningWeightMessage':
                let tmp11 = this.state.WarningWeightMessage;
                tmp11.value = event.target.value;
                this.setState({ WarningWeightMessage: tmp11 });
                console.log(this.state.WarningWeightMessage);
                break;
            case 'isOpenCameraF':     
                let tmp12 = this.state.isOpenCameraF;
                if(JSON.parse(tmp12.value).type == '1'){
                    console.log(232323232323);
                    let tmp12_object = {
                        type: JSON.parse(tmp12.value).type,
                        ip: event.target.value,
                    };
                    tmp12.value = JSON.stringify(tmp12_object);
                }
                this.setState({ isOpenCameraF: tmp12 });
                console.log(this.state.isOpenCameraF);
                break;
            case 'isOpenCameraS':
                let tmp13 = this.state.isOpenCameraS;
                if(JSON.parse(tmp13.value).type == '1'){
                    let tmp13_object = {
                        type: JSON.parse(tmp13.value).type,
                        ip: event.target.value,
                    };
                    tmp13.value = JSON.stringify(tmp13_object);
                }
                this.setState({ isOpenCameraS: tmp13});
                break;
            case 'isOpenSensingHeadF':
                let tmp14 = this.state.isOpenSensingHeadF;
                if(JSON.parse(tmp14.value).type == '1'){
                    let tmp14_object = {
                        type:JSON.parse(tmp14.value).type,
                        ip: event.target.value,
                    };
                    tmp14.value = JSON.stringify(tmp14_object);
                }
                this.setState({ isOpenSensingHeadF: tmp14 });
                break;
            case 'isOpenSensingHeadS':
                let tmp15 = this.state.isOpenSensingHeadS;
                if(JSON.parse(tmp15.value).type == '1'){
                    let tmp15_object = {
                        type:JSON.parse(tmp15.value).type,
                        ip: event.target.value,
                    };
                    tmp15.value = JSON.stringify(tmp15_object);
                }
                this.setState({ isOpenSensingHeadS: tmp15 });
                break;
            case 'isOpenMonitorF':
                let tmp16 = this.state.isOpenMonitorF;
                if(JSON.parse(tmp16.value).type == '1'){
                    let tmp16_object = {
                        type: JSON.parse(tmp16.value).type,
                        ip: event.target.value,
                    };
                    tmp16.value = JSON.stringify(tmp16_object);
                }
                this.setState({ isOpenMonitorF: tmp16});
            break;
            case 'isOpenMonitorS':
                let tmp17 = this.state.isOpenMonitorS;
                if(JSON.parse(tmp17.value).type == '1'){
                    let tmp17_object = {
                        type:JSON.parse(tmp17.value).type,
                        ip: event.target.value,
                    };
                    tmp17.value = JSON.stringify(tmp17_object);
                }
                this.setState({ isOpenMonitorS: tmp17 });
                break;
            case 'isOpenMonitorT':
                let tmp18 = this.state.isOpenMonitorT;
                if(JSON.parse(tmp18.value).type == '1'){
                    let tmp18_object = {
                        type:JSON.parse(tmp18.value).type,
                        ip: event.target.value,
                    };
                    tmp18.value = JSON.stringify(tmp18_object);
                }
                this.setState({ isOpenMonitorT: tmp18 });
                break;
            case 'daemonScreen':
                let tmp19 = this.state.daemonScreen;
                if(JSON.parse(tmp19.value).type == '1'){
                    
                    let tmp19_object ={
                        type:JSON.parse(tmp19.value).type,
                        ip:event.target.value,
                        ledWidth: event.target.value,
                        ledHeight:event.target.value
                    };
                    tmp19.value = JSON.stringify(tmp19_object);
                }
                this.setState({ daemonScreen:tmp19 });
            break;
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

    printWayHandler(event: any) {
        let tmp = this.state.printWay;
        console.log(tmp);
        tmp.value = event.target.value;
        this.setState({ printWay: tmp });
    }
    async getPrintConfig() {
        const ret = await Settings.getInstance()._model.findAll({
            where: {
                type: '打印设置'
            }
        });
        console.log(ret);
    }

    ChangeNameAndListOrder() {
        try {
            mainProc.createWindow({
                url: process.env.NODE_ENV === 'production' ? '/#/ChangeNameAndListOrder' : 'http://localhost:3000/#/ChangeNameAndListOrder',
                protocal: process.env.NODE_ENV === 'production' ? 'FILE' : 'URL',
                isDevTools: true
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    FormulaEditor() {
        try {
            mainProc.createWindow({
                url: process.env.NODE_ENV === 'production' ? '/#/FormulaEditor' : 'http://localhost:3000/#/FormulaEditor',
                protocal: process.env.NODE_ENV === 'production' ? 'FILE' : 'URL',
                isDevTools: true
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    FuzzyRecognition() {
        try {
            mainProc.createWindow({
                url: process.env.NODE_ENV === 'production' ? '/#/FuzzyRecognition' : 'http://localhost:3000/#/FuzzyRecognition',
                protocal: process.env.NODE_ENV === 'production' ? 'FILE' : 'URL',
                isDevTools: true
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        const printers = remote.getCurrentWebContents().getPrinters();
        //   this.getPrintConfig();

        //   const [value, setValue] = React.useState(0);
        const { classes } = this.props;
        return (
            <div id="system" className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    // indicatorColor='none'
                    textColor='primary'
                    value={this.state.value}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="称重串口" {...this.a11yProps(0)} />
                    <Tab label="磅单设置" {...this.a11yProps(1)} />
                    <Tab label="打印设置" {...this.a11yProps(2)} />
                    <Tab label="重量单位" {...this.a11yProps(3)} />
                    <Tab label="扣重扣率" {...this.a11yProps(4)} />
                    <Tab label="称重模式" {...this.a11yProps(5)} />
                    <Tab label="称重控制" {...this.a11yProps(6)} />
                    <Tab label="车牌识别" {...this.a11yProps(7)} />
                    <Tab label="道闸控制" {...this.a11yProps(8)} />
                    <Tab label="视频抓拍" {...this.a11yProps(9)} />
                    <Tab label="数据同步" {...this.a11yProps(10)} />
                    <Tab label="室外大屏" {...this.a11yProps(11)} />
                    <Tab label="语音设置" {...this.a11yProps(12)} />
                    <Tab label="超载报警" {...this.a11yProps(13)} />
                    <Tab label="数据备份" {...this.a11yProps(14)} />
                </Tabs>
                <TabPanel value={this.state.value} index={0}>
                    <div className='tabBox'>
                        <h2 className='left'>称重串口：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label>仪表型号：</label>
                                <select name='InstrumentModel' id='instrument_model' onChange={this.handleSelected}>
                                    <option key="default0" value="">请选择</option>
                                    {JSON.parse(this.state.InstrumentModel.value).map((value: any, index: any, array: any) => {
                                        return <option value={value} key={index} selected={this.state.InstrumentModelSelected.value == value} >{value}</option>;
                                    })}
                                </select>
                            </div>
                            <div className='line'>
                                <label>仪表串口：</label>
                                <select name='InstrumentSerialPort' onChange={this.handleSelected}>
                                    <option key='default1'>请选择</option>
                                    <option
                                        defaultValue={this.state.InstrumentSerialPort.value}
                                        key={this.state.InstrumentSerialPort.value.index}
                                        selected={this.state.InstrumentSerialPort.value == this.state.InstrumentSerialPort.value}
                                    >{this.state.InstrumentSerialPort.value}</option>
                                </select>
                            </div>
                            <div className='line'>
                                <label>波特率：</label>
                                <select name='BaudRate' onChange={this.handleSelected}>
                                    <option key='default2' value="">请选择</option>
                                    {JSON.parse(this.state.BaudRate.value).map((value: any, index: any, array: any) => {
                                        return <option defaultValue={value} key={index} selected={this.state.BaudRateSelected.value == value}>{value}</option>
                                    })}
                                </select>
                            </div>
                            <div className='line'>
                                <label><input type="checkbox"></input>启用副设备</label>
                                <span className='tips'> * 手动称重模式可用 </span>
                            </div>
                            <div className='line'>
                                <label>仪表型号：</label>
                                <select disabled name='InstrumentModel' id='instrument_model' onChange={this.handleSelected}>
                                    <option key="default3" value="">请选择</option>
                                    {JSON.parse(this.state.InstrumentModel.value).map((value: any, index: any, array: any) => {
                                        return <option value={value} key={index} selected={this.state.InstrumentModelSelected.value == value} >{value}</option>;
                                    })}
                                </select>
                            </div>
                            <div className='line'>
                                <label>仪表串口：</label>
                                <select disabled name='InstrumentSerialPort' onChange={this.handleSelected}>
                                    <option key='default1' value="">请选择</option>
                                    <option
                                        defaultValue={this.state.InstrumentSerialPort.value}
                                        key={this.state.InstrumentSerialPort.value.index}
                                        selected={this.state.InstrumentSerialPort.value == this.state.InstrumentSerialPort.value}
                                    >{this.state.InstrumentSerialPort.value}</option>
                                </select>
                            </div>
                            <div className='line'>
                                <label>波特率：</label>
                                <select disabled name='BaudRate' onChange={this.handleSelected}>
                                    <option key='default5' value="">请选择</option>
                                    {JSON.parse(this.state.BaudRate.value).map((value: any, index: any, array: any) => {
                                        return <option value={value} key={index} selected={this.state.BaudRateSelected.value == value}>{value}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <div className='tabBox'>
                        <h2 className='left'>磅单设置：</h2>
                        <div className='right'>
                            <div className='line'>
                                <button className='btn-basic' onClick={this.openTemplateSetting}>修改磅单样式</button>
                            </div>
                            <div className='line'>
                                <label>界面磅单显示方式：</label>
                                <label><input name="poundSheetDisplayWay" type="radio" value='0' onChange={this.handleChecked} checked={this.state.poundSheetDisplayWay.value== '0'}  /> 直接预览 </label> 
                                <label><input name="poundSheetDisplayWay" type="radio" value='1' onChange={this.handleChecked}  checked={this.state.poundSheetDisplayWay.value== '1'}  /> 列表显示 </label> 
                            </div>
                            <div className='line'>
                                <button className='btn-basic' onClick={this.ChangeNameAndListOrder}>修改字段名称和列表顺序</button>
                            </div>
                            <div className='line'>
                                <label>备用字段公式：</label>
                                <button className='btn-basic' onClick={this.FormulaEditor}>编辑公式</button>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <div className='tabBox'>
                        <h2 className='left'>打印设置：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label><input name="isWeighingCompletedPrinted" type="checkbox" onChange={this.handleChecked} checked={this.state.isWeighingCompletedPrinted.value == 1}></input>称重完成后打印</label>
                                <label><input name="printWay" type="radio" value="1" onChange={this.handleChecked} checked={this.state.printWay.value == 1} /> 直接打印 </label>
                                <label><input name="printWay" type="radio" value="2" onChange={this.handleChecked} checked={this.state.printWay.value == 2} /> 先预览再打印 </label>
                            </div>
                            <div className='line'>
                                <label>选择打印机：</label>
                                <select onChange={this.handleSelected} name="printDevice">
                                    <option value="">请选择</option>
                                    {printers.map((item: any, index: any) => {
                                        return <option key={index} selected={this.state.printDevice.value === item.name} value={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className='line'>
                                <label>页面宽度(mm)：<input type="text" name="printWidth" placeholder='210' onBlur={this.handleOnblur} value={this.state.printWidth.value} /></label>
                            </div>
                            <div className='line'>
                                <label>页面高度(mm)：<input type="text" name="printHeight" placeholder='140' onBlur={this.handleOnblur} value={this.state.printHeight.value} /></label>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    <div className='tabBox'>
                        <h2 className='left'>重量单位：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label><input name="WeightUnit" type="radio" value="1" onChange={this.handleChecked} checked={this.state.WeightUnit.value == 1} /> kg </label>
                                <label><input name="WeightUnit" type="radio" value="2" onChange={this.handleChecked} checked={this.state.WeightUnit.value == 2}/> t </label>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={4}>
                    <div className='tabBox'>
                        <h2 className='left'>扣重扣率：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label><input name="tare" type="radio" onChange={this.handleChecked} value="0" checked={JSON.parse(this.state.tare.value).type == 0} /> 无 </label>
                            </div>
                            <div className='line'>
                                <label><input name="tare" type="radio" onChange={this.handleChecked} value="1"  checked={JSON.parse(this.state.tare.value).type == 1} /> 扣重 </label> 
                                <label>默认扣重：<input type="text" name="tare" onChange={this.handleOnblur} disabled={JSON.parse(this.state.tare.value).type != 1} value={JSON.parse(this.state.tare.value).content1} placeholder=''/> kg</label>
                            </div>
                            <div className='line'>
                                <label><input name="tare" type="radio" onChange={this.handleChecked} value="2"   checked={JSON.parse(this.state.tare.value).type == 2} /> 扣率 </label>                  
                                <label>默认扣率：<input type="text" name="tare" onChange={this.handleOnblur} disabled={JSON.parse(this.state.tare.value).type != 2}  value={JSON.parse(this.state.tare.value).content2}  placeholder=''/> %</label>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={5}>
                    <div className='tabBox'>
                        <h2 className='left'>称重模式：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label><input name="weighingMode" type="radio" value="1" onChange={this.handleChecked} checked={this.state.weighingMode.value == 1} /> 一次称重 </label>
                                <label><input name="weighingMode" type="radio" value="2" onChange={this.handleChecked} checked={this.state.weighingMode.value == 2} /> 两次称重 </label>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={6}>
                    <div className='tabBox'>
                        <h2 className='left'>称重控制：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label><input name="isAutoWeighing" type="radio" value="2" onChange={this.handleChecked} checked={this.state.isAutoWeighing.value == 2} /> 手动称重 </label>
                                <label><input name="isAutoWeighing" type="radio" value="1" onChange={this.handleChecked} checked={this.state.isAutoWeighing.value == 1} /> 自动称重 </label>
                            </div>
                            <div className='line'>
                                <label><input name="isOnDesktopReadCard" onChange={this.handleChecked} checked={JSON.parse(this.state.isOnDesktopReadCard.value).type == 1} type="checkbox" />启用桌面读卡器</label>
                                <select name="isOnDesktopReadCard" onChange={this.handleSelected}>
                                    <option value="">请选择</option>
                                    <option value="COM1" selected={JSON.parse(this.state.isOnDesktopReadCard.value).content === 'COM1'}>COM1</option>
                                    <option value="COM2" selected={JSON.parse(this.state.isOnDesktopReadCard.value).content === 'COM2'}>COM2</option>
                                    <option value="COM3" selected={JSON.parse(this.state.isOnDesktopReadCard.value).content === 'COM3'}>COM3</option>
                                    <option value="COM4" selected={JSON.parse(this.state.isOnDesktopReadCard.value).content === 'COM4'}>COM4</option>
                                </select>
                                <span className='tips'> * 仅支持COM1 ~ COM4 </span>
                            </div>
                            <div className='line'>
                                <label><input name="isOnQrScan" onChange={this.handleChecked} checked={JSON.parse(this.state.isOnQrScan.value).type == 1} type="checkbox" />启用二维码扫码器</label>
                                <select name="isOnQrScan" onChange={this.handleSelected} >
                                    <option value="">请选择</option>
                                    <option value="COM1" selected={JSON.parse(this.state.isOnQrScan.value).content === 'COM1'}>COM1</option>
                                    <option value="COM2" selected={JSON.parse(this.state.isOnQrScan.value).content === 'COM2'}>COM2</option>
                                    <option value="COM3" selected={JSON.parse(this.state.isOnQrScan.value).content === 'COM3'}>COM3</option>
                                    <option value="COM4" selected={JSON.parse(this.state.isOnQrScan.value).content === 'COM4'}>COM4</option>
                                </select>
                            </div>
                            <div className='line'>
                                <label>稳定延时：<input type="text" name="weighingRelayTime" onChange={this.handleOnblur} value={this.state.weighingRelayTime.value} placeholder='' /> 秒</label>
                            </div>
                            <div className='line'>
                                <label>最小称重重量：<input type="text" name="minWeight" onChange={this.handleOnblur} value={this.state.minWeight.value} placeholder='' /> kg</label>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={7}>
                    <div className='tabBox'>
                        <h2 className='left'>车牌识别：</h2>
                        <div className='right'>
                            <div className='line'>
                            {/*      <label><input name="plateRecognizeWay" type="radio" value="0" onChange={this.handleChecked} checked={JSON.parse(this.state.plateRecognizeWay.value).type == '0'}/> 不启用 </label> 
                                 <label><input name="plateRecognizeWay" type="radio" value="1" onChange={this.handleChecked} checked={JSON.parse(this.state.plateRecognizeWay.value).type == '1'}/> 远距离射频卡 </label> 
                                 <label><input name="plateRecognizeWay" type="radio" value="2" onChange={this.handleChecked} checked={JSON.parse(this.state.plateRecognizeWay.value).type == '2'}/> 车牌识别相机 </label>  */}
                                 <button className='btn-basic' onClick={this.FuzzyRecognition}>模糊识别</button>
                            </div>
                            <hr />
                            <div className='line'>
                                <label>相机1IP：<input type="text" name='isOpenCameraF'  onChange={this.handleOnblur} value={JSON.parse(this.state.isOpenCameraF.value).ip} /></label>
                                <label>相机2IP：<input type="text" name='isOpenCameraS'  onChange={this.handleOnblur} value={JSON.parse(this.state.isOpenCameraS.value).ip} /></label>
                            </div>
                            <div className='line'>
                                <label><input name='isOpenCameraF' onChange={this.handleChecked} type="checkbox" checked={JSON.parse(this.state.isOpenCameraF.value).type == '1'}></input>相机1开启</label>
                                <label><input name='isOpenCameraS' onChange={this.handleChecked} type="checkbox" checked={JSON.parse(this.state.isOpenCameraS.value).type == '1'}></input>相机2开启</label>
                                <label><input name='isOpenCameraF' onChange={this.handleChecked} type="checkbox"></input>相机1LED开启</label>
                            </div>
                            <div className='line'>
                                <label><input name='isOpenSensingHeadF'  onChange={this.handleChecked} type="checkbox" checked={JSON.parse(this.state.isOpenSensingHeadF.value).type == '1'}></input>读头1开启</label>
                                <label><input name='isOpenSensingHeadS'  onChange={this.handleChecked} type="checkbox" checked={JSON.parse(this.state.isOpenSensingHeadS.value).type == '1'}></input>读头2开启</label>
                                <label><input name='isOpenCameraS'  onChange={this.handleChecked} type="checkbox"></input>相机2LED开启</label>
                            </div>
                            <div className='line'>
                                <label>读头1：<input name='isOpenSensingHeadF' onChange={this.handleOnblur} value={JSON.parse(this.state.isOpenSensingHeadF.value).ip} type="text" /></label>
                                <label>读头2：<input name='isOpenSensingHeadS' onChange={this.handleOnblur} value={JSON.parse(this.state.isOpenSensingHeadS.value).ip} type="text" /></label>
                            </div>
                        </div>
                    </div>
                </TabPanel>               
                <TabPanel value={this.state.value} index={8}>
                    <div className='tabBox'>
                        <h2 className='left'>道闸控制：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label><input name="barrierWay" type="radio" value="0" onChange={this.handleChecked} checked={this.state.barrierWay.value == '0'} /> 无道闸 </label>
                                <label><input name="barrierWay" type="radio" value="1" onChange={this.handleChecked} checked={this.state.barrierWay.value == '1'} /> 单向道闸(先上秤) </label>
                                <label><input name="barrierWay" type="radio" value="2" onChange={this.handleChecked} checked={this.state.barrierWay.value == '2'} /> 双向道闸 </label>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={9}>
                    <div className='tabBox'>
                        <h2 className='left'>视频抓拍：</h2>
                        <div className='right'>
                            {/* <div className='line'>
                                <label><input name="isMonitorCamera" type="checkbox" onChange={this.handleChecked} checked={this.state.isMonitorCamera.value == 1} /> 启用监控摄像头</label>
                            </div>
                            <hr /> */}
                            <div className='line'>
                                <label>监视器1的IP：<input type="text" name='isOpenMonitorF' onChange={this.handleOnblur} value={JSON.parse(this.state.isOpenMonitorF.value).ip} /></label>
                                <label>账号：<input type="text" placeholder='admin' /></label>
                                <label>密码：<input type="password" /></label>
                            </div>
                            <div className='line'>
                                <label>监视器2的IP：<input type="text" name='isOpenMonitorS' onChange={this.handleOnblur} value={JSON.parse(this.state.isOpenMonitorS.value).ip} /></label>
                                <label>账号：<input type="text" placeholder='admin' /></label>
                                <label>密码：<input type="password" /></label>
                            </div>
                            <div className='line'>
                                <label>监视器3的IP：<input type="text" name='isOpenMonitorT' onChange={this.handleOnblur} value={JSON.parse(this.state.isOpenMonitorT.value).ip} /></label>
                                <label>账号：<input type="text" placeholder='admin' /></label>
                                <label>密码：<input type="password" /></label>
                            </div>
                            <div className='line'>
                                <label><input name='isOpenMonitorF' onChange={this.handleChecked} type="checkbox" checked={JSON.parse(this.state.isOpenMonitorF.value).type == '1'}></input>监视器1开启</label>
                                <label><input name='isOpenMonitorS' onChange={this.handleChecked} type="checkbox" checked={JSON.parse(this.state.isOpenMonitorS.value).type == '1'}></input>监视器2开启</label>
                                <label><input name='isOpenMonitorT' onChange={this.handleChecked} type="checkbox" checked={JSON.parse(this.state.isOpenMonitorT.value).type == '1'}></input>监视器3开启</label>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={10}>
                    <div className='tabBox'>
                        <h2 className='left'>数据同步：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label><input name="isWeighingDataSync" type="checkbox" onChange={this.handleChecked} checked={this.state.isWeighingDataSync.value == 1}></input>启用称重数据上传</label>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={11}>
                    <div className='tabBox'>
                        <h2 className='left'>室外大屏：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label><input name="isCarScreen" onChange={this.handleChecked} checked={JSON.parse(this.state.isCarScreen.value).type == 1} type="checkbox"></input>启用汽车衡大屏幕</label>
                                <select name="isCarScreen" onChange={this.handleSelected}>
                                    <option value="">请选择</option>
                                </select>
                            </div>
                            <div className='line'>
                                <label><input name="daemonScreen" type="checkbox" onChange={this.handleChecked} checked={JSON.parse(this.state.daemonScreen.value).type == '1'}></input>启用无人值守大屏幕</label>
                            </div>
                            <hr />
                            <div className='line'>
                                <label>LED的IP：<input type="text" name="daemonScreen" data-led='1' onChange={this.handleOnblur} value={JSON.parse(this.state.daemonScreen.value).ip} placeholder='' /></label>
                            </div>
                            <div className='line'>
                                <label>LED的宽：<input type="text" name="daemonScreen" data-led='2' onChange={this.handleOnblur} value={JSON.parse(this.state.daemonScreen.value).ledWidth} placeholder='' /></label>
                            </div>
                            <div className='line'>
                                <label>LED的高：<input type="text" name="daemonScreen" data-led='3' onChange={this.handleOnblur} value={JSON.parse(this.state.daemonScreen.value).ledHeight} placeholder='' /></label>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={12}>
                    <div className='tabBox'>
                        <h2 className='left'>语音设置：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label>语音设置：</label>
                                <Slider
                                    name="volumn"
                                    aria-label="custom thumb label"
                                    onChange={this.handleSlide}
                                    step={1}
                                    min={0}
                                    max={100}
                                    valueLabelDisplay="auto"
                                    marks
                                    value={this.state.volumn.value}
                                />
                            </div>
                            <div className='line'>
                                <label><input name="isWhenRecognizePlate" onChange={this.handleChecked} checked={JSON.parse(this.state.isWhenRecognizePlate.value).type == 1} type="checkbox"></input>识别到车牌时</label>
                                <input type="text" name="isWhenRecognizePlate" onChange={this.handleOnblur} value={JSON.parse(this.state.isWhenRecognizePlate.value).content} placeholder='%ch请上秤%' />
                            </div>
                            <div className='line'>
                                <label><input name="isWhenWeighingStable" onChange={this.handleChecked} checked={JSON.parse(this.state.isWhenWeighingStable.value).type == 1} type="checkbox"></input>重量稳定时</label>
                                <input type="text" name="isWhenWeighingStable" onChange={this.handleOnblur} value={JSON.parse(this.state.isWhenWeighingStable.value).content} placeholder='请刷卡取票' />
                            </div>
                            <div className='line'>
                                <label><input name="isWhenFirstWeighingFinished" onChange={this.handleChecked} checked={JSON.parse(this.state.isWhenFirstWeighingFinished.value).type == 1} type="checkbox"></input>第一次称重完成时</label>
                                <input type="text" name="isWhenFirstWeighingFinished" onChange={this.handleOnblur} value={JSON.parse(this.state.isWhenFirstWeighingFinished.value).content} placeholder='称重完成，重量%mz%kg，请下秤' />
                            </div>
                            <div className='line'>
                                <label><input name="isWhenOnDaemonScreen" onChange={this.handleChecked} checked={JSON.parse(this.state.isWhenOnDaemonScreen.value).type == 1} type="checkbox"></input>启用无人值守大屏幕</label>
                                <input type="text" name="isWhenOnDaemonScreen" onChange={this.handleOnblur} value={JSON.parse(this.state.isWhenOnDaemonScreen.value).content} placeholder='称重完成，毛重%mz%kg，皮重%pz%kg，净重%jz%kg，请下秤' />
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={13}>
                    <div className='tabBox'>
                        <h2 className='left'>超载报警：</h2>
                        <div className='right'>
                            <div className='line'>
                                <label><input name="WarningWeighingWay" type="radio" value="0" onChange={this.handleChecked} checked={this.state.WarningWeighingWay.value == '0'} /> 不启用 </label>
                                <label><input name="WarningWeighingWay" type="radio" value="1" onChange={this.handleChecked} checked={this.state.WarningWeighingWay.value == '1'} /> 毛重报警 </label>
                                <label><input name="WarningWeighingWay" type="radio" value="2" onChange={this.handleChecked} checked={this.state.WarningWeighingWay.value == '2'} /> 净重报警 </label>
                            </div>
                            <div className='line'>
                                <label>报警重量：<input type="text" name="WarningWeight" onChange={this.handleOnblur} value={this.state.WarningWeight.value} placeholder='' /> kg</label>
                            </div>
                            <div>
                                <input type="text" name="WarningWeightMessage" onChange={this.handleOnblur} value={this.state.WarningWeightMessage.value} placeholder='毛重%mz%kg，已超载' />
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={14}>
                    <div className='tabBox'>
                        <h2 className='left'>数据备份：<span className='tips'>(splite数据库)</span></h2>
                        <div className='right'>
                            <div className='line'>
                                <label>自动备份：</label>
                                <select onChange={this.handleSelected}>
                                    <option value="">无</option>
                                    <option value="">每天</option>
                                    <option value="">每周</option>
                                    <option value="">每月</option>
                                </select>
                            </div>
                            <div className='line'>
                                <label>备份路径：</label>
                                <input type="file" name="file" />
                            </div>
                            <div className='line'>
                                <button className='btn-basic'>手动备份</button>
                                <button className='btn-basic'>打开备份文件夹</button>
                                <button className='btn-basic'>数据恢复</button>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            
                <button className='system-save-btn' onClick={this.handleSave}>保存</button>
            </div>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(SystemSettings);

