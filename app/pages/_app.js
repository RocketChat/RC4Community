import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from "../components/layout"
import SSRProvider from 'react-bootstrap/SSRProvider';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>

      <Layout menu={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>

  )
}


export default MyApp