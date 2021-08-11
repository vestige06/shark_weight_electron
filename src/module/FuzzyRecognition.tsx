
import React from "react";
class FuzzyRecognition extends React.Component<any>{
    constructor(props: any) {
        super(props)
    }
    render() {
        return (
            <div className='form-editor'>
                <div><label><input type="checkbox"></input>启用车牌模糊识别</label></div>
                <div>每行输入一个需要进行模糊识别的车牌号</div>
                <div>
                    <textarea disabled rows={20} cols={40}>
                        渝G5XB28
                    </textarea>
                </div>
                <button className='car-licence'>保存</button>
            </div>
        )
    }
}
export { FuzzyRecognition }
