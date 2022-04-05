import Head from 'next/head';
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Videostreamer from '../../../components/clientsideonly/videostreamer';
import InAppChat from '../../../components/inappchat/inappchat';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import styles from '../../../styles/Videostreamer.module.css';
import { FaRocketchat } from "react-icons/fa";

const rid = "GENERAL";
const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://community.liaison.rocketchat.digital";

const videoStreamerSrc = process.env.NEXT_PUBLIC_ROCKET_CHAT_GREENROOM_VIDEOSTREAMER_SRC

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
            src={videoStreamerSrc}
            type='application/vnd.apple.mpegurl'
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
            variant="danger"
          >
            <FaRocketchat size={25} />
          </Button>
        )}
      </div>
    </>
  );
}
