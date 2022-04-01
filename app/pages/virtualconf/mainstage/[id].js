import Head from 'next/head';
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Videostreamer from '../../../components/clientsideonly/videostreamer';
import InAppChat from '../../../components/inappchat/inappchat';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import styles from '../../../styles/Videostreamer.module.css';

const rid = process.env.NEXT_PUBLIC_ROCKET_CHAT_CONF_RID;
const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://community.liaison.rocketchat.digital";

export default function ConfMainStage({ cookies }) {
  const [openChat, setOpenChat] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width: 992px)');

  const handleOpenChat = () => {
    setOpenChat((prevState) => !prevState);
  };

  return (
    <>
      <div className='d-flex flex-column flex-lg-row '>
        <Head>
          <title>Virtual Conference Main Stage</title>
          <meta
            name='description'
            content='Demonstration main stage for a virtual conference'
          />
        </Head>
        <Container fluid className={styles.videoContainer}>
          <Videostreamer
            poster='/gsocsmall.jpg'
            src='https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4'
            type='video/mp4'
          ></Videostreamer>
        </Container>
        {isSmallScreen ? (
          <InAppChat closeChat={handleOpenChat} host={host} rid={rid} />
        ) : openChat ? (
          <InAppChat closeChat={handleOpenChat} host={host} rid={rid} />
        ) : (
          <Button
            className={`${styles.chatButton} border border-danger`}
            onClick={handleOpenChat}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              class='bi bi-chat-dots'
              viewBox='0 0 16 16'
            >
              <path d='M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
              <path d='m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z' />
            </svg>
          </Button>
        )}
      </div>
    </>
  );
}
