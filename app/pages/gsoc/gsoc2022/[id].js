import Head from "next/head";
import { fetchAPI } from "../../../lib/api";
import { contributorList } from "../../../lib/leaderboard";
import { Container, Col } from "react-bootstrap";
import styles from "../../../styles/Leaderboard.module.css";
import LeaderboardTable from "../../../components/leaderBoardTable";

export default function LeaderBoard({ contributors , community }) {
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
            <span className={styles.redText}>{community}</span> GSoC
            Contribution Leaderboard
          </h1>
          <p
            className={`fw-regular col-10 col-md-8 text-center ${styles.hero_subheading}`}
          >
            Start your open-source jourey with {community}
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
  const communityId = params.id;
  let data = [];
  let communityName = null;
  let communities = await fetchAPI("/communities");
  communities.forEach((community) => {
    if (community.communityId === communityId) {
      data = community.contibutors;
      communityName = community.communityName;
    }
  });

  const contributors = await contributorList(data);
  const topNavItems = await fetchAPI("/top-nav-item");

  return {
    props: {
      contributors,
      topNavItems,
      community: communityName,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  let communities = await fetchAPI("/communities");
  let paths = [];
  communities.forEach((community) => {
    paths.push({
      params: { id: community.communityId },
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}