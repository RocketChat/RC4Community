import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Infotiles from '../components/infotiles';
import Newscarousel from '../components/newscarousel';
import Personacircle from '../components/personalcircle';
import Discourserankedlist from '../components/discourserankedlist';
import Searchbox from '../components/searchbox';
import Growthcounters from '../components/growthcounters';
import { Container, Col } from 'react-bootstrap';
import { fetchAPI } from '../lib/api';
import { withFirebaseAuthUser } from '../components/auth/firebase';
import { INFOTILES_DATA } from '../lib/const/infotiles';

function Home(props) {
  return (
    <>
      <Head>
        <title>Rocket.Chat: Communications Platform You Can Fully Trust</title>
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
            Let's dream, share, and collaborate in shaping the future of the
            Rocket.Chat ecosystem together
          </p>
        </Col>
        <Col className='mb-5 d-flex flex-column align-items-center'>
          <h6 className='py-2 fs-6'> <a href={props?.guides?.data?.location} target="_blank">Read the Guides</a>  | <a href={props?.releaseNotes?.data?.location} target="_blank">Read Release Notes</a> </h6>
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

        <div className={` d-flex flex-column py-5 align-items-center`}>
          <h2 className={`mx-auto w-auto m-5 ${styles.title}`}>
            Community Activity
          </h2>
          <Discourserankedlist topposts={props.topPosts.data}></Discourserankedlist>
        </div>
      </Container>
    </>
  );
}
export default withFirebaseAuthUser()(Home);

export async function getStaticProps({ params }) {
  const carousels = await fetchAPI('/carousels');
  const personas = await fetchAPI('/personas');
  const guides = await fetchAPI('/guide');
  const releaseNotes = await fetchAPI('/release-note');
  const topNavItems = await fetchAPI('/top-nav-item');
  const topPosts = await fetchAPI('/discourses');
 
  return {
    props: { carousels, personas, guides, releaseNotes, topNavItems, topPosts },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 second
    revalidate: 1,
  };
}
