import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CameraFrontIcon from '@material-ui/icons/CameraFront';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import GroupIcon from '@material-ui/icons/Group';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { DataGrid } from '@material-ui/data-grid';
import {User} from '../model/User';
import {Role} from '../model/Role';
import {Customer} from '../model/Customer';
import {Car} from '../model/Car'
import {Goods} from '../model/Goods'
import {ICCard} from '../model/ICCard'
import {SysField} from '../model/SysField'
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
let { ipcRenderer, remote } = window.require('electron');
const mainProc = remote.require('./main');
class TabPanel extends React.Component<any>{
    constructor(props:any){
        super(props);
    }
  render(){
  const { children, value, index, ...other } = this.props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };
class ScrollableTabsButtonForce extends React.Component<any>{
  state:any;
  columns:any;
  columns1:any;
  columns2:any;
  columns3:any;
  columns4:any;
  columns5:any;
  columns6:any;
  useStyles:any;
  // const [modalStyle] = React.useState(getModalStyle);
   
    constructor(props:any){
        super(props);
        this.state={
          rows:[],
          rows1:[],
          rows2:[],
          rows3:[],
          rows4:[],
          rows5:[],
          rows6:[],
          value:0,
          openRows:false,
          open:false,
          open1:true,
          open2:false,
          open3:false,
          open4:false,
          open5:false,
          open6:false
        }
        this.columns = [
          { field: 'UserId', headerName: '编号', width: 80 },
          { field: 'UserName', headerName: '用户姓名', width: 100 },
          { field: 'UserRole', headerName: '用户角色', width: 100 },
          { field:'LoginId', headerName: '登录Id', width: 100 },
          { field: 'Valid',headerName: '启用/禁用',width: 100},
        ];
        this.columns1 = [
          { field: 'RoleName', headerName: '角色名称', width: 100 },
          { field: 'RolePermission', headerName: '角色权限', width: 100 },
          { field: 'Valid',headerName: '启用/禁用',width: 100},
        ];
        this.columns2 = [
          { field: 'Num', headerName: '客户编号', width: 100 },
          { field: 'Name', headerName: '客户名称', width: 100 },
          { field: 'Type', headerName: '客户类型', width: 100 },
          { field:'Manager', headerName: '负责人', width: 100 },
          { field: 'Phone',headerName: '联系电话',width: 100 },
          { field: 'Comment', headerName: '备注', width: 100 },
          { field: 'Valid',headerName: '启用/禁用',width: 100},
        ];
        this.columns3 = [
          { field: 'PlateNo', headerName: '车牌号', width: 80 },
          { field: 'VehicleWeight', headerName: '车辆皮重', width: 100 },
          { field: 'CarOwner', headerName: '车主', width: 100 },
          { field:'AutoNo', headerName: '车辆标签', width: 100 },
          { field: 'Comment', headerName: '备注', width: 100 },
          { field:'WeightUnit', headerName:'重量单位', width: 100},
          { field: 'Valid',headerName: '启用/禁用',width: 100},
        ];
        this.columns4 = [
          { field: 'Num', headerName: '物资编号', width: 80 },
          { field: 'Name', headerName: '物资名称', width: 100 },
          { field: 'Type', headerName: '物资类型', width: 100 },
          { field:'Comment', headerName: '备注', width: 100 },
          { field: 'Valid',headerName: '启用/禁用',width: 100},
        ];
        this.columns5 = [
          { field: 'Id', headerName: '卡号', width: 80 },
          { field: 'CustomerId', headerName: '客户', width: 100 },
          { field: 'CarAutoNo', headerName: '车辆', width: 100 },
          { field:'GoodssId', headerName: '物资', width: 100 },
        ];
        this.columns6 = [
          { field: 'FieldType', headerName: '字段类型', width: 80 },
          { field: 'FieldValue', headerName: '字段值', width: 100 },
          { field: 'Valid',headerName: '启用/禁用',width: 100},
        ];
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClickOpen1 = this.handleClickOpen1.bind(this);
        this.handleClickOpen2 = this.handleClickOpen2.bind(this);
        this.handleClickOpen3 = this.handleClickOpen3.bind(this);
        this.handleClickOpen4 = this.handleClickOpen4.bind(this);
        this.handleClickOpen5 = this.handleClickOpen5.bind(this);
        this.handleClickOpen6 = this.handleClickOpen6.bind(this);
    }
    // tabs
    a11yProps(index:any) {
      return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
      };
    }
    componentDidMount(){
      this.getRows();
      this.getRows1();
    }
    async getRows(){
      const users = await User.getInstance()._model.findAll();
      this.setState({
          rows:users,
      })
    }
    async getRows1(){
      const role = await Role.getInstance()._model.findAll();
      this.setState({
          rows1:role,
      })
    }
    async getRows2(){
      const customer = await Customer.getInstance()._model.findAll();
      this.setState({
          rows1:customer,
      })
    }
    async getRows3(){
      const car = await Car.getInstance()._model.findAll();
      this.setState({
          rows1:car,
      })
    }
    async getRows4(){
      const goods = await Goods.getInstance()._model.findAll();
      this.setState({
          rows1:goods,
      })
    }
    async getRows5(){
      const icCard = await ICCard.getInstance()._model.findAll();
      this.setState({
          rows1:icCard,
      })
    }
    async getRows6(){
      const sysField = await SysField.getInstance()._model.findAll();
      console.log('==============================')
      console.log(sysField)
      this.setState({
          rows1:sysField,
      })
    }
    async handleClickOpen (){
      const UserId = document.querySelector('#UserId') as HTMLInputElement;
      const UserName = document.querySelector('UserName') as HTMLInputElement;
      this.setState({
        open:true
      })
    };
    async handleClickOpen1 (){
      this.setState({
        open1:true
      })
    };
    async handleClickOpen2 (){
      this.setState({
        open2:true
      })
    };
    async handleClickOpen3 (){
      this.setState({
        open3:true
      })
    };
    async handleClickOpen4 (){
      this.setState({
        open4:true
      })
    };
    async handleClickOpen5 (){
      this.setState({
        open5:true
      })
    };
    async handleClickOpen6 (){
      this.setState({
        open6:true
      })
    };    
    handleClose = () => {
      this.setState({
        open:false,
        open1:false,
        open2:false,
        open3:false,
        open4:false,
        open5:false,
        open6:false
      })
    };
  render(){
  const classes = (theme:any):any => {
      return withStyles({
      root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
    })
  };
  const handleChange = (event:any, newValue:any) => {
    // setValue(newValue);
    this.setState({
      value:newValue
    });
  };
  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={this.state.value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="用户管理" icon={<PersonPinIcon />} {...this.a11yProps(0)} />
          <Tab label="角色管理" icon={<CameraFrontIcon />} {...this.a11yProps(1)} />
          <Tab label="客户管理" icon={<GroupIcon />} {...this.a11yProps(2)} />
          <Tab label="车辆管理" icon={<DirectionsCarIcon />} {...this.a11yProps(3)} />
          <Tab label="物资管理" icon={<AllInboxIcon />} {...this.a11yProps(4)} />
          <Tab label="IC卡管理" icon={< AccountBoxIcon />} {...this.a11yProps(5)} />
          <Tab label="系统字段" icon={<SettingsApplicationsIcon />} {...this.a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={this.state.value} index={0}>

        <span className='data-table'>
          <DataGrid rows={this.state.rows} columns={this.columns} pageSize={6} />
        </span>
        <span className='btns'>
          <button onClick={this.handleClickOpen}>新增</button>
          <Dialog open={this.state.open}>
            <div className='dialog-box'>
              <div className='close-dialog' onClick={this.handleClose} ><span>用户管理</span><CloseIcon /></div>
              <div><span>登录 ID：</span><input type="text" id='UserId'/></div>
              <div><span>用户姓名：</span><input type="text" id='UserName'/></div>
              <div><span>用户角色：</span>
                <select id='UserRole'>
                    <option>系统管理员</option>
                    <option>司磅员</option>
                    <option>财务</option>
                </select>
              </div>
              <button onClick={this.handleClose} className='close-sialog-btn'>
                新增
              </button>
            </div>
          </Dialog>
          <button>修改</button>
          <button>启用</button>
          <button>禁用</button>
          <button>清除密码</button>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={1}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows1} columns={this.columns1} pageSize={6} />
        </span>
        <span className='btns'>
          <button onClick={this.handleClickOpen1}>新增</button>
            <Dialog open={this.state.open1}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} >
                  <span>角色管理</span>
                  <CloseIcon />
                </div>
                <div><span>角色名称：</span><input type="text" id=''/></div>
                <div><span>角色权限：</span><span>(可多选)</span>
                  <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                  >
                    <TreeItem nodeId="1" label="所有权限">
                      <div className='tree-box'><TreeItem nodeId="2" label="称重操作" /> <input type='checkbox'/></div>
                      <div className='tree-box'><TreeItem nodeId="3" label="修改榜单样式" /> <input type='checkbox'/></div>
                      <div className='tree-box'><TreeItem nodeId="4" label="数据备份恢复" /> <input type='checkbox'/></div>
                      <TreeItem nodeId="5" label="称重记录查询" > 
                          <div className='tree-box'><TreeItem nodeId="6" label="查询列表" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="7" label="打印列表" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="8" label="导出列表" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="9" label="删除列表" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="10" label="修改选中" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="11" label="删除选中" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="12" label="补打选中" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="13" label="手工制单" /> <input type='checkbox'/></div>
                      </TreeItem>
                      <TreeItem nodeId="14" label="称重报表统计" > 
                          <div className='tree-box'><TreeItem nodeId="15" label="查询报表" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="16" label="打印报表" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="17" label="导出报表" /> <input type='checkbox'/></div>
                      </TreeItem>
                      <TreeItem nodeId="18" label="数据管理" > 
                          <div className='tree-box'><TreeItem nodeId="19" label="用户管理" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="20" label="角色管理" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="21" label="客户管理" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="22" label="车辆管理" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="23" label="物资管理" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="24" label="IC卡管理" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="25" label="系统字段" /> <input type='checkbox'/></div>
                      </TreeItem>
                          <div className='tree-box'><TreeItem nodeId="26" label="系统设置" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="27" label="系统日志查询" /> <input type='checkbox'/></div>
                    </TreeItem>
                  </TreeView>
                </div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  新增
                </button>
              </div>
            </Dialog>
          <button>修改</button>
          <button>启用</button>
          <button>禁用</button>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={2}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows2} columns={this.columns2} pageSize={6} />
        </span>
        <span className='btns'>
        <button onClick={this.handleClickOpen2}>新增</button>
            <Dialog open={this.state.open2}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>客户管理</span><CloseIcon /></div>
                
