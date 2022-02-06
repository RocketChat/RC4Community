import Head from "next/head";
import Image from "next/image";
import { fetchAPI } from "../../../lib/api";
import { contributorList } from "../../../lib/leaderboard";
import { Container, Col, Table } from "react-bootstrap";
import styles from "../../../styles/Leaderboard.module.css";

export default function LeaderBoard({
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
          <Table className={`${styles["leader-board-table"]} d-sm-table-sm`}>
            <thead>
              <tr>
                <th scope="col" colSpan="1" className="d-sm-none d-table-cell">
                  Rank
                </th>
                <th scope="col" colSpan="1">
                  Contributor
                </th>
                <th scope="col" colSpan="2">
                  UserName
                </th>
                <th scope="col" colSpan="1" className="d-none d-sm-table-cell">
                  Open PRs
                </th>
                <th scope="col" colSpan="1" className="d-none d-sm-table-cell">
                  Merged PRs
                </th>
                <th scope="col" colSpan="1" className="d-none d-sm-table-cell">
                  Issues
                </th>
              </tr>
            </thead>
            <tbody>
              {contributors
                .slice(0, leaderboardSize)
                .map((contributor, index) => (
                  <tr>
                    <td
                      scope="col"
                      colSpan="1"
                      className="d-sm-none d-table-cell"
                    >
                      {index + 1}
                    </td>
                    <td scope="row" colSpan="1">
                      <Image
                        src={contributor.avatarUrl}
                        title={contributor.username}
                        alt={contributor.username}
                        height={42}
                        width={42}
                      />
                    </td>
                    <td colSpan="2">
                      <a href={contributor.profileUrl}>
                        <span>{contributor.username}</span>
                      </a>
                    </td>
                    <td
                      className={
                        contributor.openPRsNumber > 0
                          ? "d-none d-sm-table-cell"
                          : `${styles["disabled-link"]} d-none d-sm-table-cell`
                      }
                      colSpan="1"
                    >
                      <a
                        href={contributor.openPRsLink}
                        target={"blank"}
                        className="leader-board-link"
                      >
                        {contributor.openPRsNumber}
                      </a>
                    </td>
                    <td
                      className={
                        contributor.mergedPRsNumber > 0
                          ? "d-none d-sm-table-cell"
                          : `${styles["disabled-link"]} d-none d-sm-table-cell`
                      }
                      colSpan="1"
                    >
                      <a href={contributor.mergedPRsLink} target={"blank"}>
                        {contributor.mergedPRsNumber}
                      </a>
                    </td>
                    <td
                      className={
                        contributor.issuesNumber > 0
                          ? "d-none d-sm-table-cell"
                          : `${styles["disabled-link"]} d-none d-sm-table-cell`
                      }
                      colSpan="1"
                    >
                      <a href={contributor.issuesLink} target={"blank"}>
                        {contributor.issuesNumber}
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
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
      data = community.contributors;
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