import '/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import SSRProvider from 'react-bootstrap/SSRProvider';

function MyApp({ Component, pageProps, cookies }) {
  return (
    <SSRProvider>
      <Layout menu={pageProps} cookies={cookies}>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {
  const { cookies } = ctx.req;

  return { cookies };
};
