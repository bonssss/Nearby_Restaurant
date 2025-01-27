import { gql } from '@apollo/client';
export const GET_NEARBY_RESTAURANTS = gql`
  query GetNearbyRestaurants($latitude: Float!, $longitude: Float!, $radius: Float!) {
    nearbyRestaurants(latitude: $latitude, longitude: $longitude, radius: $radius) {
      message
      restaurants {
        id
        name
        address
        openingHours
        latitude
        longitude
        distance
      }
    }
  }
`;

