import '/styles/globals.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const brandInfo = {
    brandLogoSrc: 'https://global-uploads.webflow.com/611a19b9853b7414a0f6b3f6/611bbb87319adfd903b90f24_logoRC.svg',
    brandLink: '/',
    imageTitle: 'Rocket.Chat',
    brandName: 'Rocket.Chat Community'
  }
  return (
    <SSRProvider>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          {/* <Layout menu={pageProps} brandInfo={brandInfo}> */}
            <Component {...pageProps} />
          {/* </Layout> */}
        </SessionProvider>
      </ApolloProvider>
    </SSRProvider>
  );
}

export default MyApp;
