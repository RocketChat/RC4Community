import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

const EventHome = () => {
  const router = useRouter();
  let session = Cookies.get("event_authentication");
  useEffect(() => {
    if (session) {
    session = JSON.parse(session)
    }
  })

  const handleClick = () => {
    if (session?.access_token) {
      router.push("/conferences/confCreate");
    } else {
      router.push("/conferences/confAuth");
    }
  };

  return <Button onClick={handleClick}>Create Event!</Button>;
};


export default EventHome;
