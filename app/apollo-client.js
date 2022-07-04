import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  // Uncomment the appropriate line according to the
  // region group where you created your database.
  //   uri: 'https://graphql.fauna.com/graphql',
  // uri: 'https://graphql.eu.fauna.com/graphql',
  uri: 'https://graphql.us.fauna.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.NEXT_PUBLIC_FAUNA_SECRET;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
