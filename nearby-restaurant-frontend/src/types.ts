export type Restaurant = {
    id: string;
    name: string;
    address: string;
    openingHours: string;  
    latitude: number;
    longitude: number;
    distance?: number;  
  };
  
  export type NearbyRestaurantsResponse = {
    nearbyRestaurants: {
      restaurants: Restaurant[];
    };
  };
  