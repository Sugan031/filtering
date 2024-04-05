import React, { useState,useEffect } from "react";
import "../index.css";
import axios from "axios";

import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Stack
} from "@mui/material";
import DataGridComponent from "./DataGridComponent";


const InputSearch = () => {
    const [fields, setFields] = useState([]);
    const [filter, setFilter] = useState("none");
    const [Datas, setDatas] = useState([])
    const [totalPages, setTotalPages] = useState(1);

    //Hitting API
    const handleSearch = async () => {
        //Fetching values of Grid Numbers and UNique Ids
        await axios.post("http://127.0.0.1:8000/api/search",fields)
        .then((response) => {
                setDatas(response.data.data.data);
                setTotalPages(response.data.count);
            })
            .catch((error) => {
                console.error(error);
                console.log("from error");
            });
    };

    useEffect(()=>{
        handleSearch();
    },[fields])


    const handleFields = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFields((values) => ({ ...values, [name]: value }));
    };

    return (
        <>
          <Stack
                    flexDirection={"row"}
                    marginTop={5}
                    gap={4}
                    flexWrap={"wrap"}
                    maxWidth={"90%"}
                >
            <TextField
                label="Country"
                name="country_name"
                onChange={handleFields}
                style={{ backgroundColor: "#e1e7f2", width: "12rem" }}
            />

            <TextField
                label="City"
                name="city"
                style={{ backgroundColor: "#e1e7f2", width: "12rem" }}
                onChange={handleFields}
            />
            <TextField
                label="grid number"
                name="grid_number"
                style={{ backgroundColor: "#e1e7f2", width: "12rem" }}
                onChange={handleFields}
            />
            <TextField
                label="Unique id"
                name="unique_id"
                style={{ backgroundColor: "#e1e7f2", width: "12rem" }}
                onChange={handleFields}
            />
            <TextField
                label="hotel Name"
                name="name"
                style={{ backgroundColor: "#e1e7f2", width: "12rem" }}
                onChange={handleFields}
            />
            <Button
                onClick={handleSearch}
                variant="contained"
                size="large"
                sx={{ width: "8rem", height: "3.3rem" }}
            >
                Search
            </Button>
            </Stack>
            <FormControl>
                <InputLabel>Filter</InputLabel>
                <Select
                    id="demo-simple-select-autowidth"
                    value={filter}
                    style={{ minWidth: "10rem", borderRadius: "3rem" }}
                    label="Filter"
                    name="validation"
                >
                    <MenuItem value={"none"}>None</MenuItem>
                    <MenuItem value={"Id duplication"}>ID Duplication</MenuItem>
                    <MenuItem value={"Id accumulation"}>
                        ID Accumulation
                    </MenuItem>
                    <MenuItem value={"Need Validation 1"}>
                        Need Validation 1
                    </MenuItem>
                    <MenuItem value={"Need Validation 2"}>
                        Need Validation 2
                    </MenuItem>
                    <MenuItem value={"Unmapped"}>Not Mapped</MenuItem>
                </Select>
            </FormControl>
            <DataGridComponent datas = {(Datas)} totalPages={(totalPages)} />
        </>
    );
}

export default InputSearch
