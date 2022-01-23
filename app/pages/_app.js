import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from "../components/layout"
import SSRProvider from 'react-bootstrap/SSRProvider';
import AuthProvider from '../components/auth/firebase/AuthProvider';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthProvider>
        <Layout menu={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SSRProvider>

  )
}


export default MyApp