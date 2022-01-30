import {useState , useEffect}  from 'react'
import styles from "../styles/LeaderboardTable.module.css";
import Table from "react-bootstrap/Table";
import LeaderBoardRow from "./leaderBoardRow";

function LeaderboardTable({ contributors, tableSize }) {
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
          {contributors.slice(0, tableSize).map((contributor,index) => (
            <LeaderBoardRow
              contributor={contributor}
              key={contributor.username}
              styles={styles}
              rank={index+1}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default LeaderboardTable;