import Head from "next/head";
import { fetchAPI } from "../../../lib/api";
import { contributorList } from "../../../lib/leaderboard";
import { Container, Col } from "react-bootstrap";
import styles from "../../../styles/Leaderboard.module.css";
import LeaderboardTable from "../../../components/leaderBoardTable";

export default function LeaderBoard({ contributors }) {
  return (
    <div>
      <Head>
        <title>GSOC2022 LeaderBoard</title>
        <meta
          name="description"
          content="Rocket.Chat LeaderBoard for GSOC2022"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </Head>
      <Container
        fluid
        className="d-flex flex-column align-items-center gap-2 gap-md-5"
      >
        <Col className="d-flex flex-column align-items-center gap-2 pt-3">
          <h1
            className={`display-6 fw-bold text-center ${styles.hero_heading}`}
          >
            <span className={styles.redText}>Rocket.Chat</span> GSoC
            Contribution Leaderboard
          </h1>
          <p
            className={`fw-regular col-10 col-md-8 text-center ${styles.hero_subheading}`}
          >
            Start your open-source jourey with rocket.chat
          </p>
        </Col>
        <Col className="d-flex flex-column align-items-center col-10 col-md-8">
          <LeaderboardTable contributors={contributors} tableSize={30}/>
        </Col>
      </Container>
    </div>
  );
}


export async function getStaticProps({ params }) {

  const communityName  = params.id;
  const communityData = {
    rocketChat : {
      community : "Rocket.Chat",
      leaderBoardAPI : "https://gsoc.rocket.chat/api/data"
    },
    socketChat : {
      community : "Socket.Chat",
      leaderBoardAPI : "https://gsoc.rocket.chat/api/data"
    }
  };

  const leaderBoardAPI = (communityData[communityName].leaderBoardAPI);
  const res = await fetch(leaderBoardAPI);
  const data = await res.json();
  const contributors = await contributorList(data);
  const topNavItems = await fetchAPI("/top-nav-item");

  return {
      props:{
        contributors,
        topNavItems,
        community:communityData[communityName].community
      },
      revalidate: 10,
  }
}

export async function getStaticPaths() {

  return {
      paths: [
        { params: { id : 'rocketChat' } },
        { params: { id : 'socketChat' } }
      ],
      fallback : 'blocking'
  }
  // Return a list of possible value for id
}
// LeaderBoard.getInitialProps = async (ctx) => {
//   const res = await fetch("https://gsoc.rocket.chat/api/data");
//   const data = await res.json();

//   let contributors = await contributorList(data);
//   const topNavItems = await fetchAPI("/top-nav-item");

//   return {    
//     contributors,
//     topNavItems,
//   };
// }

