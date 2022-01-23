import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { getUser } from "./firebase/hooks/getUser";
import { AuthUI } from "./firebase/ui/AuthUI";
import { NoUserAvatar } from "./NoUserAvatar";
import styles from "./styles/auth.module.css";
export function AuthMenuButton({}){
    const user = getUser();
    const [isOpen,setOpen] = useState(false);
    const wrapperStyle = {
        position: "relative",
    };
    const avatarStyle = {
        background: "var(--bs-gray-300)",
        borderRadius: "50%",
        width: "42px",
        height: "42px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const avatarButtonStyle = {
        background: "none", 
        border: "none!important"
    };
    return (
        <div style={wrapperStyle}>
            <div style={avatarStyle}>
                <button style={avatarButtonStyle} onClick={() => setOpen(!isOpen)}>
                    <span className="d-flex align-items-center">
                        {
                            user.photoURL ?
                            <img src={user.photoURL} 
                                alt={user.displayName}
                                style={{
                                    borderRadius: "50%"    
                                }}
                                height="42px" 
                                width="42px" />
                            :
                            <NoUserAvatar name={user?.displayName} size="42" />
                        }
                    </span>
                </button>
            </div>
            { isOpen &&
                <div className={styles.authContainer}><AuthUI/></div>
            }
        </div>
    )
}