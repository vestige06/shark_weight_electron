/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
const filter = createFilterOptions<any>();
class SelectFuzzy extends React.Component <any>{
  constructor(props:any){
      super(props);
  }

  render(){
    const { classes } = this.props;
    
    return (
          <Autocomplete
            options={this.props.options}
            value={this.props.value}
            onChange={(event: any, newValue:any)=>{
                this.props.onChange(this.props.type,newValue);
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                if (params.inputValue !== '') {
                    if(this.props.type === '_ch'){
                        filtered.push({
                            PlateNo: `${params.inputValue}`,
                        });
                    }
                    else if(this.props.type === '_kh'){
                        filtered.push({
                            Name: `${params.inputValue}`,
                        });
                    }
                    else if(this.props.type === '_wz'){
                        filtered.push({
                            Type: `${params.inputValue}`,
                        });
                    }
                }
                return filtered;
            }}
            freeSolo={true}
            getOptionLabel={(option: any) => {
                if(this.props.type === '_ch'){
                    return option.PlateNo;
                }
                else if(this.props.type === '_kh'){
                    return option.Name;
                }
                else if(this.props.type === '_wz'){
                    return option.Type;
                }
            }}
            // selectOnFocus
            renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input 
                  className={this.props.className} 
                  style={{outline:'none'}} 
                  type="text"  
                  {...params.inputProps} 
                  data-origin={this.props['data-origin']} />
                </div>
              )}
          />
      );
  }
}

interface selectOptionType {
    Name?: string;
    Type?: string;
    PlateNo?: string;
  }

export default withStyles({
    label: {
      display: 'block',
    },
    input: {
      width: 200,
    },
    listbox: {
      width: 200,
      margin: 0,
      padding: 0,
      zIndex: 1,
      position: 'absolute',
      listStyle: 'none',
    //   backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      maxHeight: 200,
      border: '1px solid rgba(0,0,0,.25)',
      '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
      },
      '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
      },
    },
    outline:{
        outline:'none'
    }
  })(SelectFuzzy);