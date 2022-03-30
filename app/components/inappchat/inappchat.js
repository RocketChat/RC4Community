import { useEffect, useState } from "react";
import { Rocketchat } from "@rocket.chat/sdk";
import { getMessages, sendMessage } from "./lib/api";
import styles from "../../styles/Inappchat.module.css";
import { emojify, messagesSortedByDate, rcURL, useSsl } from "./helpers";
import {
  Message,
  MessageBody,
  MessageContainer,
  Icon,
  Box,
  MessageHeader,
  MessageName,
  MessageTimestamp,
  MessageToolbox,
  MessageToolboxItem,
  MessageToolboxWrapper,
  MessageUsername,
} from "./lib/fuselage";
import MDPreview from "../mdpreview";
import InappchatTextInput from "./inappchattextinput";

const rcClient = new Rocketchat({ logger: console, protocol: "ddp" });

const InAppChat = ({ closeChat, cookies, rid }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const runRealtime = async (token, rid) => {
      try {
        await rcClient.connect({ host: rcURL.host, useSsl });
        await rcClient.resume({ token });
        await rcClient.subscribe("stream-room-messages", rid);
        rcClient.onMessage(() => {
          // TODO: add the animate function here,
          // and check if that corresponds to any of the emoji that we want to animate then animate()
          getData();
        });
      } catch(err) {
        console.log(err.message);
      }
    };
    async function getData() {
      try {
        const data = await getMessages(rid, cookies);
        setMessages(data.messages);
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
    runRealtime(cookies.rc_token, rid);
  }, []);

  const sendMsg = async (message) => {
    if (message.trim() === "") {
      return;
    }
    const msg = await sendMessage(rid, message, cookies);
    setMessages([...messages, msg.message]);
  };

  return (
    <div className={styles.sidechat}>
      <div className={styles.cross} onClick={closeChat}>
        <Icon name="cross" size={"x30"} />
      </div>
      <div className={styles.chatbox}>
        <Box>
          {cookies.rc_token && cookies.rc_uid ? (
            messagesSortedByDate(messages)?.map((m) => (
              <Message className="customclass" clickable key={m._id}>
                <MessageContainer>
                  <MessageHeader>
                    <MessageName>{m.u.name}</MessageName>
                    <MessageUsername>@{m.u.username}</MessageUsername>
                    <MessageTimestamp>
                      {new Date(m.ts).toDateString()}
                    </MessageTimestamp>
                  </MessageHeader>
                  <MessageBody>
                    <MDPreview body={emojify(m.msg)} />
                  </MessageBody>
                </MessageContainer>
                <MessageToolboxWrapper>
                  <MessageToolbox>
                    <MessageToolboxItem icon="quote" />
                    <MessageToolboxItem icon="emoji" />
                    <MessageToolboxItem icon="thread" />
                  </MessageToolbox>
                </MessageToolboxWrapper>
              </Message>
            ))
          ) : (
            <p>
              Please login into{" "}
              <a href="https://open.rocket.chat" target="_blank">
                RocketChat
              </a>{" "}
              to chat!
            </p>
          )}
        </Box>
      </div>
      {cookies.rc_token && cookies.rc_uid && <InappchatTextInput sendMsg={sendMsg} />}
    </div>
  );
};

export default InAppChat;
