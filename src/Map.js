import React from 'react'
import MapComponent from './MapComponent';
import { Box } from '@mui/material';

const latitude = 38.7749; 
const longitude = -120.4194;
const zoomLevel = 10;
const Map = () => {
  return (
    <div>
    <Box sx={{border:'1px solid hsl(0,0%,80%)', borderRadius:'10px', boxShadow:'5px 5px hsla(0,0%,0%,0.1)',padding:'5px'}}>
        <MapComponent latitude={latitude} longitude={longitude} zoomLevel={zoomLevel} />
    </Box>
    </div>
  )
}

export default Map
