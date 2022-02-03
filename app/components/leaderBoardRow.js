import Image from "next/image";

export default function LeaderBoardRow({ contributor, styles ,rank }) {
  return (
    <>
      <tr>
        <td scope="col" colSpan="1" className="d-sm-none d-table-cell">
          {rank}
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
    </>
  );
}