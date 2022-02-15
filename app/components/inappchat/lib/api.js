// using env variables for now, should be replaced with cookies!
export const fetcher = (url) =>
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": process.env.NEXT_PUBLIC_ROCKET_CHAT_AUTH_USER_TOKEN,
      "X-User-Id": process.env.NEXT_PUBLIC_ROCKET_CHAT_AUTH_USER_ID,
    },
    method: "GET",
  }).then((res) => res.json());

export const getMessages = (rid) => `http://localhost:3000/api/v1/channels.messages?roomId=${rid}`;

export const sendMessage = async (rid, message) => {
  try {
    const msg = await fetch("http://localhost:3000/api/v1/chat.sendMessage", {
    body: `{"message": { "rid": "${rid}", "msg": "${message}" }}`,
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": process.env.NEXT_PUBLIC_ROCKET_CHAT_AUTH_USER_TOKEN,
      "X-User-Id": process.env.NEXT_PUBLIC_ROCKET_CHAT_AUTH_USER_ID,
    },
    method: "POST",
  });

  return await msg.json();
  } catch (err) {
    console.log(err.message);
  }
}
