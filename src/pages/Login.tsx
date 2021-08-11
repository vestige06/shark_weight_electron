import React from 'react';
// import TextField from '@material-ui/core/TextField';
import { Input } from '../module/input';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ChangePassword} from '../module/changePassword'
import {User} from '../model/User'
import MuiAlert from '@material-ui/lab/Alert';

require('./Login.css');

class LoginPage extends React.Component{
    state:any;
    constructor(props:any){
        super(props);
        this.state={
            isShow:false,
            amount: '',
            password: '',
            weight: '',
            weightRange: '',
            showPassword: false,
            isLogin: '',
        }
    }
    changeCodeShow(){
        this.setState({
            isShow: !this.state.isShow,
            
        })
    }
    async getLogin(){
      // const reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}'); 
      const UserName = document.querySelector('#username') as HTMLInputElement;
      const Password = document.querySelector('#password') as HTMLInputElement;
      const users = await User.getInstance()._model.findOne(
        {
          where:{
            LoginId:UserName.value,
            LoginPwd:Password.value
          }
        }
      );
      
      if (users){
        //登录跳转
        window.location.hash='/App';
        // alert('您已登录成功')
        let localUser = {"LoginIsd":UserName.value,"LoginPwd":Password.value};
        let strLocalUser = JSON.stringify(localUser);
        localStorage.setItem('users',strLocalUser);
        let one:any = localStorage.getItem('users');
        let two = JSON.parse(one);
        console.log('--------------');
        console.log(two);
      }else{
        this.setState({
          isLogin: false
        });
      }
    }

    getRegister(){
        window.open('/#/Register');
    }
    

    render(){
      return (
          <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
              <div className='login'>
                  <div className='logo'>TruckScale</div>
                  <div className='inputBox'>
                    <Input id="username" label="用户名" type="username" variant="outlined" /></div>
                  <div className='inputBox'><Input
                  className='inputBox-password'
                  id="password"
                  label="密码"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  /></div>
                  <div className='loginBtn'>
                    <button onClick={e=> this.getLogin()}><span>登录</span></button>
                    <button onClick={e => this.getRegister()}>注册</button>
                  </div>
                  {this.state.isLogin === false &&<MuiAlert severity="error">您输入的信息有误，请重新输入</MuiAlert>}
              <div className='forget' onClick={e => this.changeCodeShow()}>忘记密码</div>
              {this.state.isShow && <ChangePassword />}
              <div className='more'>
              <Accordion >
                  <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  >
                  <Typography><span>启动设置</span></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <div>
                      <label><input className='checkBox' type="checkbox"></input>开机自启</label>
                      <label><input className='checkBox' type="checkbox"></input>记住密码</label>
                      <label><input className='checkBox' type="checkbox"></input>自动登录</label>
                  </div>
                  <div>
                      <div>修改数据库路径 <span className='dataTip'> *切换数据库后需要重启软件</span></div>
                      <div>
                        <label><input  type="radio" value="" /> SQLite数据库 </label> 
                        <label>选择路径：<input  type="text"></input></label>
                      </div>
                      <div>
                        <label><input  type="radio" value="" /> MySQL数据库 </label> 
                        <label>IP地址：<input type="text" placeholder='127.0.0.1'/></label>
                      </div>
                  </div>
                  </AccordionDetails>
              </Accordion>
              </div>
          </div>
          </Container>
      </React.Fragment>
        
    );
  }
}
export default LoginPage;