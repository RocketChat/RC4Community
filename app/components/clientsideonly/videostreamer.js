import { Col } from "react-bootstrap";
import styles from "../../styles/Videostreamer.module.css";
import Script from "next/script";
import Head from "next/head";

export default function Videostreamer(props) {
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
          class="video-js vjs-big-play-centered vjs-responsive"
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
      </Col>
    </>
  );
}
