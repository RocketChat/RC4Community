import '/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <UserProvider>
        <Layout menu={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </SSRProvider>
  );
}

export default MyApp;
