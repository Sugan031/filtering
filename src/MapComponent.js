// import React from 'react';
// import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
// import PlaceIcon from '@mui/icons-material/Place';

// const libraries = ['places']; 

// const MapComponent = ({data, zoomLevel}) => {
//     const [map, setMap] = React.useState(null);

//     const handleLoad = (mapInstance) => {
//         setMap(mapInstance);
//     };

//     // const center = React.useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);
//     const data = this.props.first
//     return (
//         <LoadScript
//             googleMapsApiKey="AIzaSyBqPUe5wfWgGNOBrNOJqwCdpcknw0tX3DQ" 
//             libraries={libraries}
//         >
//     {data.map((hotel,index) => (
//           <Marker
//             key={index}
//             position={{lat: hotel.latitude, lng: hotel.longitude }}
//             title={hotel.name}
//             icon={{
//             icon : <PlaceIcon/>,
//               scaledSize: new window.google.maps.Size(40, 40),
//             }}
//           />
//         ))}
//             <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '450px' }}
//                 zoom={zoomLevel}
//                 // center={center}
//                 onLoad={handleLoad}
//             >
//                 {map && <Marker position={center} />}
//             </GoogleMap>
//         </LoadScript>
//     );
// };
// export default MapComponent


// export default MapComponent

import React from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import PlaceIcon from '@mui/icons-material/Place';

const libraries = ['places']; 

const MapComponent = ({ data, zoomLevel }) => {
    const [map, setMap] = React.useState(null);

    const handleLoad = (mapInstance) => {
        setMap(mapInstance);
    };
 
    const center = data.length > 0 ? { lat: data[0].latitude, lng: data[0].longitude } : null;

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBqPUe5wfWgGNOBrNOJqwCdpcknw0tX3DQ" 
            libraries={libraries}
        >
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '450px' }}
                zoom={zoomLevel}
                center={center}
                onLoad={handleLoad}>
                    {data.map((data, index) => (
                <Marker
                    key={index}
                    position={{ lat: data.latitude, lng: data.longitude }}
                    title={data.name}
                    icon={{
                        icon : <PlaceIcon/>,
                        scaledSize: new window.google.maps.Size(40, 40),
                    }}
                />
            ))}
                </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
