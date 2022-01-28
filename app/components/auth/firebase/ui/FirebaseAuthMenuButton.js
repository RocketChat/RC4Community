import { useState } from "react";
import FirebaseAuthUI from "./FirebaseAuthUI";
import { NoUserAvatar } from "../../NoUserAvatar";
import styles from "../styles/FirebaseAuthMenuButton.module.css";
import { useFirebaseAuthUser } from "../lib/functions";

export default function FirebaseAuthMenuButton({}){
    const user = useFirebaseAuthUser();
    const [isOpen,setOpen] = useState(false);
    return (
        <div className={styles.authDialogWrapper}>
            <div className={styles.avatar}>
                <button className={styles.avatarButton} onClick={() => setOpen(!isOpen)}>
                    <span className="d-flex align-items-center">
                        {
                            user?.photoURL ?
                            <img src={user.photoURL}
                                alt={user.displayName}
                                className="rounded-circle"
                                height="42px"
                                width="42px" />
                            :
                            <NoUserAvatar name={user?.displayName} size="42" />
                        }
                    </span>
                </button>
            </div>
            { isOpen &&
                <div className={styles.authContainer}><FirebaseAuthUI/></div>
            }
        </div>
    )
}
