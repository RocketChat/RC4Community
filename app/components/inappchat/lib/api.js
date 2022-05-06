import axios from 'axios';

export const getMessages = async (host, rid, cookies) => {
  try {
    const messages = await axios.get(`${host}/api/v1/channels.messages?roomId=${rid}`, { headers: {
      "Content-Type": "application/json",
          "X-Auth-Token": cookies.rc_token ?? "",
          "X-User-Id": cookies.rc_uid ?? "",
    } })
    return messages.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const sendMessage = async (host, rid, message, cookies) => {
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
