import Head from 'next/head';
import Script from 'next/script';
import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Videostreamer from "../../../components/clientsideonly/videostreamer";
import InAppChat from '../../../components/inappchat/inappchat';
import { getMessages } from "../../../components/inappchat/lib/api";
import { parseBody } from 'next/dist/server/api-utils';

const rid = process.env.NEXT_PUBLIC_ROCKET_CHAT_CONF_RID;

export default function ConfMainStage({ cookies, messages, newMessage }) {
  const [openChat, setOpenChat] = useState(false);
  console.log(newMessage)

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
            cookies={cookies}
            rid={rid}
            messages={messages}
          />
        ) : (
          <Button onClick={handleOpenChat}>Open Chat</Button>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const messages = await getMessages(process.env.NEXT_PUBLIC_ROCKET_CHAT_CONF_RID, req.cookies)
  let newMessage = null;
  
  if (req.method === "POST") {
    const body = await parseBody(req, '1mb')
    console.log("POST METHOD CALLED")
    console.log(body) // we get the response from webhook
    newMessage = body // the question is, how do we update this on the client side??
  }
  
  return {
    props: {
      messages,
      cookies: req.cookies,
      newMessage
    },
  };
}
