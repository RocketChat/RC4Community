import { Col, NavLink, Row } from 'react-bootstrap';
import MDPreview from '../mdpreview';
import Like from '../../public/svg/like.js';
import Comment from '../../public/svg/comment';
import styles from '../../styles/GithubIssuesList.module.css';

function truncateUpto(str, noOfWords) {
  return str.split(' ').splice(0, noOfWords).join(' ');
}

const GithubIssue = ({ issue }) => {
  return (
    <Col
      className={`${styles.column} p-2 m-2 mx-md-3  ps-4 col-md-5 d-flex justify-content-between border-start border-4`}
    >
      <Row className={`${styles.item_container}`}>
        <NavLink href={issue.html_url}>{issue.title}</NavLink>
        <MDPreview body={truncateUpto(issue.body, 30)} />

        <span className="">
          <span className={`me-3 ${styles.numbers}`}>
            <span className="me-2">
              <Like />
            </span>
            {issue.reactions["+1"]}
          </span>
          <span className={`me-2 ${styles.numbers}`}>
            <span className="me-2">
              <Comment />
            </span>
            {issue.comments}
          </span>
        </span>
      </Row>
    </Col>
  );
};

export default GithubIssue;
