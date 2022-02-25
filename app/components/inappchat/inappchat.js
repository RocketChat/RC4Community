import { useState } from "react";
import { sendMessage } from "./lib/api";
import styles from "../../styles/Inappchat.module.css";
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

const emojify = (message) => {
  return joypixels.toImage(message);
};

const emojis = [
  { id: 1, value: ":smile:" },
  { id: 2, value: ":thumbsup:" },
  { id: 3, value: ":heart:" },
  { id: 4, value: ":partying_face:" },
];

const InAppChat = ({ closeChat, cookies, rid, messages: data }) => {
  const [message, setMessage] = useState("");
  const [emojiClicked, setEmojiClicked] = useState(false);

  const sendMsg = async (message) => {
    if (message.trim() === "") {
      return;
    }
    const msg = await sendMessage(rid, message, cookies);
    setMessage("");
    setData({ ...data, messages: [...data.messages, msg.message] });
  };

  return (
    <div className={styles.sidechat}>
      <div className={styles.cross} onClick={closeChat}>
        <Icon name="cross" size={"x30"} />
      </div>
      <div className={styles.chatbox}>
        <Box>
          {cookies.rc_token && cookies.rc_uid ? (
            data &&
            data?.messages
              ?.sort(function (a, b) {
                return a.ts < b.ts ? -1 : a.ts > b.ts ? 1 : 0;
              })
              .map((m) => (
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
