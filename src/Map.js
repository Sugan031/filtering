import React from 'react'
import { Box } from '@mui/material';
import MyContainer from './MyContainer';

const zoomLevel = 10;
const Map = ({data}) => {
  return (
    <div class="border_map">
    <Box>
        <MyContainer data={data} />
    </Box>
    </div>
  )
}

export default Map
