import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import RCPlusGSocLogo from "/public/rcandgsoclogo.png";
import CirclesSVG from "/public/svg/circles.js";
import RCPlusGSocCompactLogo from "/public/rcandgsoclogocompact.png";
import NowLive from "/public/now-live.png";
import ArrowSVG from "/public/svg/arrow.js";
import styles from "../../../styles/Mainstage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Infotiles from "../../../components/infotiles";

const data = [
  {
    id: 1,
    imageURL: "/placeholder-img.png",
    name: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aligyam",
    actionBtn: "Live",
  },
  {
    id: 2,
    imageURL: "/placeholder-img.png",
    name: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aligyam",
  },
  {
    id: 3,
    imageURL: "/placeholder-img.png",
    name: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aligyam",
  },
  {
    id: 4,
    imageURL: "/placeholder-img.png",
    name: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aligyam",
  },
  {
    id: 5,
    imageURL: "/placeholder-img.png",
    name: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aligyam",
  },
  {
    id: 6,
    imageURL: "/placeholder-img.png",
    name: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aligyam",
  },
  {
    id: 7,
    imageURL: "/placeholder-img.png",
    name: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aligyam",
  },
  {
    id: 8,
    imageURL: "/placeholder-img.png",
    name: "Lorem ipsum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aligyam",
  },
];

const Mainstage = () => {
  return (
    <>
      <Head>
        <title>Conference Mainstage</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <CirclesSVG />
          <div className={styles.topNav}>
            <Link href="/">
              <h3 as="h3" className={styles.headerTitle}>
                Rocket.Chat
              </h3>
            </Link>
            <Image
              src={RCPlusGSocCompactLogo}
              className={styles.rcgsoccompactlogo}
            />
          </div>
          <Container>
            <Row>
              <Col md={6} xs={12}>
                <h2>Rocket.Chat GSoC 2022 Alumni Summit</h2>
                <span className={styles.thinText}>about the summit</span>
                <p>Event Live Now ✨</p>
              </Col>
              <Col md={6} xs={12} className={styles.imageHolders}>
                <Image className={styles.rcgsoclogo} src={RCPlusGSocLogo} />
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row className={styles.liveNow}>
            <Col md={6} xs={12} className={styles.liveNowInnerCol}>
              <h5>We are now live</h5>
              <p className={styles.thinText}>Click to attend the event</p>
              <button className={styles.btnColor}>
                Join now <ArrowSVG />
              </button>
            </Col>
            <Col md={6} xs={12} className={styles.imageHolders}>
              <Image src={NowLive} />
            </Col>
          </Row>
        </Container>
        <Container>
          <h2 className={styles.heading}>
            A Heading that indicates/says about speakers
          </h2>
          <div className={styles.speakersContainer}>
            <Infotiles data={data} />
          </div>
        </Container>
        <footer className={styles.footer}>
          <Link href={"/"}>
            <span className={styles.footerText}>Rocket.Chat</span>
          </Link>
        </footer>
      </main>
    </>
  );
};

export default Mainstage;

Mainstage.getLayout = function getLayout(page) {
  return <>{page}</>;
};
