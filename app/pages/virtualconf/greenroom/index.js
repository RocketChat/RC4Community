import { useState } from "react";
import Head from "next/head";
import styles from "../../../styles/Mainstage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Jitsibroadcaster from "../../../components/clientsideonly/jitsibroadcaster";
import InAppChat from "../../../components/inappchat/inappchat";

const greenroom_rid = "QEevFeokh4bkpX2mJ";
const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://open.rocket.chat";

const Greenroom = () => {
  const [openChat, setOpenChat] = useState(false);

  const handleOpenChat = () => {
    setOpenChat((prevState) => !prevState);
  };
  return (
    <>
      <Head>
        <title>Conference Green Room</title>
        <link rel="icon" href="../../rocket_gsoc_0" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}></div>
        <Container>
          <Row>
            <Col>
              <Jitsibroadcaster
                room={"GSOC Alumnus Meet"}
                disName={"Speaker"}
                handleChat={handleOpenChat}
              />
            </Col>
            {openChat && (
              <Col xs={4}>
                <InAppChat
                  host={host}
                  closeChat={handleOpenChat}
                  rid={greenroom_rid}
                />
              </Col>
            )}
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Greenroom;
