import React from "react";
class ChangeNameAndListOrder extends React.Component<any>{
    constructor(props:any){
        super(props)
    }
    render(){
        return(  
            <div>
                <table className='formTable'>
                    <tr>
                        <th>过磅单字段</th>
                        <th>过磅单名称</th>
                    </tr>
                    <tr>
                        <td>_bh</td>
                        <td>编号</td>
                    </tr>
                    <tr>
                        <td>_kh</td>
                        <td>客户</td>
                    </tr>
                    <tr>
                        <td>_ch</td>
                        <td>车号</td>
                    </tr>
                    <tr>
                        <td>_wz</td>
                        <td>物资</td>
                    </tr>
                    <tr>
                        <td>_mz</td>
                        <td>毛重</td>
                    </tr>
                    <tr>
                        <td>_pz</td>
                        <td>皮重</td>
                    </tr>
                    <tr>
                        <td>_jz</td>
                        <td>净重</td>
                    </tr>
                    <tr>
                        <td>_mzrq</td>
                        <td>毛重日期</td>
                    </tr>
                    <tr>
                        <td>_pzrq</td>
                        <td>皮重日期</td>
                    </tr>
                    <tr>
                        <td>_bz</td>
                        <td>备注</td>
                    </tr>
                </table>
                <button className='save-list'>保存列表顺序</button>
                <div className='save-input'>
                    <div>
                        <div className='save-input-text'>过磅单字段 <input type="text" /></div>
                        <div>过磅单名称 <input type="text" /></div>
                    </div>
                    <div><button className='save-btn'>保存名称</button></div>
                </div>
            </div>
        )
    }
}
export {ChangeNameAndListOrder}