import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";

import { NavLink } from 'react-bootstrap';

const RocketChatLinkButton = ({
  children,
  href = Cookies.get("rc_authToken") ? `${process.env.NEXT_PUBLIC_RC_URL}/home?resumeToken=${Cookies.get("rc_authToken")}` : `${process.env.NEXT_PUBLIC_RC_URL}/home`,
  ...props
}) => {
  return (
    <NavLink target="_blank" href={href} {...props}>
      {children}
    </NavLink>
  );
};

export default RocketChatLinkButton;
