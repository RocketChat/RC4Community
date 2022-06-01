import { Col, NavLink, Row } from "react-bootstrap";
import LikeIcon from "../../public/svg/like";
import DislikeIcon from "../../public/svg/dislike";
import IssueIcon from "../../public/svg/issue";
import styles from "../../styles/GitlabIssuesList.module.css";

const GitLabIssue = ({ issue }) => {
  return (
    <Col className={`${styles.column} py-2 px-3 m-2 rounded`}>
      <Row className={`${styles.item_container}`}>
        <NavLink href={issue.web_url}>{issue.title}</NavLink>
      </Row>
      <Row className="d-flex align-items-center">
        <Col xs="auto" className={`${styles.numbers}`}>
          <span className="me-2">
            <IssueIcon />
          </span>
          {issue.state}
        </Col>
        <Col xs="auto" className={`${styles.numbers}`}>
          #{issue.iid}
        </Col>
        <Col xs="auto" className={`me-3 ${styles.numbers}`}>
          <span className="me-2">
            <LikeIcon />
          </span>
          {issue.upvotes}
        </Col>
        <Col xs="auto" className={`me-2 ${styles.numbers}`}>
          <span className="me-2">
            <DislikeIcon />
          </span>
          {issue.downvotes}
        </Col>
      </Row>
    </Col>
  );
};

const GitLabIssuesList = (props) => {
  let data = [];
  if (
    props.data &&
    props.data.issues &&
    Array.isArray(props.data.issues.issues)
  ) {
    data =
      props.data.issues.issues.length > 10
        ? props.data.issues.issues.slice(0, 10)
        : props.data.issues.issues;
  }

  return (
    <div
      className={`${styles.container} d-flex flex-wrap justify-content-center`}
    >
      {Array.isArray(data) ? (
        data.map((issue) => <GitLabIssue key={issue.id} issue={issue} />)
      ) : (
        <p className="text-danger"> ERROR </p>
      )}
    </div>
  );
};

export default GitLabIssuesList;
