import { useMemo, useEffect, useState } from 'react';
import { getMessages, sendMessage } from './lib/api';
import styles from '../../styles/Inappchat.module.css';
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
} from './lib/fuselage';
import MDPreview from '../mdpreview';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import EmojiOne from 'emojione';
import Animation from './animation';

const emojify = (message) => {
  return EmojiOne.toImage(message);
};
const i = 0;
const emojis = [
  { id: 1, value: ':smile:' },
  { id: 2, value: ':thumbsup:' },
  { id: 3, value: ':heart:' },
  { id: 4, value: ':partying_face:' },
];

const InAppChat = ({ closeChat, cookies, rid }) => {
  const [message, setMessage] = useState('');
  const [emojiClicked, setEmojiClicked] = useState(false);
  const [data, setData] = useState({});

  // an array which gets an emoji when clicked then we itterate through that array to display the emojis
  const [emojiArr, setEmojiArr] = useState([]);

  // adds an emoji to array and if the array has 3 emojis in it, this removes one and adds the other when clicked
  const emojiFunction = (emoji) => {
    if (emojiArr.length >= 3) {
      setEmojiArr(emojiArr.filter((item) => item !== emojiArr[2]));
      setEmojiArr((prevState) => [...prevState, emoji]);
      console.log(emojiArr);
    } else {
      setEmojiArr((prevState) => [...prevState, emoji]);
    }
  };

  // runs after every 2s to remove a emoji from the array
  // useEffect(() => {
  //   if (emojiArr.length > 0) {
  //     const interval = setInterval(() => {
  //       setEmojiArr((emojiArr) => emojiArr.filter((_, index) => index !== i));
  //     }, 2000);
  //     return () => clearInterval(interval);
  //   }
  // }, [emojiArr]);

  const isSmallScreen = useMediaQuery('(max-width: 992px)');

  useEffect(() => {
    async function getData() {
      const data = await getMessages(rid, cookies);
      setData(data);
    }
    getData();
  }, []);

  const sendMsg = async (message) => {
    if (message.trim() === '') {
      return;
    }
    const msg = await sendMessage(rid, message, cookies);
    setMessage('');
    setData({ ...data, messages: [...data.messages, msg.message] });
  };

  return (
    <div className={styles.sidechat}>
      {/* Animation component */}
      <Animation emojify={emojify} emojiArr={emojiArr} />
      {/* cross symbol */}
      {!isSmallScreen && (
        <div className={styles.cross} onClick={closeChat}>
          <Icon name='cross' size={'x30'} />
        </div>
      )}
      {/* chatbox component */}
      <div className={styles.chatbox}>
        <Box>
          {cookies.rc_token && cookies.rc_uid ? (
            data &&
            data?.messages
              ?.sort(function (a, b) {
                return a.ts < b.ts ? -1 : a.ts > b.ts ? 1 : 0;
              })
              .map((m) => (
                <Message className='customclass' clickable key={m._id}>
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
                      <MessageToolboxItem icon='quote' />
                      <MessageToolboxItem icon='emoji' />
                      <MessageToolboxItem icon='thread' />
                    </MessageToolbox>
                  </MessageToolboxWrapper>
                </Message>
              ))
          ) : (
            <p className='mx-auto text-center'>
              Please login into{' '}
              <a href='https://open.rocket.chat' target='_blank'>
                RocketChat
              </a>{' '}
              to chat!
            </p>
          )}
        </Box>
      </div>
      {/*Inbox component */}
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
          }
        }}
        addon={
          <>
            {message.trim() !== '' ? (
              <Icon onClick={() => sendMsg(message)} name='send' size='x22' />
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
                        //  setEmojiClicked((prevState) => !prevState);
                        console.log(e.value);
                        emojiFunction(e.value);
                        // sendMsg(e.value);
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
    </div>
  );
};

export default InAppChat;
