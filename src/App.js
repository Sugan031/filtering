import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";
import Map from "./Map";

export default function App() {
  const [users, setUsers] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [pageApi, setPageApi] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(pageApi);
  }, [pageApi, inputs]);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/search?page=${pageApi}`,
        inputs
      );
      setUsers(response.data.data.data);
      setTotalPages(response.data.count);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handlechange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "blue",
      color: "white",
      border: "1px solid hsl(0,0%,80%)",
      borderTopStyle: "none",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 
                2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 
                2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 
                0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262
                 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238
                  0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 
                  2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 
                  5.277-2.421 5.277-5.393V75.1c0-2.972 
                  2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 
              1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 
              0 161.402 0 173.881 0 184 8.102 184 
              18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>

        <Box sx={{ mt: 1 }}>No Records found</Box>
      </StyledGridOverlay>
    );
  }
  return (
    <Container
      maxWidth="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" color="blue">
        Reference Search
      </Typography>
      <Stack
        flexDirection={"row"}
        justifyContent={"center"}
        marginTop={3}
        gap={2}
        flexWrap={"wrap"}
        maxWidth={"66%"}
      >
        <TextField
          id="outlined-basic"
          label="Unique Id"
          variant="outlined"
          name="unique_id"
          InputProps={{ style: { borderRadius: "3rem" } }}
          onChange={handlechange}
        />
        <TextField
          id="outlined-basic"
          label="Supplier Id"
          variant="outlined"
          InputProps={{ style: { borderRadius: "3rem" } }}
        />
      </Stack>
      <Grid
        container
        flexDirection={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        mt={1}
      >
        <Grid item xs={6} width="50%" mt={3}>
          <TableContainer
            style={{
              overflowX: "auto",
              border: "1px solid hsl(0,0%,80%)",
              borderRadius: "10px",
              borderLeftStyle: "none",
              borderRightStyle: "none",
            }}
          >
            <Table
              sx={{
                minWidth: 600,
              }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow style={{ minHeight: "5px", height: "10px" }}>
                  {HotelSearchColumn.map((column) => (
                    <StyledTableCell className="tableRow">
                      {column.headerName}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {HotelSearchColumn.map((column) => (
                    <TableCell
                      style={{
                        border: "1px solid hsl(0,0%,80%)",
                        borderBottomStyle: "none",
                      }}
                    ></TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={8} height={500} mt={3}>
          <DataGrid
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "blue",
                color: "white",
              },
            }}
            getRowId={(users) => users.ind}
            columns={HotelSearchColumn}
            rows={users.map((user) => ({ ...user, ind: user.ind + 1 }))}
            pageSize={10}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[]}
            autoPageSize
            editMode="row"
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
          />
          <Pagination
            count={totalPages}
            onChange={(e, value) => setPageApi(value)}
          />
        </Grid>
        <Grid item xs={3.7}>
          <Box marginTop={"-2rem"} sx={{ height: "400px" }}>
            <Map data={users} />
          </Box>
          <Box mt={5} mb={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained">Save Changes</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

const HotelSearchColumn = [
  {
    field: "ind",
    headerName: "ID",
    minWidth: 70,
    Cell: ({ value }) => <span>{value + 1}</span>,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "unique_id",
    headerName: "Unique ID",
    minWidth: 100,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "name",
    headerName: "Hotel Name",
    minWidth: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "address",
    headerName: "Address",
    minWidth: 200,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "latitude",
    headerName: "Latitude",
    minWidth: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "longitude",
    headerName: "Longitude",
    minWidth: 130,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "unique_supplier_id",
    headerName: "Unique Supplier ID",
    minWidth: 130,
    headerClassName: "super-app-theme--header",
  },
];
