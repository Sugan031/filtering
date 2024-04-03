import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import {countriesForTable} from './App';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'country name', headerName: 'country', width: 300 },
  { field: 'country code', headerName: 'country code', width: 300 },
];
export default function DataTable() {

    const countries = React.useContext(countriesForTable);
    console.log(countries.name);

    const rows = Object.values(countries).map(country => ({
        id: country.id,
        name: country.name,
        iso2: country.iso2,
      }));
    
    return (
      <Box marginTop='10px' sx={{display:'flex' ,height:'600px', width: '50%', justifyContent:'center', alignItems:'center', marginLeft:'20%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    );
  }