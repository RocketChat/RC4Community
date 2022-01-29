import { useEffect, useState } from 'react';
import { Col, NavLink, Row } from 'react-bootstrap';
import styles from '../styles/GithubIssuesList.module.css';
import MDPreview from './mdpreview';
import Like from '../public/svg/like.js';
import Comment from '../public/svg/comment';

function truncateUpto(str, noOfWords) {
  return str.split(' ').splice(0, noOfWords).join(' ') + '...';
}

const GithubIssuesList = ({ issues }) => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    // it gives us issues + PRs,
    // so we can filter them and use top 15 issues (we can also sort them by reactions or comments? or labels maybe?)
    setData(issues.filter((issue) => !issue.pull_request).splice(0, 10));
  }, [issues]);

  return (
    <div
      className={`${styles.container} d-flex flex-wrap justify-content-center`}
    >
      {data.map((issue) => (
        <Col
          key={issue.id}
          className={`${styles.column} p-2 m-2 mx-md-3  ps-4 col-md-5 d-flex justify-content-between border-start border-4`}
        >
          <Row className={`${styles.item_container}`}>
            <NavLink href={issue.html_url}>{issue.title}</NavLink>
            <MDPreview body={truncateUpto(issue.body, 20)} />

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
      ))}
    </div>
  );
};

export default GithubIssuesList;
