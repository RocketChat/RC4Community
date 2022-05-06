import axios from "axios";
const ipToken = process.env.NEXT_PUBLIC_IPINFO_TOKEN;

export const getIPInfo = async () => {
  try {
    const res = await axios.get(`https://ipinfo.io/json?token=${ipToken}`);
    return res;
  } catch (e) {
    console.log("error while fetching IPInfo", e);
  }
};
