import { useEffect, useState, useRef } from 'react';
import { Rocketchat } from '@rocket.chat/sdk';
import { getMessages, sendMessage } from './lib/api';
import { emojify, messagesSortedByDate, rcURL, useSsl } from './helpers';
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

const rcClient = new Rocketchat({ logger: console, protocol: 'ddp' });

const InAppChat = ({ host, closeChat, rid }) => {
  const [messages, setMessages] = useState([]);
  const emojiAnimationRef = useRef();

  const isSmallScreen = useMediaQuery("(max-width: 992px)");
  const cookies = { rc_token: Cookie.get('rc_token'), rc_uid: Cookie.get('rc_uid') };
  const isAuth = cookies.rc_token && cookies.rc_uid;
  const rcURL = new URL(host);
  const useSsl = !/http:\/\//.test(host);

  useEffect(() => {
    const runRealtime = async (token, rid) => {
      try {
        await rcClient.connect({ host: rcURL.host, useSsl });
        await rcClient.resume({ token });
        await rcClient.subscribe("stream-room-messages", rid);
        rcClient.onMessage(() => {
          // TODO: add the animate function here,
          // and check if that corresponds to any of the emoji that we want to animate then animate()
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
      {isAuth && <InappchatTextInput emojiAnimationRef={emojiAnimationRef} sendMsg={sendMsg} />}
    </div>
  );
};

export default InAppChat;
