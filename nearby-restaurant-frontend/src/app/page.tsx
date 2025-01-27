'use client';
import { useQuery } from '@apollo/client';
import { GET_NEARBY_RESTAURANTS } from '../queries/getNearbyRestaurants';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Restaurant, NearbyRestaurantsResponse } from '../types'; // Import the new type

// Dynamically import the RestaurantMap component, disabling SSR
const RestaurantMap = dynamic(() => import('../components/RestaurantMap'), { ssr: false });

export default function Home() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const { data, loading, error } = useQuery<NearbyRestaurantsResponse>(GET_NEARBY_RESTAURANTS, {
    variables: {
      latitude,
      longitude,
      radius: 15, // Radius in km
    },
    skip: latitude === null || longitude === null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          console.error('Error fetching location:', err.message);
          setLocationError('Unable to fetch location. Showing results near London.');
          // Fallback location (London)
          setLatitude(51.5074);
          setLongitude(-0.1278);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
      // Fallback location (London)
      setLatitude(51.5074);
      setLongitude(-0.1278);
    }
  }, []);

  if (loading || latitude === null || longitude === null) return <p>Loading location...</p>;
  if (error) return <p>Error loading restaurants: {error.message}</p>;

  const restaurants: Restaurant[] = data?.nearbyRestaurants?.restaurants || [];

  return (
    <div>
      <div className="z-1000">
        <Header />
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Nearby Restaurants</h1>
        {locationError && (
          <p className="text-yellow-500 mb-4">{locationError}</p>
        )}
        {restaurants.length > 0 ? (
          <>
            {/* Render the map */}
            <RestaurantMap
              latitude={latitude}
              longitude={longitude}
              restaurants={restaurants}
            />
            <ul className="mt-4 space-y-2">
              {restaurants.map((restaurant) => (
                <li key={restaurant.id} className="p-4 border rounded shadow-sm hover:shadow-md">
                  <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                  <p>{restaurant.address}</p>
                  <p className="text-gray-500">{restaurant.distance} km away</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No restaurants found within the radius. Try searching in a different area.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
