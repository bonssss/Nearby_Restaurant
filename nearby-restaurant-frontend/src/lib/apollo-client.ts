import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://nearby-restaurant.onrender.com/graphql', // Replace with your backend URL
  cache: new InMemoryCache(),
});

export default client;
