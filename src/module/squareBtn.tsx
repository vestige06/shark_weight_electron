import React from 'react';
import './squareBtn.css';

import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

interface squareBtnProp{
    icon:string,
    feature:string
}
class SquareBtn extends React.Component<any,squareBtnProp>{
    constructor(props:any){
        super(props);
      }
    getIcon(){
        if(this.props.icon==1){
            return  <AssignmentIcon />;
        }else if(this.props.icon==2){
            return <AssessmentIcon />;
        }else{
            return <SettingsApplicationsIcon />;
        }
    }
    render(){
        const iconObj = this.getIcon();
        return(
            <div className='squareBtn'>
                <div className='icon'>{iconObj}</div>
                <span>{this.props.feature}</span>
            </div>
            )
    }
}
export  {SquareBtn};