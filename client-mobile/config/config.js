import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://mobile-server.michaelkrs.dev",
  cache: new InMemoryCache(),
});

export default client;
