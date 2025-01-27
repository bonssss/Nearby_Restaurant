// src/types.ts
export type Restaurant = {
    id: string;
    name: string;
    address: string;
    openingHours: string;  // assuming openingHours is a single string
    latitude: number;
    longitude: number;
    distance?: number;  // optional property
  };
  
  export type NearbyRestaurantsResponse = {
    nearbyRestaurants: {
      restaurants: Restaurant[];
    };
  };
  