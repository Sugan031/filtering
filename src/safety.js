import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Box, Button, Container, Grid, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography,tableCellClasses }  from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import Map from './Map';

export default function App() {    
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageApi, setPageApi] = useState(1)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchData(pageApi);
}, [pageApi]);

    const fetchData = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/search?page=${pageApi}`,inputs);
            setUsers(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    console.log(Array.isArray(users));
  const handlechange = async(event) =>{

    
    const name = event.target.name;
    const value = event.target.value;
    console.log("🚀 ~ handlechange ~ value:", value)
    let inputObj = {'unique_id': value}
    setInputs(inputObj)
    console.log("inputs: ",inputObj);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/search', inputs);
      console.log(response.data);
      setUsers(response.data.data);
  }
  catch (error) {
    console.error('Error while submitting form:', error);
}
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
                <StyledTableCell className='tableRow'>{column.label}
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
        rows={users}
        columns={HotelSearchColumn}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
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
  {field:'ind',label:'ID', minWidth: 70,},
  {field:'unique_id',label:'Unique ID',minWidth: 100,},
  {field:'name',label:'Hotel Name',minWidth: 130,},
  {field:'address',label:'Address',minWidth: 200,},
  {field:'latitude',label:'Latitude',minWidth: 130,},
  {field:'longitude',label:'Longitude',minWidth: 130,},
  {field:'uniqueSupplierId',label:'Unique Supplier ID',minWidth: 130,},
]


{/* <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {HotelSearchColumn.map(column => (
                <TableCell key={column.field} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 &&  users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users
            ).map(row => (
              <TableRow key={row.ind}>
                {HotelSearchColumn.map(column => (
                  <TableCell key={column.field}>{row[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={50} onChange={(e, value) => setPageApi(value)} />
      </paper> */}
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={10}
        onChange={(e, value) => setPageApi(value)} 
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}