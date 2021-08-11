import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '../module/input';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import {User} from '../model/User'
import MuiAlert from '@material-ui/lab/Alert';


require('../pages/App.css');



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

class Register extends React.Component{
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
            isLogin: false,
        }
    }
    changeCodeShow(){
        this.setState({
            isShow: !this.state.isShow,
        })
    }
    async RegisterIn(){
      // const reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
      const UserName = document.querySelector('#username') as HTMLInputElement;
      const Password = document.querySelector('#password') as HTMLInputElement;
      const users = await User.getInstance()._model.findOne();
      console.log("users",UserName.value);
      console.log("users",users.LoginId==UserName.value);
      console.log("users",Password.value);
      console.log("users",users.LoginPwd==Password.value);
      if (users.LoginId==UserName.value&&users.LoginPwd==Password.value){
        //登录跳转
        window.location.hash='/App';
        // alert('您已登录成功')
      }else{
        // alert('您输入的信息有误，请重新输入');
        this.setState({
          isLogin: true
        })
        return 
      }
    }
    try(){
        window.location.hash='/App';
    }

    render(){
      return (
          <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
              <div className='login'>
                  <div className='logo'>TruckScale</div>
                  <div className='inputBox'><Input id="username" label="用户名" type="username" variant="outlined" /></div>
                  <div className='inputBox'><Input
                  id="password"
                  label="密码"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  /></div>
                  <div className='loginBtn'>
                      <button onClick={e=> this.RegisterIn()}>注册</button>
                      <button onClick={e => this.try()}>先试用一下</button>
                  </div>
                  {this.state.isLogin&&<MuiAlert severity="error">您输入的信息有误，请重新输入</MuiAlert>}
          </div>
          </Container>
      </React.Fragment>
    );
  }
}
export {Register};