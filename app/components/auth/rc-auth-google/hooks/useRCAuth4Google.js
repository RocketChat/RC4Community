import { useEffect, useState } from "react";

import { useRouter } from 'next/router'
import Cookies from "js-cookie";

import RocketChatInstance from "../gapi";
import { useGoogleLogin } from "../useGoogleLogin";

export const useRCAuth4Google = () => {
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userOrEmail, setUserOrEmail] = useState(null);
  const [method, setMethod] = useState(undefined);

  const { signIn, signOut } = useGoogleLogin(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  const router = useRouter();

  const RCInstance = new RocketChatInstance(
    process.env.NEXT_PUBLIC_RC_URL,
    process.env.NEXT_PUBLIC_RC_ROOM_ID
  );

  useEffect(() => {
    const isStoredInSession = JSON.parse(sessionStorage.getItem("grc_user"));
    if (isStoredInSession) {
      setUser(isStoredInSession);
    }
  }, []);

  const handleLogin = async (acsCode) => {
    try {
      const res = await RCInstance.googleSSOLogin(signIn, acsCode);
      if (res?.me) {
        sessionStorage.setItem("grc_user", JSON.stringify(res.me));
        setUser(res.me);
      }
      if (res.error === "totp-required") {
        setUserOrEmail(res.details.emailOrUsername);
        setIsModalOpen(true);
        if (res.details.availableMethods.length > 1) {
          setMethod("totp");
        } else {
          setMethod(res.details.availableMethods[0]);
        }
      }
    } catch (e) {
      console.error("A error occurred while setting up user", e);
    }
  };

  const handleLogout = async () => {
    setUser({});
    await RCInstance.logout(signOut);

    sessionStorage.removeItem("grc_user");
    router.reload();
  };

  const handleResend = async () => {
    const res = await RCInstance.resend2FA(userOrEmail)
    return res
  }

  return {
    user,
    handleLogin,
    handleLogout,
    handleResend,
    isModalOpen,
    setIsModalOpen,
    method,
    userOrEmail
  };
};