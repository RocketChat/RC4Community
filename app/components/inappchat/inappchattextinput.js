import { useState } from 'react';
import { TextInput, Icon } from './lib/fuselage';
import { emojify, emojis } from './helpers';
import styles from '../../styles/Inappchat.module.css';

const InappchatTextInput = ({ sendMsg, emojiAnimationRef }) => {
  const [emojiClicked, setEmojiClicked] = useState(false);
  const [message, setMessage] = useState('');

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function createEmojiInDOM(emoji) {
    const innerHtml = emojify(emoji);
    const child = document.createElement('div');
    child.innerHTML = innerHtml;
    child.setAttribute('id', `${emoji}`);
    child.animate(
      [
        { bottom: '5px', scale: 0, opacity: 1 },
        { scale: `${getRandomInt(9) * 0.1}`, opacity: 1 },
        { opacity: 1 },
        { bottom: '260px', scale: '1', opacity: 0 },
      ],
      {
        duration: 2400,
        iterations: 3,
        easing: 'ease-in',
        fill: 'forwards',
      }
    );
    child.setAttribute(
      'style',
      `
        position: absolute;
        bottom: 0;
        font-size: 2rem;
        overflow: hidden;
        transform: translate(${-getRandomInt(60)}px, ${getRandomInt(50)}px);
        `
    );
    emojiAnimationRef.current.appendChild(child);
  }

  const onClickEmojiHandler = (emoji) => {
    const { childNodes: childDiv } = emojiAnimationRef?.current;
    const divCount = Object.keys(childDiv).reduce((acc, div) => {
      if (childDiv[div] instanceof HTMLDivElement) acc += 1;
      return acc;
    }, 0);
    if (divCount > 13) {
      for (var i = 0; i < 2; i++) {
        emojiAnimationRef.current.removeChild(
          emojiAnimationRef.current.firstChild
        );
        createEmojiInDOM(emoji);
      }
    } else {
      for (var i = 0; i < 2; i++) {
        createEmojiInDOM(emoji);
      }
    }
  };

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
