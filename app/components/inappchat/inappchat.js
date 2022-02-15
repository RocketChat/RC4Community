import { useRef, useState } from "react";
import { getMessages, fetcher, sendMessage } from "./lib/api";
import useSWR from "swr";
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

const InAppChat = ({ closeChat }) => {
  const [message, setMessage] = useState("");
  const [emojiClicked, setEmojiClicked] = useState(false);
  const { data, mutate } = useSWR(getMessages("WS4FgsrngW4WNipgQ"), fetcher);

  const sendMsg = async () => {
    if (message.trim() === "") {
      return;
    }
    const msg = await sendMessage("WS4FgsrngW4WNipgQ", message);
    setMessage("");
    mutate({ ...data, messages: [...data.messages, msg.message] });
  };

  return (
    <div className={styles.sidechat}>
      <div className={styles.cross} onClick={closeChat}>
        <Icon name="cross" size={"x30"} />
      </div>
      <div className={styles.chatbox}>
        <Box>
          {data &&
            data.messages
              .sort(function (a, b) {
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
              ))}
        </Box>
      </div>
      {emojiClicked && <MDPreview body={emojify(":smile:")} />}
      <TextInput
        placeholder="Message"
        onChange={(e) => {
            setTimeout(() => {
                setMessage(e.target.value)
            }, 50)
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            sendMsg();
          }
        }}
        addon={
          <>
            {message.trim() !== "" ? (
              <Icon onClick={sendMsg} name="send" size="x20" />
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
