import { useEffect, useState } from "react";
import { NoUserAvatar } from "../../NoUserAvatar";
import DummyLoginUI from "./DummyLoginUI";
import styles from "../styles/DummyLoginButton.module.css";

export default function DummyLoginButton() {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
      const isStoredInSession = JSON.parse(sessionStorage.getItem("dummy_user"));
      if (isStoredInSession) {
          setUser(isStoredInSession);
      }
  },[])

  return (
    <div className={styles.authDialogWrapper}>
      <div className={styles.avatar}>
        <button className={styles.avatarButton}>
          <span
            className="d-flex align-items-center"
            onClick={() => setOpen((prev) => !prev)}
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="rounded-circle"
                height="42px"
                width="42px"
              />
            ) : (
              <NoUserAvatar name={user?.name} size="42" />
            )}
          </span>
        </button>
      </div>
      {isOpen && (
        <div className={styles.authContainer}>
          <DummyLoginUI setUser={setUser} user={user} />
        </div>
      )}
    </div>
  );
}
