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
import { useEffect, useState } from 'react';
import Animation from '../../../components/animation';

const countdown = new Date('04/06/2022 10:00:00 AM UTC');

const Mainstage = ({ speakers }) => {
  const [timer, setTimer] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setInterval(() => {
      const distance = countdown.getTime() - new Date().getTime();
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimer([days, hours, minutes, seconds]);
      if (distance < 0) {
        clearInterval(x);
        setTimer('We are now live! ✨');
      }
    }, 1000);
  }, [timer]);

  return (
    <>
      <Head>
        <title>Conference Mainstage</title>
        <meta name='description' content='Rocket.Chat Virtual GSOC Alumni Conference' />
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
                  <span className={styles.hero__body__timer}>Live In - </span>
                  <span className={styles.hero__body__timer}>{timer[0]}</span>d
                  <span className={styles.hero__body__timer_separation}>
                    {' '}
                    |{' '}
                  </span>
                  <span className={styles.hero__body__timer}>
                    {timer[1]}
                  </span>h{' '}
                  <span className={styles.hero__body__timer_separation}>
                    {' '}
                    |{' '}
                  </span>
                  <span className={styles.hero__body__timer}>
                    {timer[2]}
                  </span>m{' '}
                  <span className={styles.hero__body__timer_separation}>
                    |{' '}
                  </span>
                  <span className={styles.hero__body__timer}>{timer[3]}</span>s{' '}
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
              {new Date().getTime() - countdown.getTime() < 0 ? (
                <p className={styles.hero__liveNow__col__heading}>
                  Save the Date !{' '}
                  <span className={styles.liveNowDate}>
                    April {countdown.getDate()}th starting at{' '}
                    {countdown.toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}{' '}
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </span>
                </p>
              ) : (
                <p className={styles.hero__liveNow__col__heading}>
                  Event is live now!{' '}
                  <span role='img' aria-label='sparkles'>
                    ✨
                  </span>
                </p>
              )}
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
            <SpeakerInfotiles data={speakers} />
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
