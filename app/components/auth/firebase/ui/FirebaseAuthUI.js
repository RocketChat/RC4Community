import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from '../styles/FirebaseAuthUI.module.css';
import { getInitAuthResult, useFirebaseAuthUser } from "../lib/functions";
import FirebaseUserInfo from "./FirebaseUserInfo";
import FirebaseSignupForm from "./FirebaseSignupForm";
import FirebaseLoginForm from "./FirebaseLoginForm";

export default function FirebaseAuthUI(){
    const user = useFirebaseAuthUser();
    const [signupVisible,setSignupVisible] = useState(false);

    if(!getInitAuthResult().success){
        return (
            <div className="container-fluid p-1">
                <h1>Firebase not configured!</h1>
                <p className="p-1">
                Firebase authentication is used. You must set environment variables to initialize your firebase app. See <a href="https://github.com/RocketChat/RC4Community/blob/master/app/components/auth/firebase/README.md">README.md</a> for setting up firebase authentication for RC4Community.
                </p>
            </div>
        )
    }
    
    if(user.id){
        return (
            <div className={styles.authUIWrapper}> 
                <FirebaseUserInfo/>
            </div>
        );
    } else if(signupVisible){
        return (
            <div className={styles.authUIWrapper}>
                <div className="w-100 p-1 d-flex align-items-center justify-content-center bg-light">
                    <Button
                        style={{position: "absolute", left: "5px"}}
                        variant="light"
                        size="sm"
                        onClick={()=>setSignupVisible(false)}>
                        &lt; back
                    </Button>
                    &nbsp;
                    <span>Sign up</span>
                </div>
                <FirebaseSignupForm onSignupComplete={()=>setSignupVisible(false)}/>
            </div>
        );
    } else {
        return (
            <div className={styles.authUIWrapper}>
                <div className="w-100 p-1 d-flex align-items-center justify-content-center bg-light">
                    <span>Log in</span>
                </div>
                <FirebaseLoginForm onSignupClick={()=>setSignupVisible(true)}/>
            </div>
        );
    }
}
