'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { Restaurant } from '../types'; // Import the consistent type

type Props = {
  latitude: number;
  longitude: number;
  restaurants: Restaurant[];
};

const userIcon = L.icon({
  iconUrl: '/user-location.png',  // user location path
  iconSize: [40, 40], 
  iconAnchor: [20, 40], // Anchor point of the icon
  popupAnchor: [0, -40], // Position of the popup
});

export default function RestaurantMap({
  latitude,
  longitude,
  restaurants,
}: Props) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* User Location Marker */}
      <Marker position={[latitude, longitude]} icon={userIcon}> 
        <Popup>You are here</Popup>
      </Marker>
      {/* Restaurant Markers */}
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={[restaurant.latitude, restaurant.longitude]}
        >
          <Popup>
            <b>{restaurant.name}</b>
            <br />
            {restaurant.address}
            <br />
            {restaurant.openingHours}
            {restaurant.distance && (
              <>
                <br />
                {restaurant.distance.toFixed(2)} km away
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
