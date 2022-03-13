import styles from "../../styles/GithubIssuesList.module.css";
import GithubIssue from "./githubissue";

const GithubIssuesList = (props) => {
  const data =
    props.data.issues.Issues.length > 10
      ? props.data.issues.Issues.slice(0, 10)
      : props.data.issues.Issues;
  return (
    <div
      className={`${styles.container} d-flex flex-wrap justify-content-center`}
    >
      {Array.isArray(data) ? (
        data.map((issue) => <GithubIssue key={issue.id} issue={issue} />)
      ) : (
        <p className="text-danger"> ERROR </p>
      )}
    </div>
  );
};

export default GithubIssuesList;
