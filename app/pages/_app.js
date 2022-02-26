import '/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { initAuth } from '../components/auth/firebase';

initAuth();

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout menu={pageProps}>{page}</Layout>)
  return getLayout(
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default MyApp;
