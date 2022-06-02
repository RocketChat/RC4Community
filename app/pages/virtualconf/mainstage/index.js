import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import RCPlusGSocLogo from '/public/rcandgsoclogo.png';
import CirclesSVG from '/public/svg/circles.js';
import RCPlusGSocCompactLogo from '/public/rcandgsoclogocompact.png';
import styles from '../../../styles/Mainstage.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import SpeakerInfotiles from '../../../components/speakerinfotile';
import { fetchAPI } from '../../../lib/api';
import Animation from '../../../components/animation';
const Mainstage = ({ speakers }) => {
  return (
    <>
      <Head>
        <title>Conference Mainstage</title>
        <meta
          name='description'
          content='Rocket.Chat Virtual GSOC Alumni Conference'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.hero__SVG}>
            <CirclesSVG />
          </div>
          <div className={styles.hero__topNav}>
            <Link href='/'>
              <h3 as='h3'>Rocket.Chat</h3>
            </Link>
            <Image
              src={RCPlusGSocCompactLogo}
              className={styles.hero__topNav__image}
            />
          </div>
          <Container className={styles.hero__body}>
            <Row className='d-flex align-items-center '>
              <Col lg={6} md={12} xs={12}>
                <h2 className={styles.hero__body__heading}>
                  Rocket.Chat's GSOC Alumni Summit 2022
                </h2>
                <p className={styles.hero__body__text}>
                  We are pleased to announce our Google Summer of Code Alumni
                  Summit 2022. Our goal is to bring former and new contributors
                  together, among other interested parties to share experiences,
                  insights, and tips on how to get the most out of this amazing
                  program.
                </p>
                <p className={styles.hero__body__time}>
                  <span className={styles.hero__body__timer}>
                    Live Stream ended
                  </span>
                </p>
              </Col>
              <Col lg={6} md={0} xs={12} className={styles.hero__body__image}>
                <Image src={RCPlusGSocLogo} />
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row className={styles.hero__liveNow}>
            <Col md={8} xs={12} className={styles.hero__liveNow__col}>
              <p className={styles.hero__liveNow__col__heading}>
                Recordings are available on{' '}
                <Link
                  href={
                    'https://www.youtube.com/playlist?list=PLee3gqXJQrFW3dMG1P8qGzQ7E7Ea1SB80'
                  }
                >
                  Youtube
                </Link>
              </p>
              <p className={styles.hero__liveNow__col_text}>
                Open Source is not only about technology. It's about people too!
                Human connections that will expand your network and enable you
                to both learn and teach along the way.
              </p>
            </Col>
            <Col md={4} xs={12} className={styles.hero__liveNow__col__image}>
              <span className={styles.hero__liveNow__col__box}>
                <span className={styles.arrow__left}></span>
              </span>
              <Animation />
            </Col>
          </Row>
        </Container>
        <Container>
          <h2 className={styles.heading}>Speakers</h2>
          <div className={styles.speakersContainer}>
            <SpeakerInfotiles data={speakers.data} />
          </div>
        </Container>{' '}
      </main>
    </>
  );
};

export default Mainstage;

export async function getStaticProps({ params }) {
  const speakers = await fetchAPI('/speakers');
  return {
    props: { speakers },
    revalidate: 1,
  };
}
