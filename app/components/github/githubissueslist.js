import { useEffect, useState } from 'react';
import styles from '../../styles/GithubIssuesList.module.css';
import GithubIssue from './githubissue';

const GithubIssuesList = ({ issues, noOfIssues = 6 }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(issues)) {
      setData(issues.splice(0, noOfIssues));
    } else {
      setData(issues);
    }
  }, [issues]);

  return (
    <div
      className={`${styles.container} d-flex flex-wrap justify-content-center`}
    >
      {Array.isArray(data) ? data.map((issue) => (
        <GithubIssue key={issue.id} issue={issue} />
      )): <p className='text-danger'>{issues}, ERROR :( </p>}
    </div>
  );
};

export default GithubIssuesList;
