import { useEffect, useRef, useState } from "react";
import KeycloakAuthUI from "./KeycloakAuthUI";
import { NoUserAvatar } from "../../NoUserAvatar";
import styles from "../styles/KeycloakAuthMenuButton.module.css";
import { signIn, useSession } from "next-auth/react";

export default function KeycloakAuthMenuButton({}){
    const {data: session} = useSession();
    const user = session?.user;
    const [isOpen,setOpen] = useState(false);
    const dialogRef = useRef();
    const onAvatarButtonClick = () => {
        if(session){
            setOpen(!isOpen);
        } else {
            signIn("keycloak",null,{prompt: "login"});
        }
    }
    useEffect(()=>{
        const clickListener = (e) => {
            if(!e.target.closest('.'+styles.authDialogWrapper)){
                setOpen(false);
            }
        }
        document.body.addEventListener('click',clickListener);
        return () => document.body.removeEventListener('click',clickListener);
    },[dialogRef.current]);
    return (
        <div className={styles.authDialogWrapper} ref={dialogRef}>
            <div className={styles.avatar}>
                <button className={styles.avatarButton} onClick={onAvatarButtonClick}>
                    <span className="d-flex align-items-center">
                        {
                            user?.image ?
                            <img src={user.image}
                                alt={user.name}
                                className="rounded-circle"
                                height="42px"
                                width="42px" />
                            :
                            <NoUserAvatar name={user?.name} size="42" />
                        }
                    </span>
                </button>
            </div>
            { session && isOpen &&
                <div className={styles.authContainer}><KeycloakAuthUI/></div>
            }
        </div>
    )
}
