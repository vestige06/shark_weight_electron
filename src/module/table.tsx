import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: '登录ID', width: 80 },
  { field: 'firstName', headerName: '用户姓名', width: 80 },
  { field: 'lastName', headerName: '用户角色', width: 80 },
  {
    field: 'age',
    headerName: '启用/禁用',
    type: 'number',
    width: 80,
  }
];

const rows = [
  
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  
];

class Table extends React.Component{

  render(){
    return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={2} checkboxSelection />
        </div>
      );
  }
}
export  {Table};