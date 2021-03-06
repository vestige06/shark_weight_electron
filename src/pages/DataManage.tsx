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
          { field: 'UserId', headerName: '??????', width: 80 },
          { field: 'UserName', headerName: '????????????', width: 100 },
          { field: 'UserRole', headerName: '????????????', width: 100 },
          { field:'LoginId', headerName: '??????Id', width: 100 },
          { field: 'Valid',headerName: '??????/??????',width: 100},
        ];
        this.columns1 = [
          { field: 'RoleName', headerName: '????????????', width: 100 },
          { field: 'RolePermission', headerName: '????????????', width: 100 },
          { field: 'Valid',headerName: '??????/??????',width: 100},
        ];
        this.columns2 = [
          { field: 'Num', headerName: '????????????', width: 100 },
          { field: 'Name', headerName: '????????????', width: 100 },
          { field: 'Type', headerName: '????????????', width: 100 },
          { field:'Manager', headerName: '?????????', width: 100 },
          { field: 'Phone',headerName: '????????????',width: 100 },
          { field: 'Comment', headerName: '??????', width: 100 },
          { field: 'Valid',headerName: '??????/??????',width: 100},
        ];
        this.columns3 = [
          { field: 'PlateNo', headerName: '?????????', width: 80 },
          { field: 'VehicleWeight', headerName: '????????????', width: 100 },
          { field: 'CarOwner', headerName: '??????', width: 100 },
          { field:'AutoNo', headerName: '????????????', width: 100 },
          { field: 'Comment', headerName: '??????', width: 100 },
          { field:'WeightUnit', headerName:'????????????', width: 100},
          { field: 'Valid',headerName: '??????/??????',width: 100},
        ];
        this.columns4 = [
          { field: 'Num', headerName: '????????????', width: 80 },
          { field: 'Name', headerName: '????????????', width: 100 },
          { field: 'Type', headerName: '????????????', width: 100 },
          { field:'Comment', headerName: '??????', width: 100 },
          { field: 'Valid',headerName: '??????/??????',width: 100},
        ];
        this.columns5 = [
          { field: 'Id', headerName: '??????', width: 80 },
          { field: 'CustomerId', headerName: '??????', width: 100 },
          { field: 'CarAutoNo', headerName: '??????', width: 100 },
          { field:'GoodssId', headerName: '??????', width: 100 },
        ];
        this.columns6 = [
          { field: 'FieldType', headerName: '????????????', width: 80 },
          { field: 'FieldValue', headerName: '?????????', width: 100 },
          { field: 'Valid',headerName: '??????/??????',width: 100},
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
          <Tab label="????????????" icon={<PersonPinIcon />} {...this.a11yProps(0)} />
          <Tab label="????????????" icon={<CameraFrontIcon />} {...this.a11yProps(1)} />
          <Tab label="????????????" icon={<GroupIcon />} {...this.a11yProps(2)} />
          <Tab label="????????????" icon={<DirectionsCarIcon />} {...this.a11yProps(3)} />
          <Tab label="????????????" icon={<AllInboxIcon />} {...this.a11yProps(4)} />
          <Tab label="IC?????????" icon={< AccountBoxIcon />} {...this.a11yProps(5)} />
          <Tab label="????????????" icon={<SettingsApplicationsIcon />} {...this.a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={this.state.value} index={0}>

        <span className='data-table'>
          <DataGrid rows={this.state.rows} columns={this.columns} pageSize={6} />
        </span>
        <span className='btns'>
          <button onClick={this.handleClickOpen}>??????</button>
          <Dialog open={this.state.open}>
            <div className='dialog-box'>
              <div className='close-dialog' onClick={this.handleClose} ><span>????????????</span><CloseIcon /></div>
              <div><span>?????? ID???</span><input type="text" id='UserId'/></div>
              <div><span>???????????????</span><input type="text" id='UserName'/></div>
              <div><span>???????????????</span>
                <select id='UserRole'>
                    <option>???????????????</option>
                    <option>?????????</option>
                    <option>??????</option>
                </select>
              </div>
              <button onClick={this.handleClose} className='close-sialog-btn'>
                ??????
              </button>
            </div>
          </Dialog>
          <button>??????</button>
          <button>??????</button>
          <button>??????</button>
          <button>????????????</button>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={1}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows1} columns={this.columns1} pageSize={6} />
        </span>
        <span className='btns'>
          <button onClick={this.handleClickOpen1}>??????</button>
            <Dialog open={this.state.open1}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} >
                  <span>????????????</span>
                  <CloseIcon />
                </div>
                <div><span>???????????????</span><input type="text" id=''/></div>
                <div><span>???????????????</span><span>(?????????)</span>
                  <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                  >
                    <TreeItem nodeId="1" label="????????????">
                      <div className='tree-box'><TreeItem nodeId="2" label="????????????" /> <input type='checkbox'/></div>
                      <div className='tree-box'><TreeItem nodeId="3" label="??????????????????" /> <input type='checkbox'/></div>
                      <div className='tree-box'><TreeItem nodeId="4" label="??????????????????" /> <input type='checkbox'/></div>
                      <TreeItem nodeId="5" label="??????????????????" > 
                          <div className='tree-box'><TreeItem nodeId="6" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="7" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="8" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="9" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="10" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="11" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="12" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="13" label="????????????" /> <input type='checkbox'/></div>
                      </TreeItem>
                      <TreeItem nodeId="14" label="??????????????????" > 
                          <div className='tree-box'><TreeItem nodeId="15" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="16" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="17" label="????????????" /> <input type='checkbox'/></div>
                      </TreeItem>
                      <TreeItem nodeId="18" label="????????????" > 
                          <div className='tree-box'><TreeItem nodeId="19" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="20" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="21" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="22" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="23" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="24" label="IC?????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="25" label="????????????" /> <input type='checkbox'/></div>
                      </TreeItem>
                          <div className='tree-box'><TreeItem nodeId="26" label="????????????" /> <input type='checkbox'/></div>
                          <div className='tree-box'><TreeItem nodeId="27" label="??????????????????" /> <input type='checkbox'/></div>
                    </TreeItem>
                  </TreeView>
                </div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  ??????
                </button>
              </div>
            </Dialog>
          <button>??????</button>
          <button>??????</button>
          <button>??????</button>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={2}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows2} columns={this.columns2} pageSize={6} />
        </span>
        <span className='btns'>
        <button onClick={this.handleClickOpen2}>??????</button>
            <Dialog open={this.state.open2}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>????????????</span><CloseIcon /></div>
                
                <div><span>???????????????</span><input type="text" id=''/></div>
                <div><span>???????????????</span><input type="text" id=''/></div>
                <div><span>???????????????</span>
                  <select>
                      <option>?????????</option>
                  </select>
                </div>
                <div><span>????????????</span><input type="text" id=''/></div>
                <div><span>???????????????</span><input type="text" id=''/></div>
                <div><span>?????????</span><textarea /></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  ??????
                </button>
              </div>
            </Dialog>
          <button>??????</button>
          <button>??????</button>
          <button>??????</button>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={3}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows3} columns={this.columns3} pageSize={6} />
        </span>
        <span className='btns'>
        <button onClick={this.handleClickOpen3}>??????</button>
            <Dialog open={this.state.open3}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>????????????</span><CloseIcon /></div>
                <div><span>????????????</span><input type='text' placeholder='??? ????????????' /></div>
                <div><span>???????????????</span><input type="text" id=''/></div>
                <div><span>?????????</span>
                  <select>
                      <option>?????????</option>
                  </select></div>
                <div><span>?????????</span><textarea /></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  ??????
                </button>
              </div>
            </Dialog>
          <button>??????</button>
          <button>??????</button>
          <button>??????</button>
          <button>????????????</button>
          <button>????????????</button>
          <label>???????????????????????? <input style={{width:'20%'}}??type="text"??placeholder=''/></label>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={4}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows4} columns={this.columns4} pageSize={6} />
        </span>
        <span className='btns'>
          <button onClick={this.handleClickOpen4}>??????</button>
            <Dialog open={this.state.open4}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>????????????</span><CloseIcon /></div>
                <div><span>???????????????</span><input type="text" id=''/></div>
                <div><span>???????????????</span><input type="text" id=''/></div>
                <div><span>???????????????</span>
                  <select>
                      <option>?????????</option>
                  </select>
                </div>
                <div><span>?????????</span><textarea /></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  ??????
                </button>
              </div>
            </Dialog>
          <button>??????</button>
          <button>??????</button>
          <button>??????</button>
        </span>
      </TabPanel>

      <TabPanel value={this.state.value} index={5}>
        <span className='data-table'>
          <DataGrid rows={this.state.rows5} columns={this.columns5} pageSize={6} />
        </span>
        <span className='btns'>
          <span>???????????????</span>
          <button>????????????</button>
          <button>????????????</button>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span >???????????????</span>
          <button>??????</button>
          <button>??????</button>
          <button onClick={this.handleClickOpen5}>????????????</button>
            <Dialog open={this.state.open5}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>IC?????????</span><CloseIcon /></div>
                <div><span>?????????</span><input type="text" id=''/></div>
                <div><span>?????????</span><input type="text" id=''/></div>
                <div><span>?????????</span><input type="text" id=''/></div>
                <div><span>?????????</span><input type="text" id=''/></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  ??????
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
        <button onClick={this.handleClickOpen6}>??????</button>
            <Dialog open={this.state.open6}>
              <div className='dialog-box'>
                <div className='close-dialog' onClick={this.handleClose} ><span>????????????</span><CloseIcon /></div>
                <div><span>???????????????</span><input type="text" id=''/></div>
                <div><span>????????????</span><input type="text" id=''/></div>
                <button onClick={this.handleClose} className='close-sialog-btn'>
                  ??????
                </button>
              </div>
            </Dialog>
          <button>??????</button>
          <button>??????</button>
          <button>??????</button>
        </span>
      </TabPanel>
    </div>
  );
}
}
export default ScrollableTabsButtonForce;