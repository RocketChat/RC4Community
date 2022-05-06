### Set up

We have used `next-auth` npm package to configure rocketchat authentication. Read more about it [here](https://next-auth.js.org/)

Before setting up rocket.chat oauth, an oauth app must be created in rocket.chat server. Then, add the callback url in the `redirect uri` list of that app. 
The callback url is `base-rc4community-url/api/auth/callback/rocket.chat`. For example, if rc4community is running on `http://localhost:3000`, then the callback url should be `http://localhost:3000/api/auth/callback/rocket.chat`.


1. set up environment variables for rocketchat legacy oauth config in `.env.local`

```
### BEGIN: Environment variables for RocketChat OAuth legacy
NEXTAUTH_SECRET="some random string for signing"
NEXTAUTH_URL="base url of rc4community"
ROCKETCHAT_CLIENT_ID="client id"
ROCKETCHAT_CLIENT_SECRET="client secret"
ROCKETCHAT_URL="base url of rocket chat server"
### END: Environment variables for RocketChat OAuth legacy
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
3. Add `RocketChatAuthMenuButton` in menubar.
```
...
import {RocketChatAuthMenuButton} from './auth/rocketchat';
...

export default function Menubar(props) {
 ...

  return (
    <Container fluid className='border-bottom '>
      <Navbar expand='lg' className=' bg-white mx-4 my-2'>
        ...
        <div className="mx-1">
          <RocketChatAuthMenuButton/>
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
5. Sign out using custom sign out function `signOutKC()`. This will sign out user from rocketchat as well.
