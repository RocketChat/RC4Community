import '/styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
