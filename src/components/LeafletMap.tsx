
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Station } from '@/types/api';

// Fix for default marker icons in Leaflet with React
// (Leaflet's default markers use files from the leaflet/dist/images folder)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Create custom icon for stations
const stationIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create custom icon for selected station
const selectedStationIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIconRetina,
  iconSize: [35, 51],
  iconAnchor: [17, 51],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'selected-marker'
});

// Icône pour le marqueur de l'utilisateur
const userIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LeafletMapProps {
  stations: Station[];
  selectedStation: string | null;
  onStationSelect: (stationId: string) => void;
  height?: string;
  userLocation?: {latitude: number | null, longitude: number | null} | null;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  stations,
  selectedStation,
  onStationSelect,
  height = '100%',
  userLocation
}) => {
  useEffect(() => {
    // Ensure the CSS for Leaflet is loaded
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Default center on Lausanne if no user location
  const defaultCenter: LatLngExpression = [46.519962, 6.633597];
  
  // Use user location if available
  const center = userLocation && userLocation.latitude && userLocation.longitude 
    ? [userLocation.latitude, userLocation.longitude] as LatLngExpression
    : defaultCenter;

  return (
    <div style={{ width: '100%', height: height }}>
      <MapContainer 
        center={center} 
        zoom={userLocation?.latitude ? 15 : 14} 
        style={{ width: '100%', height: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {userLocation && userLocation.latitude && userLocation.longitude && (
          <>
            <Marker
              position={[userLocation.latitude, userLocation.longitude]}
              icon={userIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold">Votre position</h3>
                </div>
              </Popup>
            </Marker>
            <Circle 
              center={[userLocation.latitude, userLocation.longitude]}
              radius={300}
              fillColor="blue"
              fillOpacity={0.1}
              color="blue"
              weight={1}
            />
          </>
        )}
        
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={selectedStation === station.id ? selectedStationIcon : stationIcon}
            eventHandlers={{
              click: () => onStationSelect(station.id)
            }}
          >
            <Popup>
              <div>
                <h3 className="font-semibold">{station.name}</h3>
                <p>{station.location}</p>
                <p>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                    station.status === 'online' 
                      ? 'bg-green-100 text-green-800' 
                      : station.status === 'offline'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {station.status === 'online' ? 'En ligne' : station.status === 'offline' ? 'Hors ligne' : 'Maintenance'}
                  </span>
                </p>
                <p className="mt-1">
                  <span className="font-medium">{station.availablePowerBanks}</span>/{station.totalSlots} powerbanks disponibles
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
