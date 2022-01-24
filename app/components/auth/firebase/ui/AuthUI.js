import { useAuthUser } from "next-firebase-auth";
import { LoginForm } from "./LoginForm";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { SignupForm } from "./SignupForm";
import { UserInfo } from "./UserInfo";
import styles from '../styles/AuthUI.module.css';

export function AuthUI(){
    const user = useAuthUser();
    const [signupVisible,setSignupVisible] = useState(false);
    if(user.id){
        return (
            <div className={styles.authUIWrapper}> 
                <UserInfo/>
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
                <SignupForm onSignupComplete={()=>setSignupVisible(false)}/>
            </div>
        );
    } else {
        return (
            <div className={styles.authUIWrapper}>
                <div className="w-100 p-1 d-flex align-items-center justify-content-center bg-light">
                    <span>Log in</span>
                </div>
                <LoginForm onSignupClick={()=>setSignupVisible(true)}/>
            </div>
        );
    }
}