import Head from "next/head";
import { fetchAPI } from "../../../lib/api";
import Leaderboard from "../../../components/leaderboard";

export default function Leaderboardpage({
  contributors,
  community,
  leaderboardSize,
}) {
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
      <Leaderboard 
        contributors= {contributors}
        community = {community}
        leaderboardSize = {leaderboardSize}
      />
    </div>  
  );
}

export async function getStaticProps({ params }) {
  const communityId = params.id;
  let contributors = [];
  let communityName = null;
  let communities = await fetchAPI("/communities");
  
  communities.forEach((community) => {
    if (community.communityId === communityId) {
      contributors = community.contributors;
      communityName = community.communityName;
    }
  });

  const topNavItems = await fetchAPI("/top-nav-item");

  return {
    props: {
      contributors,
      topNavItems,
      community: communityName,
      leaderboardSize: 30,
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