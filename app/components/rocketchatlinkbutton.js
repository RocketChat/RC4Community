import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";

import { NavLink } from 'react-bootstrap';

const RocketChatLinkButton = ({
  children,
  ...props
}) => {
  const [href, setHref] = useState(`${process.env.NEXT_PUBLIC_RC_URL}`)

  const getAuthToken = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_RC_URL}/api/v1/login`, {
      method: "POST",
      body: JSON.stringify({
        serviceName: "google",
        accessToken: Cookies.get('g_accessToken'),
        idToken: Cookies.get('g_idToken'),
        expiresIn: 200,
        scope: "profile"
      }),
      headers: { 'content-type': 'application/json' },
    });

    const authData = await res.json();
    setHref(`${process.env.NEXT_PUBLIC_RC_URL}/home?resumeToken=${authData.data?.authToken}`)
    return
  }

  useEffect(() => {
    if (props.user._id) {
      getAuthToken()
    }
  }, [props.user?._id])

  return (
    <NavLink target="_blank" href={href} {...props}>
      {children}
    </NavLink>
  );
};

export default RocketChatLinkButton;
