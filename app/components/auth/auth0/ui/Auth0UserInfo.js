import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "react-bootstrap";
import { NoUserAvatar } from "../../NoUserAvatar";
import { getAuth0LogoutURL } from "../lib/functions";

export default function Auth0UserInfo(){
    const {user} = useUser();
    if(!user)
        return <div/>;
    return (
        <>
            <div className="d-flex flex-column align-items-center mt-4 mb-3 ml-3 mr-3 border-bottom">
                <div className="mb-1">
                    {
                        user.picture ?
                            <img src={user.picture}
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
            </div>
            <div className="d-flex justify-content-center mb-4 mt-3 ml-3 mr-3">
                <a href={getAuth0LogoutURL()}>
                    <Button variant="secondary">Sign Out</Button>
                </a>
            </div>
        </>
    )
}
