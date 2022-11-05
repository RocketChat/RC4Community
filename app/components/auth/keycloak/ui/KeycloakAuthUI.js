import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { NoUserAvatar } from "../../NoUserAvatar";
import signOutKC from "../lib/signOutKC";

export default function KeycloakUserInfo() {
    const { data: session } = useSession();
    if (!session)
        return <div />;
    const user = session.user;
    return <>
        <div className="d-flex flex-column align-items-center mt-4 mb-3 ml-3 mr-3 border-bottom">
            <div className="mb-1">
                {
                    user.image ?
                        <Image src={user.image}
                            alt={user.name}
                            style={{
                                borderRadius: "50%"
                            }}
                            height={64}
                            width={64} />
                        :
                        <NoUserAvatar size="64" name={user.name} />
                }
            </div>
            <div className="font-weight-bold mb-1">
                {user.name}
            </div>
            <div
                className="mb-1"
                style={{ color: "var(--bs-gray-700)" }}>
                {user.email}
            </div>
            <div
                className="mb-1"
                style={{ color: "var(--bs-gray-700)" }}>
                <Link href="/api/auth/profilekc">Manage profile</Link>
            </div>
        </div>
        <div className="d-flex justify-content-center mb-4 mt-3 ml-3 mr-3">
            <Button variant="secondary"
                onClick={() => signOutKC({ callbackUrl: window.location.href })}>
                Sign Out
            </Button>
        </div>
    </>;
}
