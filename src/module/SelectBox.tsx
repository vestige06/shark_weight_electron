import React from 'react';
import './SelectBox.css'

class SelectBox extends React.Component{


  render(){
    return (
      <span style={{marginRight:'20px'}}>
        <select id = "optionList"/>
      </span>
    );
  }

}
export  {SelectBox};
