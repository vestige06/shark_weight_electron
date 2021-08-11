import React from "react";
class FormulaEditor extends React.Component<any>{
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div className='form-editor'>
                <div>
                    <p>公式可用字段</p>
                    <div className='article-text'>
                        <p>毛重：_mz   皮重：_pz   净重：_jz</p>
                        <p>扣重：_kz   扣率：_kl   实重：_sz</p>
                        <p>备用字段：_by1，_by2......_by5</p>
                    </div>
                </div>
                <div>
                    <p>常用函数</p>
                    <div className='article-text'>
                        <p>向上取整：Ceiling(5.2) = 6</p>
                        <p>向下取整：Floor(5.8) = 5</p>
                        <p>四舍五入：Round(3.1415926,2) = 3.14</p>
                    </div>
                </div>
                <div><a href="">更多函数及示例详见帮助文档</a></div>
                <div className='article-input-text'>备用字段1公式 <input type="text" /></div>
                <div className='article-input-text'>备用字段2公式 <input type="text" /></div>
                <div className='article-input-text'>备用字段3公式 <input type="text" /></div>
                <div className='article-input-text'>备用字段4公式 <input type="text" /></div>
                <div className='article-input-text'>备用字段5公式 <input type="text" /></div>
                <button>保存</button>
            </div>
        )
    }
}
export { FormulaEditor }