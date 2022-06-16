import Image from "next/image";
import { contributorList } from "../lib/leaderboard";
import { fetchAPI } from "../lib/api";
import { Container, Col, Table } from "react-bootstrap";
import styles from "../styles/Leaderboard.module.css";

export function Leaderboard({ contributors, community, leaderboardSize }) {
  contributors = contributorList(contributors);
  
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center gap-2 gap-md-5"
    >
      <Col className="d-flex flex-column align-items-center gap-2 pt-3">
        <h1 className={`display-6 fw-bold text-center ${styles.hero_heading}`}>
          <span className={styles.redText}>{community}</span> GSoC Contribution
          Leaderboard
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
                      src={contributor.attributes.avatarUrl}
                      title={contributor.attributes.username}
                      alt={contributor.attributes.username}
                      height={42}
                      width={42}
                    />
                  </td>
                  <td colSpan="2">
                    <a href={contributor.attributes.profileUrl}>
                      <span>{contributor.attributes.username}</span>
                    </a>
                  </td>
                  <td
                    className={
                      contributor.attributes.openPRsNumber > 0
                        ? "d-none d-sm-table-cell"
                        : `${styles["disabled-link"]} d-none d-sm-table-cell`
                    }
                    colSpan="1"
                  >
                    <a
                      href={contributor.attributes.openPRsLink}
                      target={"blank"}
                      className="leader-board-link"
                    >
                      {contributor.attributes.openPRsNumber}
                    </a>
                  </td>
                  <td
                    className={
                      contributor.attributes.mergedPRsNumber > 0
                        ? "d-none d-sm-table-cell"
                        : `${styles["disabled-link"]} d-none d-sm-table-cell`
                    }
                    colSpan="1"
                  >
                    <a href={contributor.attributes.mergedPRsLink} target={"blank"}>
                      {contributor.attributes.mergedPRsNumber}
                    </a>
                  </td>
                  <td
                    className={
                      contributor.attributes.issuesNumber > 0
                        ? "d-none d-sm-table-cell"
                        : `${styles["disabled-link"]} d-none d-sm-table-cell`
                    }
                    colSpan="1"
                  >
                    <a href={contributor.attributes.issuesLink} target={"blank"}>
                      {contributor.attributes.issuesNumber}
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Container>
  );
}

export async function getLeaderboardProps(communityId, leaderboardSize) {
  let contributors = [];
  let communityName = null;
  let communities = await fetchAPI("/communities");

  communities.data.forEach((community) => {
    if (community.attributes.communityId === communityId) {
      contributors = community.attributes.contributors;
      communityName = community.attributes.communityName;
    }
  });

  return {
    contributors: contributors,
    community: communityName,
    leaderboardSize,
  };
}
