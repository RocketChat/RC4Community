import Head from "next/head";
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Videostreamer from "../../../components/clientsideonly/videostreamer";
import InAppChat from "../../../components/inappchat/inappchat";
import { useMediaQuery } from "@rocket.chat/fuselage-hooks";
import styles from "../../../styles/Videostreamer.module.css";
import { FaRocketchat } from "react-icons/fa";
import { getIPInfo } from "../../../lib/geoAPI";

const rid = "GENERAL";
const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://community.liaison.rocketchat.digital";
const asiaLink = process.env.NEXT_PUBLIC_SERVER_STREAM_LINK0
const otherLink = process.env.NEXT_PUBLIC_SERVER_STREAM_LINK1

export default function ConfMainStage({ cookies, ipInfo }) {
  const [openChat, setOpenChat] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 992px)");
  const [streamLink, setStreamLink] = useState(asiaLink);

  const handleOpenChat = () => {
    setOpenChat((prevState) => !prevState);
  };

  useEffect(() => {
    try {
      if (
        ipInfo == null ||
        ipInfo.timezone == undefined ||
        ipInfo.timezone == null
      ) {
        return;
      }
      if (ipInfo.timezone.split("/")[0] == "Asia") {
        setStreamLink(asiaLink);
      } else {
        setStreamLink(otherLink);
      }
    } catch {
      return;
    }
  }, []);

  return (
    <>
      <div className="d-flex flex-column flex-lg-row ">
        <Head>
          <title>Virtual Conference Main Stage</title>
          <meta
            name="description"
            content="Demonstration main stage for a virtual conference"
          />
        </Head>
        <Container fluid className={styles.videoContainer}>
          <Videostreamer
            poster="/gsocsmall.jpg"
            src={streamLink}
            type="application/vnd.apple.mpegurl"
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

ConfMainStage.getInitialProps = async (ctx) => {
  try {
    const res = await getIPInfo();

    return { ipInfo: res.data };
  } catch {
    return { ipInfo: null };
  }
};
