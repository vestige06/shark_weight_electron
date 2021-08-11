import React from 'react';
import './rectangleBtn.css'
interface rectangleBtnProps{
    width?:string,
    way?:string,
    click?:Function
}
class RectangleBtn extends React.Component<any,rectangleBtnProps>{
    render(){
        var reBtnStyle = {
            // 一、设置样式变量
            width:this.props.width
        }
        return(
            // 二、引用样式+传值
            <div className='rectangleBtn' style={reBtnStyle} onClick={this.props.click}>
               <div>{this.props.way}</div>
            </div>
            )
    }
}
export  {RectangleBtn};