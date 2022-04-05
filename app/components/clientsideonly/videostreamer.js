import { Col, Toast, ToastContainer } from "react-bootstrap";
import styles from "../../styles/Videostreamer.module.css";
import Script from "next/script";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Videostreamer(props) {
  const [ping, setPing] = useState(false);

  const pingStream = async () => {
    const response = await fetch(props.src);
    if (response.ok) {
      setPing(true)
    }
    
    return response;
  };
  useEffect(() => {
    setInterval(async () => {
      pingStream()
        .catch((e) => {
          console.error("Stream error", e);
          setPing(false);
          return
        });
      
    }, 30000);
  }, []);

  const handleToast = () => {
    setPing(true);
  };

  return (
    <>
      <Head>
        <link
          href="https://vjs.zencdn.net/7.17.0/video-js.css"
          rel="stylesheet"
        />
      </Head>
      <Script
        src="https://vjs.zencdn.net/7.17.0/video.min.js"
        strategy="afterInteractive"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <Col>
        <video
          autoPlay
          id="my-video"
          className="video-js vjs-big-play-centered vjs-responsive"
          controls
          preload="auto"
          poster={props.poster}
          data-setup='{"fluid": true}'
        >
          <source src={props.src} type={props.type}></source>
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading
            to a web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank">
              supports HTML5 video
            </a>
          </p>
        </video>
        <Alert
          show={!ping}
          handleToast={handleToast}
        />
      </Col>
    </>
  );
}

const Alert = ({ handleToast, show }) => {
  return (
    <ToastContainer
      position="bottom-start"
      style={{ zIndex: "10" }}
      className="p-3"
    >
      <Toast
        show={show}
        onClose={handleToast}
        delay={60000}
        autohide
        bg="warning"
      >
        <Toast.Header>
          <strong className="me-auto">Stream Alert!</strong>
        </Toast.Header>
        <Toast.Body>
          Thank you for watching! Looks like the streaming has stopped! Please
          stay tune and refresh the page if this alert does not shows up!
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
