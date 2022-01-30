import { init, useAuthUser, withAuthUser, withAuthUserSSR, withAuthUserTokenSSR} from 'next-firebase-auth'
import { getGoogleCredsFromFile } from './getGoogleCredsFromFile';


const initAuthHelper = (function(){
  let initAuthResult = {success: false, error: new Error('Firebase auth is not yet initialised')};
  const getInitAuthResult = () => {
    return initAuthResult;
  }
  const setInitAuthResult = ({success,error}) => {
    initAuthResult = {success,error};
  }
  return {getInitAuthResult, setInitAuthResult};
})();

export const getInitAuthResult = initAuthHelper.getInitAuthResult;

export const createEmptyAuthUser = () => {
  return {
    id: null,
    email: null,
    emailVerified: false,
    phoneNumber: null,
    displayName: null,
    photoURL: null,
    claims: {},
    getIdToken: async () => null,
    clientInitialized: false,
    firebaseUser: null,
    signOut: async () => null,
    serialize: ({ includeToken = true } = {}) =>
      JSON.stringify({
        id: null,
        claims: {},
        email: null,
        emailVerified: false,
        phoneNumber: null,
        displayName: null,
        photoURL: null,
        clientInitialized: false,
        ...(includeToken && { _token: null }),
      }),
  }
}

export const initAuth = () => {
  let googleCreds = {
    projectId: process.env.FIREBASE_PROJECT_ID || null,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || null,
    // The private key must not be accessible on the client side.
    privateKey: process.env.FIREBASE_PRIVATE_KEY || null,
  }
  if(typeof window === 'undefined' && process.env.GOOGLE_CREDS_PATH){
    // firebase admin has to be initialized using service acccount json file.
    googleCreds = getGoogleCredsFromFile(process.env.GOOGLE_CREDS_PATH);
  }
  
  try {
    init({
      loginAPIEndpoint: '/api/fb/login', // required
      logoutAPIEndpoint: '/api/fb/logout', // required
      onLoginRequestError: (err) => {
        console.error(err)
      },
      onLogoutRequestError: (err) => {
        console.error(err)
      },
      firebaseAdminInitConfig: {
        credential: googleCreds,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      },

      firebaseClientInitConfig: {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // required
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      },
      cookies: {
        name: 'RC4Community', // required
        // Keys are required unless you set `signed` to `false`.
        // The keys cannot be accessible on the client side.
        keys: [
          process.env.COOKIE_SECRET_CURRENT,
          process.env.COOKIE_SECRET_PREVIOUS,
        ],
        httpOnly: true,
        maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
        overwrite: true,
        path: '/',
        sameSite: 'strict',
        secure: true, // set this to false in local (non-HTTPS) development
        signed: true,
      },
      onVerifyTokenError: (err) => {
        console.error(err)
      },
      onTokenRefreshError: (err) => {
        console.error(err)
      },
    });
    initAuthHelper.setInitAuthResult({error: null, success: true});
  } catch (e) {
    console.error(e)
    initAuthHelper.setInitAuthResult({error: e, success: false});
  }
  return initAuthHelper.getInitAuthResult();
}

export const withFirebaseAuthUser = (options) => (ChildComponent) => {
  const WithFirebaseAuthUserHOC = props => {
    if(initAuthHelper.getInitAuthResult().success){
      const Component =  withAuthUser(options)(ChildComponent);
      return <Component {...props}/>
    } else {
      console.error(initAuthHelper.getInitAuthResult().error);
      console.error("You must configure firebase auth before using firebase auth. See https://github.com/RocketChat/RC4Community/blob/master/app/components/auth/firebase/README.md");
      return <ChildComponent {...props} initAuthResult={initAuthHelper.getInitAuthResult()}/> 
    }
  }
  WithFirebaseAuthUserHOC.displayName = "WithFirebaseAuthUserHOC";
  return WithFirebaseAuthUserHOC;
}

export const useFirebaseAuthUser = () => {
  if(initAuthHelper.getInitAuthResult().success){
    return useAuthUser();
  } else {
    return createEmptyAuthUser();
  }
}

const handleFBNotInitError = async (context,getServerSidePropsFunc) => {
  console.error(initAuthHelper.getInitAuthResult().error);
  console.error("You must configure firebase auth before using firebase auth. See https://github.com/RocketChat/RC4Community/blob/master/app/components/auth/firebase/README.md");

  const AuthUser = createEmptyAuthUser();
  context.AuthUser = AuthUser;
  
  const AuthUserSerialized = AuthUser.serialize();
  let returnData = {props: {AuthUserSerialized}};
  
  if(getServerSidePropsFunc) {  
    // a getServerSideProps function is passed
    const composedProps = (await getServerSidePropsFunc(context)) || {};
    if(composedProps){
      if(composedProps.props){
        returnData = { ...composedProps }
        returnData.props.AuthUserSerialized = AuthUserSerialized
      } else if(composedProps.notFound || composedProps.redirect) {
        // If composedProps returned a 'notFound' or 'redirect' key
        // (as per official doc: https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props)
        // it means it contains a custom dynamic routing logic that should not be overwritten
        returnData = {...composedProps}
      }
    }
  }
  return returnData;
}

export const withFirebaseAuthUserSSR = (options) => (getServerSidePropsFunc) => async (context) => {
  if(initAuthHelper.getInitAuthResult().success){
    return withAuthUserSSR(options)(getServerSidePropsFunc)(context);
  } else {
    // firebase is uninitialised due to some error
    return (await handleFBNotInitError(context,getServerSidePropsFunc));
  }
}

export const withFirebaseAuthUserTokenSSR = (options) => (getServerSidePropsFunc) => async (context) => {
  if(initAuthHelper.getInitAuthResult().success){
    return withAuthUserTokenSSR(options)(getServerSidePropsFunc)(context);
  } else {
    // firebase is uninitialised due to some error
    return (await handleFBNotInitError(context,getServerSidePropsFunc));
  }
}

export default {
  getInitAuthResult,
  createEmptyAuthUser,
  initAuth,
  useFirebaseAuthUser,
  withFirebaseAuthUser,
  withFirebaseAuthUserSSR,
  withFirebaseAuthUserTokenSSR
};
