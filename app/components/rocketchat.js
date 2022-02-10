import dynamic from "next/dynamic";
import { useState } from "react";
import { getMessages, fetcher } from "../lib/rocketchatapi";
import styles from "../styles/RocketChat.module.css";
import useSWR from 'swr'

const TextInput = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.TextInput),
  { ssr: false }
);
const Icon = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.Icon),
  { ssr: false }
);
const Box = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.Box),
  { ssr: false }
);
const Message = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.Message),
  { ssr: false }
);
const MessageContainer = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageContainer),
  { ssr: false }
);
const MessageHeader = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageHeader),
  { ssr: false }
);
const MessageName = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageName),
  { ssr: false }
);
const MessageUsername = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageUsername),
  { ssr: false }
);
const MessageTimestamp = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageTimestamp),
  { ssr: false }
);
const MessageBody = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageBody),
  { ssr: false }
);
const MessageToolbox = dynamic(
  () =>
    import("@rocket.chat/fuselage").then(
      ({ MessageToolbox }) => MessageToolbox
    ),
  { ssr: false }
);
const MessageToolboxWrapper = dynamic(
  () =>
    import("@rocket.chat/fuselage").then((comp) => comp.MessageToolboxWrapper),
  { ssr: false }
);
const MessageToolboxItem = dynamic(
  () => import("@rocket.chat/fuselage").then((comp) => comp.MessageToolboxItem),
  { ssr: false }
);

const RocketChat = ({ closeChat, sendMessage }) => {
  const [message, setMessage] = useState("");
  const { data, mutate } = useSWR(getMessages("WS4FgsrngW4WNipgQ"), fetcher)

  return (
    <div className={styles.sidechat}>
      <div className={styles.cross} onClick={closeChat}>
        <Icon name="cross" size={"x30"} />
      </div>
      <div className={styles.chatbox}>
        <Box w={"500px"} style={{ marginTop: "30px" }}>
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
                      <MessageToolboxItem icon="clock" />
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
        addon={
          <Icon
            onClick={async () => {
              const msg = await sendMessage("WS4FgsrngW4WNipgQ", message);
              mutate({ ...data, messages: [...data.messages, msg.message] });
              setMessage('');
            }}
            name="send"
            size="x20"
          />
        }
        w={"400px"}
      />
    </div>
  );
};

export default RocketChat;
