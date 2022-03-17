import { useState } from "react";
import { TextInput, Icon } from "./lib/fuselage";
import { emojis } from "./helpers";
import styles from "../../styles/Inappchat.module.css";

const InappchatTextInput = ({ sendMsg }) => {
  const [emojiClicked, setEmojiClicked] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <>
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
          setMessage("");
        }
      }}
      addon={
        <>
          {message.trim() !== "" ? (
            <Icon
              onClick={() => {
                sendMsg(message);
                setMessage("");
              }}
              name="send"
              size="x20"
            />
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
    </>
  );
};

export default InappchatTextInput;
