import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Box, Button, Container, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,tableCellClasses }  from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import Map from './Map';


export default function App() {    
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState([]);


  useEffect(() => {
    fetchData(); // Call fetchData when component mounts
}, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/search');
            setUsers(response.data);
           
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
  const handlechange = async(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/search', inputs);
      console.log(response.data);
      setUsers(response.data);
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
        <DataGrid getRowId={(users) => users.ind} columns={HotelSearchColumn} rows={users}
          checkboxSelection
          pageSizeOptions={[6]}
          initialState={{ pagination: { pageSize: 6, page: 0 } }}
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

const HotelRow=[
  {id:'1',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'2',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'3',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'4',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'5',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'6',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'7',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'8',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'9',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'10',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'11',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' },
  {id:'12',uniqueId: 4567346, hotelName:'Setouchi house', Address:'45-3-1 Nishi Okkama Street',latitude:'34.382567', longitude:'54.356765', uniqueSupplierId:'7234263-princi' }
]

const HotelSearchColumn = [
  {field:'ind',label:'ID', minWidth: 70,},
  {field:'unique_id',label:'Unique ID',minWidth: 100,},
  {field:'name',label:'Hotel Name',minWidth: 130,},
  {field:'address',label:'Address',minWidth: 200,},
  {field:'latitude',label:'Latitude',minWidth: 130,},
  {field:'longitude',label:'Longitude',minWidth: 130,},
  {field:'uniqueSupplierId',label:'Unique Supplier ID',minWidth: 130,},
]

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];
export const countriesForTable = React.createContext({});
