import { Col, NavLink, Row } from 'react-bootstrap';
import LikeIcon from '../../public/svg/like';
import CommentIcon from '../../public/svg/comment';
import IssueIcon from '../../public/svg/issue';
import styles from '../../styles/GithubIssuesList.module.css';

const GithubIssue = ({ issue }) => {
  return (
    <Col className={`${styles.column} py-2 px-3 m-2 rounded`}>
      <Row className={`${styles.item_container}`}>
        <NavLink href={issue.html_url}>{issue.title}</NavLink>
      </Row>
      <Row className="d-flex align-items-center">
        <Col xs="auto" className={`${styles.numbers}`}>
          <span className="me-2">
            <IssueIcon />
          </span>
          {issue.state}
        </Col>
        <Col xs="auto" className={`${styles.numbers}`}>#{issue.number}</Col>
        <Col xs="auto" className={`me-3 ${styles.numbers}`}>
          <span className="me-2">
            <LikeIcon />
          </span>
          {issue.reactions['+1']}
        </Col>
        <Col xs="auto" className={`me-2 ${styles.numbers}`}>
          <span className="me-2">
            <CommentIcon />
          </span>
          {issue.comments}
        </Col>
      </Row>
    </Col>
  );
};

const GithubIssuesList = (props) => {
  const data =
    props.data.issues.data.attributes.Issues.length > 10
      ? props.data.issues.data.attributes.Issues.slice(0, 10)
      : props.data.issues.data.attributes.Issues;
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
