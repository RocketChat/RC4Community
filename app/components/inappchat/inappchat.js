import { useEffect, useState, useRef } from 'react';
import { Rocketchat } from '@rocket.chat/sdk';
import { getMessages, sendMessage } from './lib/api';
import { emojify, emojis, messagesSortedByDate } from './helpers';
import Cookie from 'js-cookie';
import styles from "../../styles/Inappchat.module.css";
import {
  Message,
  MessageBody,
  MessageContainer,
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
import InappchatTextInput from './inappchattextinput';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';


const InAppChat = ({ host, closeChat, rid }) => {
  const [messages, setMessages] = useState([]);
  const emojiAnimationRef = useRef();
  const isSmallScreen = useMediaQuery("(max-width: 992px)");
  const cookies = { rc_token: Cookie.get('rc_token'), rc_uid: Cookie.get('rc_uid') };
  const isAuth = cookies.rc_token && cookies.rc_uid;
  const useSsl = !/http:\/\//.test(host);
  const rcClient = new Rocketchat({ logger: console, protocol: 'ddp', host, useSsl });

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const createEmojiInDOM = (emoji) => {
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
      for (let i = 0; i < 2; i++) {
        emojiAnimationRef.current.removeChild(
          emojiAnimationRef.current.firstChild
        );
        createEmojiInDOM(emoji);
      }
    } else {
      for (let i = 0; i < 2; i++) {
        createEmojiInDOM(emoji);
      }
    }
  };

  useEffect(() => {
    const runRealtime = async (token, rid) => {
      try {
        await rcClient.connect();
        await rcClient.resume({ token });
        await rcClient.subscribe("stream-room-messages", rid);
        rcClient.onMessage((data) => {
          emojis.find(emoji => {
            if (emoji.value === data.msg) {
              onClickEmojiHandler(emoji.value);
              return;
            }
          })
          getData();
        });
      } catch(err) {
        console.log(err.message);
      }
    };
    async function getData() {
      try {
        const data = await getMessages(host, rid, cookies);
        setMessages(data.messages);
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
    runRealtime(cookies.rc_token, rid);
  }, []);

  const sendMsg = async (message) => {
    if (message.trim() === "") {
      return;
    }
    const msg = await sendMessage(host, rid, message, cookies);
    setMessages([...messages, msg.message]);
  };

  return (
    <div className={styles.sidechat}>
      <ul ref={emojiAnimationRef} className={styles.track}></ul>{' '}
      {!isSmallScreen && (
        <div className={styles.cross} onClick={closeChat}>
          <Icon name='cross' size={'x30'} />
        </div>
      )}
      {/* chatbox component */}
      <div className={styles.chatbox}>
        <Box>
          {isAuth ? (
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
            <p className='mx-auto text-center'>
              Please login into{" "}
              <a href={host} rel="noopener noreferrer" target="_blank">
                RocketChat
              </a>{' '}
              to chat!
            </p>
          )}
        </Box>
      </div>
      {isAuth && <InappchatTextInput onClickEmojiHandler={onClickEmojiHandler} sendMsg={sendMsg} />}
    </div>
  );
};

export default InAppChat;
