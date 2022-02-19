// using env variables for now, should be replaced with cookies!

const host = process.env.NEXT_PUBLIC_ROCKET_CHAT_HOST;

export const getMessages = async (rid, cookies) => {
  try {
    const messages = await fetch(
      `${host}/api/v1/channels.messages?roomId=${rid}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": cookies.rc_token ?? "",
          "X-User-Id": cookies.rc_uid ?? "",
        },
        method: "GET",
      }
    );

    return await messages.json();
  } catch (err) {
    console.log(err.message);
  }
};

export const sendMessage = async (rid, message, cookies) => {
  try {
    const msg = await fetch(`${host}/api/v1/chat.sendMessage`, {
      body: `{"message": { "rid": "${rid}", "msg": "${message}" }}`,
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": cookies.rc_token ?? "",
        "X-User-Id": cookies.rc_uid ?? "",
      },
      method: "POST",
    });

    return await msg.json();
  } catch (err) {
    console.log(err.message);
  }
};
