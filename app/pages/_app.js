import '/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import SSRProvider from 'react-bootstrap/SSRProvider';
import {SessionProvider} from 'next-auth/react';

function MyApp({ Component, pageProps: {session, ...pageProps}}) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <Layout menu={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </SSRProvider>
  );
}

export default MyApp;
