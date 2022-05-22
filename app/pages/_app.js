import '/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {SessionProvider} from 'next-auth/react';
import { initAuth } from '../components/auth/firebase';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

function MyApp({ Component, pageProps: {session, ...pageProps}}) {
  return (
    <SSRProvider>
      <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Layout menu={pageProps}>
          <Component {...pageProps} />
        </Layout>
        </SessionProvider>
      </ApolloProvider>
    </SSRProvider>
  );
}

export default MyApp;
