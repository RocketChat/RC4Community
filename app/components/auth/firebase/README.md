### Set up

1. set up environment variables for firebase config in `.env.local`

```
# Environment variables for firebase-admin
GOOGLE_CREDS_PATH=required, path to your service account json file that you downloaded from firebase console.

#Alternatively you can set values for projectId, privateKey, clientEmail individually. Though service account json file will be prefered.
FIREBASE_PROJECT_ID=required
FIREBASE_PRIVATE_KEY=required
FIREBASE_CLIENT_EMAIL=required
FIREBASE_DATABASE_URL=if needed, see initAuth in /app/components/auth/firebase/lib/functions.js

# Environment variables for firebase client config.
NEXT_PUBLIC_FIREBASE_PROJECT_ID=required
NEXT_PUBLIC_FIREBASE_API_KEY=required
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=required
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=required
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# for cookies signing
COOKIE_SECRET_CURRENT=example_string_feafh3r2rv4ty4893vyt5vt5t38vy5n9t5vyt8vn54
COOKIE_SECRET_PREVIOUS=example_string_u4ht83r3m20rxc34nty340v9t4ty340mtu438ty48ntv4y8v

```
2. Initialize `next-firebase-auth` in _app.js
```
// ./pages/_app.js
import { initAuth } from '../components/auth/firebase';

initAuth()
..
..
```
3. Export the page component with `withAuthUser(Page)` and use `useAuthUser()` hook to get user info.
```
// ./pages/demo
import React from 'react'
import {
  useAuthUser,
  withAuthUser,
} from 'next-firebase-auth'

const Demo = () => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
    </div>
  )
}

export default withAuthUser()(Demo)
```
4. For SSR, use `withAuthUserSSR` to wrap your getServerSideProps. 

```
export const getServerSideProps = withAuthUserSSR(options)(({AuthUser}) => { })

```

For more details, see [https://github.com/gladly-team/next-firebase-auth](https://github.com/gladly-team/next-firebase-auth)

5. The `AuthUI` component handles UI for login and signup.

6. To use in development env. Set, `secure: false` in cookies config in `initAuth` function in file `/app/components/auth/firebase/lib/functions.js`

```
cookies: {
...
....
sameSite: 'strict',
secure: false, // set this to false in local (non-HTTPS) development
signed: true,
},

```
7. Build will fail if environment variables are not set. In order not to affect rendering of other components make use of `withFirebaseAuthUser`, `withFirebaseAuthUserSSR`, `withFirebaseAuthUserTokenSSR` and `useFirebaseAuthUser` instead of their respective `next-firebase-auth` version. They are just a wrapper that checks if firebase is initialised properly or not. And prevents build fail. They are exported from `/app/components/auth/firebase`.
