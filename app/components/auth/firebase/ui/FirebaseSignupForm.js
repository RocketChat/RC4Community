import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from "firebase/auth";
import {getApp} from 'firebase/app';
import {reload} from 'firebase/auth';
import { useState } from "react";
import { FormControl, Alert, Button } from "react-bootstrap";
import {FB_APP_NAME} from '../lib/constants';
export function FirebaseSignupForm({onSignupComplete}){
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");
    const [errorMessage,setError] = useState("");
    const [progress,setProgress] = useState(false);

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
