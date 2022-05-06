import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { NoUserAvatar } from "../../NoUserAvatar";
import { useFirebaseAuthUser } from "../lib/functions";

export default function FirebaseUserInfo(){
    const user = useFirebaseAuthUser();
    if(!user.id)
        return <div/>;
    
    const doSignOut = () => {
        user.signOut()
        Cookies.remove('user')
    }

    return (
        <>
            <div className="d-flex flex-column align-items-center mt-4 mb-3 ml-3 mr-3 border-bottom">
                <div className="mb-1">
                    {
                        user.photoURL ?
                            <img src={user.photoURL}
                                alt={user.displayName}
                                style={{
                                    borderRadius: "50%"
                                }}
                                height="64px"
                                width="64px" />
                            :
                        <NoUserAvatar size="64" name={user.displayName}/>
                    }
                </div>
                <div className="font-weight-bold mb-1">
                    {user.displayName}
                </div>
                <div
                    className="mb-1"
                    style={{color: "var(--bs-gray-700)"}}>
                        {user.email}
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4 mt-3 ml-3 mr-3">
                <Button variant="secondary" onClick={doSignOut}>Sign Out</Button>
            </div>
        </>
    )
}
