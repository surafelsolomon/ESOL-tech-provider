'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icons
const DefaultIcon = L.icon({
    iconUrl: '/leaflet/images/marker-icon.png',
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
    const position = [51.505, -0.09]; // Update with your coordinates

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: '300px', width: '100%' }}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Our Office Location <br /> 123 Tech Boulevard
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;