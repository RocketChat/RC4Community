import { getUser} from "../hooks/getUser";
import { LoginForm } from "./LoginForm";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { SignupForm } from "./SignupForm";
import { UserInfo } from "./UserInfo";
export function AuthUI(){
    const user = getUser();
    const [signupVisible,setSignupVisible] = useState(false);
    const onSignupComplete = () => {
        setSignupVisible(false);
    };
    const wrapperStyle = {
        width: "100%", 
        maxWidth: "400px", 
        border: "1px solid #ddd", 
        boxShadow: "2px 2px 3px 3px #0000001D", 
        background: "#FFF"
    };
    if(user){
        return (
            <div style={wrapperStyle}> 
                <UserInfo/>
            </div>
        );
    } else if(signupVisible){
        return (
            <div style={wrapperStyle}>
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
                <SignupForm onSignupComplete={onSignupComplete}/>
            </div>
        );
    } else {
        return (
            <div style={wrapperStyle}> 
                <div className="w-100 p-1 d-flex align-items-center justify-content-center bg-light">
                    <span>Log in</span>
                </div>
                <LoginForm onSignupClick={()=>setSignupVisible(true)}/>
            </div>
        );
    }
}