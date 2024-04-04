import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Box, Button, Container, Grid, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography,tableCellClasses }  from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import Map from './Map';

export default function App() {    
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [pageApi, setPageApi] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(pageApi);
},[pageApi,inputs]);

    const fetchData = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/search?page=${pageApi}`,inputs);
            setUsers(response.data.data.data);
            setTotalPages(response.data.count);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

  const handlechange = (e) =>{
    e.preventDefault();
    
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values=>({...values, [name]: value}));
}
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:'blue',
      color:'white',
      border: '1px solid hsl(0,0%,80%)',
      borderTopStyle:'none'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <Container maxWidth='xl' style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
    <Typography variant="h4" color="blue">Reference Search</Typography>
    <Stack flexDirection={'row'}  justifyContent={'center'} marginTop={3} gap={2} flexWrap={'wrap'} maxWidth={'66%'}>
        <TextField  id="outlined-basic" label="Unique Id" variant="outlined" name='unique_id' InputProps={{style: {borderRadius: "3rem"}}} onChange={handlechange} />
        <TextField id="outlined-basic" label="Supplier Id" variant="outlined" InputProps={{style: {borderRadius: "3rem"}}}/>
    </Stack>
    <Grid container flexDirection={'row'} justifyContent={'space-between'} flexWrap={'wrap'} mt={1}>
    <Grid item xs={6}  width='50%' mt={3}>
      <TableContainer style={{ overflowX: 'auto', border:'1px solid hsl(0,0%,80%)', borderRadius:'10px', borderLeftStyle:'none',borderRightStyle:'none' }}>
        <Table  sx={{
          minWidth: 600
        }} aria-label="customized table">
          <TableHead >
            <TableRow  style={{ minHeight: '5px', height:'10px' }}>
              {HotelSearchColumn.map((column) => (
                <StyledTableCell className='tableRow'>{column.headerName}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow >
              {HotelSearchColumn.map((column) => (
                <TableCell style={{ border: '1px solid hsl(0,0%,80%)', borderBottomStyle:'none' }}></TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  
      <Grid item xs={8} height={500} mt={3}>
      <DataGrid
          getRowId={(users) => users.ind} columns={HotelSearchColumn}  rows={users.map(user => ({...user, ind: user.ind + 1}))}
          pagination={false}
        pageSize={10}
        checkboxSelection
        disableRowSelectionOnClick
        rowCount={totalPages * 7}
      />
       <Pagination count={totalPages} onChange={(e, value) => setPageApi(value)} />
      </Grid>
      <Grid item xs={3.7} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box marginTop={'-2rem'} >
        <Map />
        </Box>
        <Box mt={3} mb={3} sx={{display:'flex', justifyContent:'center'}}>
          <Button variant="contained">Save Changes</Button>
        </Box>
      </Grid>
    </Grid>
</Container>
  );
}

const HotelSearchColumn = [
  {field:'ind',headerName:'ID', minWidth: 70, Cell:({value})=><span>{value + 1}</span>,},
  {field:'unique_id',headerName:'Unique ID',minWidth: 100,},
  {field:'name',headerName:'Hotel Name',minWidth: 130,},
  {field:'address',headerName:'Address',minWidth: 200,},
  {field:'latitude',headerName:'Latitude',minWidth: 130,},
  {field:'longitude',headerName:'Longitude',minWidth: 130,},
  {field:'unique_supplier_id',headerName:'Unique Supplier ID',minWidth: 130,},
]
