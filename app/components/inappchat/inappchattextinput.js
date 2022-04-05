import { useState } from 'react';
import { TextInput, Icon } from './lib/fuselage';
import { emojify, emojis } from './helpers';
import styles from '../../styles/Inappchat.module.css';

const InappchatTextInput = ({ sendMsg, onClickEmojiHandler }) => {
  const [emojiClicked, setEmojiClicked] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      <TextInput
        className={styles.textInput}
        placeholder='Message'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            sendMsg(message);
            setMessage('');
          }
        }}
        addon={
          <>
            {message.trim() !== '' ? (
              <Icon
                onClick={() => {
                  sendMsg(message);
                  setMessage('');
                }}
                name='send'
                size='x20'
              />
            ) : (
              <>
                <span
                  className={
                    emojiClicked
                      ? styles.emojisHolderIsHidden
                      : styles.emojisHolder
                  }
                >
                  {emojis.map((e) => (
                    <span
                      key={e.id}
                      className={styles.animatedEmoji}
                      dangerouslySetInnerHTML={{ __html: emojify(e.value) }}
                      onClick={() => {
                        onClickEmojiHandler(e.value);
                        sendMsg(e.value);
                      }}
                    />
                  ))}
                </span>
                <Icon
                  className={styles.emojiButton}
                  name='emoji'
                  size='x22'
                  onClick={(e) => setEmojiClicked((prevState) => !prevState)}
                />
              </>
            )}
          </>
        }
      />
    </>
  );
};

export default InappchatTextInput;
