import Head from "next/head";
import { getCommunityIds } from "../../../lib/leaderboard";
import { getNavItems } from "../../../lib/navbar";
import * as LeaderboardComponent from "../../../components/leaderboard";

export default function Leaderboardpage({ leaderboardProps }) {
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
      { LeaderboardComponent.Leaderboard({... leaderboardProps}) }
    </div>  
  );
}

export async function getStaticProps({ params }) {
  const communityId = params.id;
  const leaderboardProps = await LeaderboardComponent.getLeaderboardProps(communityId,30);
  const topNavItems = await getNavItems();

  return {
    props: {
      topNavItems,
      leaderboardProps
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const paths = await getCommunityIds();
  return {
    paths: paths,
    fallback: false,
  };
}