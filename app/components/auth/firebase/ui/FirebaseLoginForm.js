import { 
    EmailAuthProvider, 
    FacebookAuthProvider, 
    fetchSignInMethodsForEmail, 
    getAuth, 
    GoogleAuthProvider, 
    linkWithCredential, 
    OAuthProvider, 
    signInWithEmailAndPassword, 
    signInWithPopup 
} from "firebase/auth";
import {getApp} from 'firebase/app';
import { useState } from "react";
import { FormControl, Alert, Button } from "react-bootstrap";
import {FB_APP_NAME} from '../lib/constants';
import { useMutation, gql } from '@apollo/client'
import Cookies from "js-cookie";


const UPSERT_USER = gql`
  mutation UpsertUser($uid: String!, $email: String!, $displayName: String!, $phoneNumber: String, $photoURL: String  ) {
    upsertUser(uid: $uid, email: $email, displayName: $displayName, phoneNumber: $phoneNumber, photoURL: $photoURL) {
      _id
      uid
      email
      displayName
      phoneNumber
      photoURL
    }
  }
`;

export default function FirebaseLoginForm({onSignupClick}){
    const [upsertUserFunc, { data, loading, error }] = useMutation(UPSERT_USER);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setError] = useState("");
    const [diffCredError,setDiffCredError] = useState(null);
    const [progress,setProgress] = useState(false);

    if(error) console.log("Error Provider = ", error)
    if(data) console.log("Data = ", data)
    if(loading) console.log("Loading = ", loading)

    const doEmailPasswordLogin = async (e) => {
        e.preventDefault();
        if(progress){
            return true;
        }
        setProgress(true);
        try {
            const fbApp = getApp(FB_APP_NAME);
            const userCred = await signInWithEmailAndPassword(getAuth(fbApp),email,password);
            Cookies.set('user', userCred.user.uid);
            if(diffCredError?.oldProvider?.providerId === EmailAuthProvider.PROVIDER_ID){
                // The signin was requested to link new credentials with the account 
                await linkWithCredential(userCred.user,OAuthProvider.credentialFromError(diffCredError.error));
            }

        } catch(error){
            switch(error.code){
                case 'auth/user-not-found':
                    setError("User not found");
                    break;
                case 'auth/wrong-password':
                    setError("Incorrect Password");
                    break;
                default:
                    setError("Unknown error occurred");
            }
        } finally {
            setProgress(false);
        }
    }
    const handleProviderSignIn = async provider => {
        if(progress){
            return;
        }
        const fbApp = getApp(FB_APP_NAME);
        const auth = getAuth(fbApp);
        try {
            const userCred = await signInWithPopup(auth,provider);
            Cookies.set('user', userCred.user.uid);
            await upsertUserFunc({
                variables: {
                    uid: userCred.user.uid,
                    email: userCred.user.email,
                    displayName: userCred.user.displayName,
                    phoneNumber: userCred.user.phoneNumber,
                    photoURL: userCred.user.photoURL
                },
              })
            if(diffCredError){
                // The signin was requested to link new credentials with the account 
                await linkWithCredential(userCred.user,OAuthProvider.credentialFromError(diffCredError.error));
            }
        } catch (e){
            switch(e.code){
                case 'auth/popup-closed-by-user':
                case 'auth/cancelled-popup-request':
                    break;
                case 'auth/popup-blocked':
                    setError("Popup blocked by your browser.")
                    break;
                case 'auth/account-exists-with-different-credential':
                    const methods = await fetchSignInMethodsForEmail(auth,e.customData.email);;
                    setDiffCredError({error: e, newProviderId: provider.providerId ,oldProviderId: methods[0]});
                    break;
                default:
                    setError("Unknown error occurred");
            }
            setProgress(false);
        }
    }
    
    const onGoogleBtnClick = () => {
        if(progress){
            return;
        }
        setProgress(true);
        const provider = new GoogleAuthProvider();
        handleProviderSignIn(provider);
    }
    
    const onFacebookBtnClick = () => {
        if(progress){
            return;
        }
        setProgress(true);
        const provider = new FacebookAuthProvider();
        handleProviderSignIn(provider);
    }

    return (
        <div className="container-fluid p-1">
            <form className="container-fluid" onSubmit={doEmailPasswordLogin}>
                <FormControl
                    type="text" 
                    placeholder="email" 
                    className="mb-1" 
                    disabled={progress}
                    onChange={e=> setEmail(e.target.value)}/>
                <FormControl 
                    type="password" 
                    placeholder="password" 
                    className="mb-1"
                    disabled={progress}
                    onChange={e => setPassword(e.target.value)}/>
                {
                    errorMessage &&
                    <Alert variant="danger" className="mb-1">{errorMessage}</Alert>
                }
                <div className="d-flex justify-content-between">
                    <Button 
                        type="submit" 
                        className="mb-1" 
                        disabled={progress}>
                            Login
                    </Button>
                    <Button 
                        className="mb-1" 
                        variant="light"
                        disabled={progress}
                        onClick={onSignupClick}>
                        Sign up
                    </Button>
                </div>
            </form>
            <div className="container-fluid d-flex flex-column">
                <Button 
                    variant="danger" 
                    className="mb-1"
                    onClick={onGoogleBtnClick} 
                    disabled={progress}>
                        Sign in with Google
                </Button>
                <Button 
                    className="mb-1"
                    onClick={onFacebookBtnClick}  
                    disabled={progress}>
                        Sign in with Facebook
                </Button>
            </div>
            {
                diffCredError &&
                <div className="p-1 mb-1">
                    <Alert variant="danger" className="mb-1">
                        User's email already exists. Sign in with {diffCredError.oldProviderId} to link your {diffCredError.newProviderId} account.
                    </Alert>
                </div>
            }
        </div>
    )
}
