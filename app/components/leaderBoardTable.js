import styles from "../styles/Leaderboard.module.css";
import Table from "react-bootstrap/Table";
import LeaderBoardRow from "./leaderBoardRow";

export default function LeaderboardTable({ contributors }) {
  return (
    <>
      <Table className={styles["leader-board-table"]}>
        <thead>
          <tr>
            <th scope="col" colSpan="1">
              Contributors
            </th>
            <th scope="col" colSpan="2">
              UserName
            </th>
            <th scope="col" colSpan="1">
              Open PRs
            </th>
            <th scope="col" colSpan="1">
              Merged PRs
            </th>
            <th scope="col" colSpan="1">
              Issues
            </th>
          </tr>
        </thead>
        <tbody>
          {contributors.map((contributor) => (
            <LeaderBoardRow
              contributor={contributor}
              key={contributor.username}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}
