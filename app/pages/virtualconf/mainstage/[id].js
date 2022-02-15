import Head from 'next/head';
import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Videostreamer from "../../../components/clientsideonly/videostreamer";
import InAppChat from '../../../components/inappchat/inappchat';
import { getMessages, sendMessage } from '../../../components/inappchat/lib/api';

// THE ROOM IN WHICH THE SUMMIT WILL TAKE PLACE! <HARD CODED FOR NOW>
const rid = 'WS4FgsrngW4WNipgQ';

export default function ConfMainStage() {
  const [openChat, setOpenChat] = useState(false);

  const handleOpenChat = () => {
    setOpenChat((prevState) => !prevState);
  };

  return (
    <>
      <div className="d-flex">
      <Head>
        <title>Virtual Conference Main Stage</title>
        <meta
          name="description"
          content="Demonstration main stage for a virtual conference"
        />
      </Head>
      <Container
        fluid>
          <Videostreamer poster="/gsocsmall.jpg"  
          src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"
          type='video/mp4'> 
          </Videostreamer> 
          
      </Container>
        {openChat ? (
          <InAppChat
            closeChat={handleOpenChat}
            sendMessage={sendMessage}
            getMessages={getMessages}
          />
        ) : (
          <Button onClick={handleOpenChat}>Open Chat</Button>
        )}
      </div>
    </>
  );
}