                <div><span>客户编号：</span><input type="text" id=''/></div>
                <div><span>客户姓名：</span><input type="text" id=''/></div>
                <div><span>客户类型：</span>
                  <select>
                      <option>请选择</option>
                  </select>
                </div>
                <div><span>负责人：</span><input type="text" id=''/></div>
                <div><span>联系电话：</span><input type="text" id=''/></div>
                <div><span>备注：</span><textarea /></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  新增
                </button>
              </div>
            </Dialog>
          <button>修改</button>
          <button>启用</button>
          <button>禁用</button>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={3}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows3} columns={this.columns3} pageSize={6} />
        </span>
        <span className='btns'>
        <button onClick={this.handleClickOpen3}>新增</button>
            <Dialog open={this.state.open3}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>车辆管理</span><CloseIcon /></div>
                <div><span>车牌号：</span><input type='text' placeholder='⇠ 快捷输入' /></div>
                <div><span>车辆皮重：</span><input type="text" id=''/></div>
                <div><span>车主：</span>
                  <select>
                      <option>请选择</option>
                  </select></div>
                <div><span>备注：</span><textarea /></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  新增
                </button>
              </div>
            </Dialog>
          <button>修改</button>
          <button>启用</button>
          <button>禁用</button>
          <button>绑定标签</button>
          <button>清除标签</button>
          <label>查找列表中的车牌 <input style={{width:'20%'}} type="text" placeholder=''/></label>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={4}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows4} columns={this.columns4} pageSize={6} />
        </span>
        <span className='btns'>
          <button onClick={this.handleClickOpen4}>新增</button>
            <Dialog open={this.state.open4}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>物资管理</span><CloseIcon /></div>
                <div><span>物资编号：</span><input type="text" id=''/></div>
                <div><span>物资名称：</span><input type="text" id=''/></div>
                <div><span>物资类型：</span>
                  <select>
                      <option>请选择</option>
                  </select>
                </div>
                <div><span>备注：</span><textarea /></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  新增
                </button>
              </div>
            </Dialog>
          <button>修改</button>
          <button>启用</button>
          <button>禁用</button>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={5}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows5} columns={this.columns5} pageSize={6} />
        </span>
        <span className='btns'>
          <span>列表操作：</span>
          <button>修改选中</button>
          <button>删除选中</button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span >列表操作：</span>
          <button>查卡</button>
          <button>写卡</button>
          <button onClick={this.handleClickOpen5}>手动新增</button>
            <Dialog open={this.state.open5}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>IC卡管理</span><CloseIcon /></div>
                <div><span>卡号：</span><input type="text" id=''/></div>
                <div><span>客户：</span><input type="text" id=''/></div>
                <div><span>车辆：</span><input type="text" id=''/></div>
                <div><span>物资：</span><input type="text" id=''/></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  新增
                </button>
              </div>
            </Dialog>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={6}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows6} columns={this.columns6} pageSize={6} />
        </span>
        <span className='btns'>
        <button onClick={this.handleClickOpen6}>新增</button>
            <Dialog open={this.state.open6}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>系统字段</span><CloseIcon /></div>
                <div><span>字段类型：</span><input type="text" id=''/></div>
                <div><span>字段值：</span><input type="text" id=''/></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  新增
                </button>
              </div>
            </Dialog>
          <button>修改</button>
          <button>启用</button>
          <button>禁用</button>
        </span>
      </TabPanel>
    </div>
  );
}
}
export default ScrollableTabsButtonForce;