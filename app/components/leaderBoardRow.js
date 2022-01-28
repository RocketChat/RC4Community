import Table from "react-bootstrap/Table";
import styles from "../styles/Leaderboard.module.css";
import Image from "next/image";

export default function LeaderBoardRow({ contributor }) {
  return (
    <>
      <tr>
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
            contributor.openPRsNumber > 0 ? "" : styles["disabled-link"]
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
            contributor.mergedPRsNumber > 0 ? "" : styles["disabled-link"]
          }
          colSpan="1"
        >
          <a href={contributor.mergedPRsLink} target={"blank"}>
            {contributor.mergedPRsNumber}
          </a>
        </td>
        <td
          className={
            contributor.issuesNumber > 0 ? "" : styles["disabled-link"]
          }
          colSpan="1"
        >
          <a href={contributor.issuesLink} target={"blank"}>
            {contributor.issuesNumber}
          </a>
        </td>
      </tr>
    </>
  );
}
