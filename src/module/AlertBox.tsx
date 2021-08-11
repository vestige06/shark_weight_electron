import React from 'react';
require('../pages/App.css')
import { Input } from '../module/input';
import {User} from '../model/User'
class AlertBox extends React.Component{
    constructor(props:any){
        super(props)
        this.state={
            isCloseWindow:false
        }
    }
    async handleClose(){
        const UserId = document.querySelector('#UserId') as HTMLInputElement;
        const UserName = document.querySelector('#UserName') as HTMLInputElement;
        const UserRole = document.querySelector('#UserRole') as HTMLInputElement;
        console.log('UserId',UserId.value)
        const userList = await User.getInstance()._ins.query('insert into user(UserName,LoginId,UserRole) values("hn","11","财务")' );
    }
    render(){
        return(
            <div className='alert-box' style={{margin:'15%'}}>
                <div className='logo'>TruckScale</div>
                   <div className='inputBox'><Input id="UserId" label="登录ID" type="UserId" variant="outlined" /></div>
                   <div className='inputBox'><Input id="UserName" label="用户姓名" type="UserName" variant="outlined" /></div>
                   <div className='inputBox'>
                   <select id = "functionCode">
                        <option value = "">系统管理员</option>
                        <option value = "">司磅员</option>
                        <option value = "">财务</option>
                   </select>
                </div>
                  <div className='loginBtn' >
                    <button className='btn-basic' onClick={()=>{this.handleClose()}}>新增</button>
                  </div>
            </div>
        )
    }
}
export {AlertBox}
