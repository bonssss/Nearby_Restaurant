const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GraphQL Schema Definition
const typeDefs = gql`
  type Restaurant {
    id: Int
    name: String
    address: String
    openingHours: String
    latitude: Float
    longitude: Float
    distance: Float
  }

  type RestaurantResponse {
    message: String
    restaurants: [Restaurant]
  }

  type Query {
    nearbyRestaurants(latitude: Float!, longitude: Float!, radius: Float!): RestaurantResponse
  }
`;

// GraphQL Resolver
const resolvers = {
  Query: {
    nearbyRestaurants: async (_, { latitude, longitude, radius }) => {
      // Log the inputs to ensure correct values are being passed
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Radius: ${radius}`);

      try {
        // Raw query to calculate distance using the Haversine formula
        const restaurants = await prisma.$queryRaw`
          SELECT 
            id, 
            name, 
            address, 
            "openingHours", 
            latitude, 
            longitude,
            (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude)))) AS distance
          FROM "Restaurant"
          WHERE 
            (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude)))) < ${radius}
          ORDER BY distance
        `;

        // Log the restaurants to ensure correct values are being returned
        console.log("Nearby restaurants:", restaurants);
        
        // Return a message if no restaurants are found
        if (restaurants.length === 0) {
          console.log("No restaurants found within the given radius.");
          return {
            message: "No restaurants found within the given radius.",
            restaurants: [],
          };
        }

        // Return the list of restaurants with a message
        return {
          message: `${restaurants.length} restaurants found.`,
          restaurants,
        };
      } catch (error) {
        console.error("Error fetching nearby restaurants:", error);
        throw new Error("Failed to fetch nearby restaurants");
      }
    },
  },
};

// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
