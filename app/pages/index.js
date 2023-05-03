import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Infotiles from '../components/infotiles';
import Newscarousel from '../components/newscarousel';
import Personacircle from '../components/personalcircle';
import Searchbox from '../components/searchbox';
import Growthcounters from '../components/growthcounters';
import { Container, Col } from 'react-bootstrap';
import { fetchAPI } from '../lib/api';
import { INFOTILES_DATA } from '../lib/const/infotiles';
import { DiscourseProvider, DiscourseTopicListTabs } from '../components/discourse/client';
import { DiscourseClient } from '../components/discourse/lib';

export default function Home(props) {
  return (
    <DiscourseProvider host={process.env.NEXT_PUBLIC_DISCOURSE_HOST}>
      <Head>
        <title>Rocket.Chat:A Communications Platform You Can Fully Trust</title>
        <meta name='description' content='Rocket.Chat is a Communications Platform You Can Fully Trust' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container
        fluid
        className='d-flex flex-column align-items-center gap-3 gap-md-5'
      >
        <Col className='d-flex flex-column align-items-center gap-2 py-5 mt-2'>
          <h1
            className={`display-4 fw-bold text-center ${styles.hero_heading}`}
          >
            Welcome to our <span className={styles.redText}>community</span>
          </h1>
          <p
            className={`fw-regular col-10 col-md-8 text-center ${styles.hero_subheading}`}
          >
            Let&apos;s dream, share, and collaborate in shaping the future of the
            Rocket.Chat ecosystem together
          </p>
        </Col>
        <Col className='mb-5 d-flex flex-column align-items-center'>
          <h6 className='py-2 fs-6'> <a href={props?.guides?.data?.location} target="_blank" rel="noreferrer">Read the Guides</a>  | <a href={props?.releaseNotes?.data?.location} target="_blank" rel="noreferrer">Read Release Notes</a> </h6>
          <Searchbox></Searchbox>
        </Col>
        <Col>
          <Growthcounters></Growthcounters>
        </Col>
        <Col className='my-5'>
          <div className={styles.infotiles}>
            <Infotiles data={INFOTILES_DATA} />
          </div>
        </Col>

        <div
          className={`d-flex flex-column py-5 ${styles.community_news}  `}
        >
          <h2 className={`mx-auto  w-auto pb-5 ${styles.title}`}>
            Latest Community News
          </h2>
          <Newscarousel carousels={props.carousels.data}></Newscarousel>
        </div>

        <h2 className={`mx-auto w-auto m-5 ${styles.title}`}>
          Get What You Need...
        </h2>
        <Personacircle personas={props.personas.data}></Personacircle>

        <div className={` d-flex w-100 flex-column py-5 align-items-center`}>
          <h2 className={`mx-auto w-auto m-2 ${styles.title}`}>
            Community Activity
          </h2>
          <DiscourseTopicListTabs max={10} maxWidth={'900px'} tabs={props.discourseTabsData}/>
        </div>
      </Container>
    </DiscourseProvider>
  );
}

export async function getStaticProps({ params }) {
  const carousels = await fetchAPI('/carousels');
  const personas = await fetchAPI('/personas');
  const guides = await fetchAPI('/guide');
  const releaseNotes = await fetchAPI('/release-note');
  const topNavItems = await fetchAPI('/top-nav-item');

  let discourseTabsData = [];
  if (process.env.NEXT_PUBLIC_DISCOURSE_HOST) {
    const discourseClient = new DiscourseClient(process.env.NEXT_PUBLIC_DISCOURSE_HOST, {
      /**
       * Switch to false if using apiKey and apiUserName.
       * Currently using only unauthenticated apis. So apiKey and apiUserName is not required
       * */
      isClient: true,
    });
    const topTopics = await discourseClient.getTopTopics()
    const latestTopics = await discourseClient.getLatestTopics()
    const solvedTopics = await discourseClient.getSolvedTopics()
    const unsolvedTopics = await discourseClient.getUnsolvedTopics()
    discourseTabsData = [{
      variant: 'top',
      data: topTopics,
    }, {
      variant: 'latest',
      data: latestTopics,
    }, {
      variant: 'solved',
      data: solvedTopics
    }, {
      variant: 'unsolved',
      data: unsolvedTopics,
    }];
  }

  return {
    props: { carousels, personas, guides, releaseNotes, topNavItems, discourseTabsData },
  };
}
