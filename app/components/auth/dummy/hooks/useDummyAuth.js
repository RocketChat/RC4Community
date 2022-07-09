import { useEffect, useState } from "react";

const createDummyUser = () => {
  return {
    id: 1,
    name: "dummy.cat",
    image:
      "https://user-images.githubusercontent.com/25859075/29918905-88dcc646-8e5c-11e7-81ec-242bc58dce1b.jpg",
    email: "dummyuser@rocket.chat",
    emailVerified: false,
    phoneNumber: null,
    displayName: "dummy.cat",
  };
};

export const useDummyAuth = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const isStoredInSession = JSON.parse(sessionStorage.getItem("dummy_user"));
    if (isStoredInSession) {
      setUser(isStoredInSession);
    }
  }, []);

  const handleLogin = () => {
    const dummy_user = createDummyUser();
    setUser(dummy_user);
    sessionStorage.setItem("dummy_user", JSON.stringify(dummy_user));
  };
  
  const handleLogout = () => {
    setUser({});
    sessionStorage.removeItem("dummy_user");
  };

  return {
    user,
    handleLogin,
    handleLogout,
  };
};
