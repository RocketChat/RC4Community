import Head from 'next/head';
import { Container, Col } from "react-bootstrap";
import Videostreamer from "../../../components/clientsideonly/videostreamer";

export default function ConfMainStage() {
  return (
    <>
    <div>
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
    </div>
    </>
  );
}
