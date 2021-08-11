import React from 'react';
import Button from '@material-ui/core/Button';
import '../pages/Login.css'
import { Input } from '../module/input';

class ChangePassword extends React.Component{
    render(){
        return(
        <div>
            <div className='inputBox'><Input id="outlined-search" label="新密码" type="search" variant="outlined" /></div>
            <div className='inputBox'><Input
            id="outlined-password-input"
            label="新密码确认"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            /></div>
            <div className='loginBtn'>
            <button><span>修改密码</span></button>
                <span className='dataTip'>在登录框输入用户名+原密码</span>
            </div>
        </div>
        )
    }
}
export {ChangePassword};