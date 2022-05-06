import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from "firebase/auth";
import {getApp} from 'firebase/app';
import {reload} from 'firebase/auth';
import { useState, useEffect } from "react";
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


export default function FirebaseSignupForm({onSignupComplete}){
    const [upsertUserFunc, { data, loading, error }] = useMutation(UPSERT_USER);
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");
    const [errorMessage,setError] = useState("");
    const [progress,setProgress] = useState(false);

    useEffect(() => {
        if(data) {
          console.log(data);
        }
      }, [data])
    
    if(loading) console.log("Loading ", loading);
    if(error) console.log("Error = ", error);

    const doEmailPasswordSignup = async (e) => {
        e.preventDefault();
        if(progress){
            return;
        }
        setProgress(true);
        try {
            if(!email){
                const e = new Error("Email empty");
                e.code = "auth/invalid-email";
                throw e;
            }
            if(!name){
                const e = new Error('Empty name');
                e.code = "name-empty"
                throw e;
            }
            if(!password1 || !password2){
                const e = new Error('Empty password');
                e.code = "password-empty"
                throw e;
            }
            if(password1 !== password2){
                const e = new Error('Passwords do not match');
                e.code = "passwords-do-not-match";
                throw e;
            }
            const fbApp = getApp(FB_APP_NAME);
            const userCred = await createUserWithEmailAndPassword(getAuth(fbApp),email,password1);
            await updateProfile(userCred.user,{displayName: name});
            await reload(userCred.user);
            upsertUserFunc({
                variables: {
                    uid: userCred.user.uid,
                    email: userCred.user.email,
                    displayName: userCred.user.displayName,
                    phoneNumber: userCred.user.phoneNumber,
                    photoURL: userCred.user.photoURL
                },
              })
            Cookies.set('user', userCred.user.uid);
            await sendEmailVerification(userCred.user);
            onSignupComplete && onSignupComplete();
        } catch(error){
            switch(error.code){
                case 'name-empty':
                    setError("Name is required");
                    break;
                case 'password-empty':
                    setError("Password is required");
                    break;
                case 'auth/invalid-email':
                    setError("Invalid email");
                    break;
                case 'auth/weak-password':
                    setError("Weak password");
                    break;
                case 'auth/email-already-in-use':
                    setError("Email already in use");
                    break;
                case 'passwords-do-not-match':
                    setError("Passwords do not match");
                    break;
                default:
                    setError("Uknown error occurred");
            }
        } finally {
            setProgress(false);
        }
    }
    return (
        <div className="container-fluid p-1">
            <form className="container-fluid" onSubmit={doEmailPasswordSignup}>
                <FormControl
                    type="text" 
                    placeholder="Full name" 
                    className="mb-1" 
                    disabled={progress}
                    onChange={e=> setName(e.target.value)}/>
                <FormControl
                    type="text" 
                    placeholder="Email" 
                    className="mb-1"
                    disabled={progress}
                    onChange={e=> setEmail(e.target.value)}/>
                <FormControl 
                    type="password" 
                    placeholder="Password" 
                    className="mb-1"
                    disabled={progress}
                    onChange={e => setPassword1(e.target.value)}/>
                <FormControl 
                    type="password" 
                    placeholder="Confirm password" 
                    className="mb-1"
                    disabled={progress}
                    onChange={e => setPassword2(e.target.value)}/>
                {
                    errorMessage &&
                    <Alert variant="danger" className="mb-1">{errorMessage}</Alert>
                }
                <div className="d-flex justify-content-between">
                    <Button 
                        type="submit"
                        disabled={progress}
                        className="mb-1">
                        Sign up
                    </Button>
                </div>
            </form>
        </div>
    )
}
