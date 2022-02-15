import Head from 'next/head';
import Script from 'next/script';
import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Videostreamer from "../../../components/clientsideonly/videostreamer";
import InAppChat from '../../../components/inappchat/inappchat';

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/emoji-toolkit@6.6.0/extras/css/joypixels.min.css"
        />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/emoji-toolkit@6.6.0/lib/js/joypixels.min.js"
        strategy="afterInteractive"
        onLoad={() =>
          console.log(`script loaded correctly, joypixels`)
        }
      />
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
          />
        ) : (
          <Button onClick={handleOpenChat}>Open Chat</Button>
        )}
      </div>
    </>
  );
}
