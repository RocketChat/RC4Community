RC4Community uses `@auth0/nextjs-auth0` to integrate authentication with Auth0.

## Setting up
1. Set up environment variables
```
# A long, secret value used to encrypt the session cookie
AUTH0_SECRET='a_long_random_string'
# The base url of your application
AUTH0_BASE_URL='http://localhost:3000'
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL='https://sample_app.us.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='your client id'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='your client secret'
# API route for auth0 login (do not not change, since we have used custom routes for auth0)
NEXT_PUBLIC_AUTH0_LOGIN='/api/auth0/login'
# API route for auth0 profile (do not not change, since we have used custom routes for auth0)
NEXT_PUBLIC_AUTH0_PROFILE='/api/auth0/me'
# API route for auth0 callback (do not not change, since we have used custom routes for auth0)
AUTH0_CALLBACK='/api/auth0/callback'
# URL to redirect after logout (set a value to override default). Must be present in list of logout urls in auth0 dashboard.
AUTH0_POST_LOGOUT_REDIRECT='/'
```
For more environment variables visit [https://auth0.github.io/nextjs-auth0/modules/config.html](https://auth0.github.io/nextjs-auth0/modules/config.html)

2. You must add callback url  and logout urls accordingly in application settings in auth0 dashboard. 
3. Wrap your app with `<UserProvider>` component.
```
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
```
4. Get login url from `getAuth0LoginURL()` and logout url from `getAuth0LogoutURL()`. Use `useUser()` hook to get user details.
```
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getAuth0LoginURL, getAuth0LogoutURL } from '/app/components/auth/auth0';
export default () => {
    const { user, error, isLoading } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (user) {
        return (
            <div>
            Welcome {user.name}! <a href={getAuth0LogoutURL()}>Logout</a>
            </div>
        );
    }
    return <a href={getAuth0LoginURL({redirectToThisPage: true})}>Login</a>;
};
```

5. To protect a page and api route, use `withPageAuthRequired` and `withApiAuthRequired`
```
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

....

export const getServerSideProps = withPageAuthRequired({ 
    async getServerSideProps(){
        return {
            props: {
                customProp: "customPropValue"
            }
        }
    }
});

```
```
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(function ProtectedRoute(req, res) {
  const session = getSession(req, res);
  ...
});
```

To read more about using `@auth0/nextjs-auth0` visit https://github.com/auth0/nextjs-auth0#readme