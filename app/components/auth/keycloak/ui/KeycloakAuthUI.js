import { useSession } from "next-auth/react";
import { Button } from "react-bootstrap";
import { NoUserAvatar } from "../../NoUserAvatar";
import signOutKC from "../lib/signOutKC";

export default function KeycloakUserInfo(){
    const {data:session} = useSession();
    if(!session)
        return <div/>;
    const user = session.user;
    return (
        <>
            <div className="d-flex flex-column align-items-center mt-4 mb-3 ml-3 mr-3 border-bottom">
                <div className="mb-1">
                    {
                        user.image ?
                            <img src={user.image}
                                alt={user.name}
                                style={{
                                    borderRadius: "50%"
                                }}
                                height="64px"
                                width="64px" />
                            :
                        <NoUserAvatar size="64" name={user.name}/>
                    }
                </div>
                <div className="font-weight-bold mb-1">
                    {user.name}
                </div>
                <div
                    className="mb-1"
                    style={{color: "var(--bs-gray-700)"}}>
                        {user.email}
                </div>
                <div
                    className="mb-1"
                    style={{color: "var(--bs-gray-700)"}}>
                        <a href="/api/auth/profilekc">Manage profile</a>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-4 mt-3 ml-3 mr-3">
                <Button variant="secondary" 
                    onClick={() => signOutKC({callbackUrl: window.location.href})}>
                    Sign Out
                </Button>
            </div>
        </>
    )
}
