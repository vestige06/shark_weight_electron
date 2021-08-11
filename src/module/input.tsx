import React from 'react';
import TextField from '@material-ui/core/TextField';


class Input extends React.Component<any>{
    render(){
        
        return (
            <div className='inp'>
              <TextField  size="small" id={this.props.id} label={this.props.label} type={this.props.type} variant={this.props.variant} autoComplete={this.props.autoComplete}/>
            </div>
        );
    }
}
export {Input};