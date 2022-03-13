
### Keycloak configuration
1. Create an openid-connect client in Keycloak with "confidential" as the "Access Type". See [https://www.keycloak.org/docs/latest/server_admin/#_oidc_clients](https://www.keycloak.org/docs/latest/server_admin/#_oidc_clients).

2. To add profile picture attribute received from providers, You will have to create a mapper to set profile picture url into `picture` attribute.

### Set up
We have used `next-auth` npm package to configure keycloak authentication. Read more about it [here](https://next-auth.js.org/)

1. set up environment variables for firebase config in `.env.local`

```
### BEGIN: Environment variables for keycloak
NEXTAUTH_SECRET="some random string for signing"
NEXTAUTH_URL="http://localhost:3000"
KEYCLOAK_ID='keycloak client id'
KEYCLOAK_SECRET='keycloak client secret'
KEYCLOAK_ISSUER='http://localhost:8080/realms/{Realm Name}'
### END: Environment variables for keycloak
```

2. Wrap the app with `SessionProvider` in _app.js in the following way
```
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

```
3. Add `KeycloakAuthMenuButton` in menubar.
```
...
import {KeycloakAuthMenuButton} from './auth/keycloak';
...

export default function Menubar(props) {
 ...

  return (
    <Container fluid className='border-bottom '>
      <Navbar expand='lg' className=' bg-white mx-4 my-2'>
        ...
        <div className="mx-1">
          <KeycloakAuthMenuButton/>
        </div>
      </Navbar>
    </Container>
  );
}
```
4. Use `useSession()` webhook to get user data.
```
import { useSession } from "next-auth/react";
...
...
export default Component(){
  const {data:session} = useSession();
  if(!session)
    return <div/>;
  const user = session.user;
    return <div>Hello ${user.name}</div>
}
```
5. Sign out using custom sign out function `signOutKC()`. This will sign out user from keycloak as well.
