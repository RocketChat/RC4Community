import { useEffect, useState } from "react";
import { Rocketchat } from "@rocket.chat/sdk";
import { getMessages, sendMessage } from "./lib/api";
import styles from "../../styles/Inappchat.module.css";
import { emojify, emojis, messagesSortedByDate, rcURL, useSsl } from "./helpers";
import {
  Message,
  MessageBody,
  MessageContainer,
  TextInput,
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

const rcClient = new Rocketchat({ logger: console, protocol: "ddp" });

const InAppChat = ({ closeChat, cookies, rid }) => {
  const [message, setMessage] = useState("");
  const [emojiClicked, setEmojiClicked] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const runRealtime = async (token, rid) => {
      await rcClient.connect({ host: rcURL.host, useSsl });
      await rcClient.resume({ token });
      await rcClient.subscribe("stream-room-messages", rid);
      rcClient.onMessage(() => {
        // TODO: add the animate function here,
        // and check if that corresponds to any of the emoji that we want to animate then animate()
        getData();
      });
    };
    async function getData() {
      const data = await getMessages(rid, cookies);
      setMessages(data.messages);
    }
    getData();
    runRealtime(cookies.rc_token, rid);
  }, []);

  const sendMsg = async (message) => {
    if (message.trim() === "") {
      return;
    }
    const msg = await sendMessage(rid, message, cookies);
    setMessage("");
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
      {emojiClicked && (
        <div className={styles.emojisHolder}>
          {emojis.map((e) => (
            <div
              key={e.id}
              className={styles.animatedEmoji}
              dangerouslySetInnerHTML={{ __html: emojify(e.value) }}
              onClick={() => {
                setEmojiClicked((prevState) => !prevState);
                sendMsg(e.value);
              }}
            />
          ))}
        </div>
      )}
      <TextInput
        placeholder="Message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            sendMsg(message);
          }
        }}
        addon={
          <>
            {message.trim() !== "" ? (
              <Icon onClick={() => sendMsg(message)} name="send" size="x20" />
            ) : (
              <Icon
                name="emoji"
                size="x20"
                onClick={(e) => setEmojiClicked((prevState) => !prevState)}
              />
            )}
          </>
        }
        w={"400px"}
      />
    </div>
  );
};

export default InAppChat;
