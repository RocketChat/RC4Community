import styles from "../styles/LeaderboardTable.module.css";
import Table from "react-bootstrap/Table";
import LeaderBoardRow from "./leaderBoardRow";

export default function LeaderboardTable({ contributors, tableSize }) {
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
          {contributors.slice(0, tableSize).map((contributor) => (
            <LeaderBoardRow
              contributor={contributor}
              key={contributor.username}
              styles={styles}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}