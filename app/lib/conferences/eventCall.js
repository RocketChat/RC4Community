import axios from "axios";

const eventUrl = process.env.NEXT_PUBLIC_EVENT_BACKEND_URL;

export const eventAuthSignIn = async (signInf) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const res = await axios.post(`${eventUrl}/v1/auth/login`, signInf, {
    headers: headers,
  });
  return res;
};

export const eventAuthSignUp = async (signUpf) => {
  const headers = {
    "Content-Type": "application/vnd.api+json",
  };
  console.log("signUpf", signUpf)
  const res = await axios.post(`${eventUrl}/v1/users`, signUpf, {
    headers: headers,
  });
  return res;
};
