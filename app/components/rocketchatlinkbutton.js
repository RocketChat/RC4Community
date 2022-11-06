import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-bootstrap';

const RocketChatLinkButton = ({
  children,
  channel,
  ...props
}) => {
  const [href, setHref] = useState(`${process.env.NEXT_PUBLIC_RC_URL}/home`)

  const [cookies] = useCookies(['rc_token']);

  useEffect(() => {
    if (cookies.rc_token) {
      setHref(`${process.env.NEXT_PUBLIC_RC_URL}/channel/${channel}?resumeToken=${cookies.rc_token}`)
    }
  }, [cookies.rc_token, channel])

  return (
    <NavLink target="_blank" href={href} {...props}>
      {children}
    </NavLink>
  );
};

export default RocketChatLinkButton;
