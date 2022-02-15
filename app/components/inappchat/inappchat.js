import { useState } from "react";
import { getMessages, fetcher } from "./lib/api";
import useSWR from 'swr'
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

const InAppChat = ({ closeChat, sendMessage }) => {
  const [message, setMessage] = useState("");
  const { data, mutate } = useSWR(getMessages("WS4FgsrngW4WNipgQ"), fetcher, { refreshInterval: 100 })

  const sendMsg = async () => {
    if (message.trim() === '') {
      return;
    }
    setMessage('');

    const msg = await sendMessage("WS4FgsrngW4WNipgQ", message);
    mutate({ ...data, messages: [...data.messages, msg.message] });
  }

  return (
    <div className={styles.sidechat}>
      <div className={styles.cross} onClick={closeChat}>
        <Icon name="cross" size={"x30"} />
      </div>
      <div className={styles.chatbox}>
        <Box>
          {data && data.messages
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
                    <MessageBody>{m.msg}</MessageBody>
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
      <TextInput
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            sendMsg();
          }
        }}
        addon={
          <>
          <Icon name="emoji" size="x20" style={{ marginRight: '6px' }} />
          <Icon
            onClick={sendMsg}
            name="send"
            size="x20"
          />
          </>
        }
        w={"400px"}
      />
    </div>
  );
};

export default InAppChat;
