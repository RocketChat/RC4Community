import Image from "next/image";
import styles from "../styles/Leaderboardcompact.module.css";
import Table from "react-bootstrap/Table";
import { contributorList } from "../lib/leaderboard";

function LeaderboardCompact({ contributors, leaderboardSize }) {
  contributors = contributorList(contributors);


  return (
    <>
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
          {contributors.slice(0, leaderboardSize).map((contributor, index) => (
            <tr>
              <td scope="col" colSpan="1" className="d-sm-none d-table-cell">
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
    </>
  );
}

export default LeaderboardCompact;