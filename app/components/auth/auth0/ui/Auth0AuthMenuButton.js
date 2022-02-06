import { useState } from "react";
import { NoUserAvatar } from "../../NoUserAvatar";
import styles from "../styles/Auth0AuthMenuButton.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import Auth0UserInfo from "./Auth0UserInfo";
import { getAuth0LoginURL } from "../lib/functions";

export default function Auth0AuthMenuButton({}){
    const {user} = useUser();
    const [isOpen,setOpen] = useState(false);
    return (
        <div className={styles.authDialogWrapper}>
            <div className={styles.avatar}>
                {user?
                    <button className={styles.avatarButton} onClick={() => setOpen(!isOpen)}>
                        <span className="d-flex align-items-center">
                            {
                                user?.picture ?
                                <img src={user.picture}
                                    alt={user.name}
                                    className="rounded-circle"
                                    height="42px"
                                    width="42px" />
                                :
                                <NoUserAvatar name={user.name} size="42" />
                            }
                        </span>
                    </button>
                    :
                    <a href={getAuth0LoginURL()}>
                        <button className={styles.avatarButton}>
                            <span className="d-flex align-items-center">
                                <NoUserAvatar size="42" />
                            </span>
                        </button>
                    </a>
                }
            </div>
            { user && isOpen &&
                <div className={styles.authContainer}>
                    <Auth0UserInfo/>
                </div>
            }
        </div>
    )
}
