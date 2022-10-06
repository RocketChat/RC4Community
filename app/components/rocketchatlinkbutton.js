import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";

import { NavLink } from 'react-bootstrap';

const RocketChatLinkButton = ({
  children,
  channel,
  ...props
}) => {
  const [href, setHref] = useState(`${process.env.NEXT_PUBLIC_RC_URL}/home`)

  useEffect(() => {
    if (Cookies.get("rc_authToken")) {
      setHref(`${process.env.NEXT_PUBLIC_RC_URL}/channel/${channel}?resumeToken=${Cookies.get("rc_authToken")}`)
    }
  }, [Cookies.get("rc_authToken"), channel])

  return (
    <NavLink target="_blank" href={href} {...props}>
      {children}
    </NavLink>
  );
};

export default RocketChatLinkButton;
