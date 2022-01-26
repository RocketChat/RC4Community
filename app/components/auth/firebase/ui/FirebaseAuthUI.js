import { useAuthUser } from "next-firebase-auth";
import { FirebaseLoginForm } from "./FirebaseLoginForm";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FirebaseSignupForm } from "./FirebaseSignupForm";
import { FirebaseUserInfo } from "./FirebaseUserInfo";
import styles from '../styles/FirebaseAuthUI.module.css';

export function FirebaseAuthUI(){
    const user = useAuthUser();
    const [signupVisible,setSignupVisible] = useState(false);
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
