import dynamic from "next/dynamic";
import styles from "../styles/RocketChat.module.css";

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

const RocketChat = ({ closeChat }) => {
  return (
    <div className={styles.sidechat}>
      <div className={styles.cross} onClick={closeChat}>
        <Icon name="cross" size={"x30"} />
      </div>
      <div className={styles.chatbox}>
        <Box w={"400px"} style={{ marginTop: "30px" }}>
          <Message className="customclass" clickable>
            <MessageContainer>
              <MessageHeader>
                <MessageName>Haylie George</MessageName>
                <MessageUsername>@haylie.george</MessageUsername>
                <MessageTimestamp>12:00 PM</MessageTimestamp>
              </MessageHeader>
              <MessageBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
              </MessageBody>
            </MessageContainer>
            <MessageToolboxWrapper>
              <MessageToolbox>
                <MessageToolboxItem icon="quote" />
                <MessageToolboxItem icon="clock" />
                <MessageToolboxItem icon="thread" />
              </MessageToolbox>
            </MessageToolboxWrapper>
          </Message>
        </Box>
      </div>
      <TextInput
        placeholder="Message"
        addon={<Icon name="send" size="x20" />}
        w={"400px"}
      />
    </div>
  );
};

export default RocketChat;
