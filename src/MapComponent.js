import React from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
 

const libraries = ['places']; 

const MapComponent = ({ latitude, longitude, zoomLevel }) => {
    const [map, setMap] = React.useState(null);

    const handleLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    const center = React.useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBbMXbcBHapEkViUXa2Z4re6dk4T7csnjQ" 
            libraries={libraries}
        >
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '450px' }}
                zoom={zoomLevel}
                center={center}
                onLoad={handleLoad}
            >
                {map && <Marker position={center} />}
            </GoogleMap>
        </LoadScript>
    );
};
export default MapComponent


// export default MapComponent