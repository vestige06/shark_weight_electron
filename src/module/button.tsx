import React from 'react';
import Button from '@material-ui/core/Button';

var btnStyle = {
    display:'inline',
    margin:'5px',
}
class Appbutton extends React.Component<any>{
    render(){
        return (
          <div style={btnStyle}>
            <Button
              variant="contained"
              color="default"
              className='btns'
            >
              {this.props.buttonName}
            </Button>
          </div>
        );
    }
  
}
export  {Appbutton};