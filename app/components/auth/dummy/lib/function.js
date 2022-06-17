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

export const dummyUserLogin = () => {
  let user = JSON.parse(sessionStorage.getItem("dummy_user"));
  if (user) {
    return user;
  } else {
    return createDummyUser();
  }
};
