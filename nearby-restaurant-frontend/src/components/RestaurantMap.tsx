"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Restaurant = {
  id: string;
  name: string;
  address: string;
  openingHours: string;
  latitude: number;
  longitude: number;
  distance?: number;
};

type Props = {
  latitude: number;
  longitude: number;
  restaurants: Restaurant[];
};

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
      <Marker position={[latitude, longitude]}>
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
