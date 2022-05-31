import { Col, NavLink, Row } from "react-bootstrap";
import styles from "../../styles/GithubPullRequest.module.css";
import Image from "next/image";
import PullsIcon from '../../public/svg/pull';

const GithubPullReqeust = ({ pull }) => {
  return (
    <Col className={`${styles.column} py-2 px-3 m-2 rounded`}>
      <Row className="d-flex align-items-center">
        <Col xs="auto" className={`${styles.numbers}`}>
          <a href={pull.user.html_url}>
            <Image
              className="rounded-circle"
              src={pull.user.avatar_url}
              width={40}
              height={40}
            />
          </a>
        </Col>
        <Col xs="auto" className={`${styles.username}`}>
          <a href={pull.user.html_url}>
            <span>{pull.user.login}</span>
          </a>
        </Col>
      </Row>
      <Row className={`${styles.item_container}`}>
        <NavLink href={pull.html_url}>{pull.title}</NavLink>
      </Row>
      <Row className="d-flex align-items-center">
        <Col xs="auto" className={`${styles.numbers}`}>
          <span className="me-2">
            <PullsIcon />
          </span>
          {pull.state}
        </Col>
        <Col xs="auto" className={`${styles.numbers}`}>
          #{pull.number}
        </Col>
      </Row>
    </Col>
  );
};
const GithubPullRequestsList = (props) => {
  const data =
    props.data.pulls.data.attributes.pulls.length > 6
      ? props.data.pulls.data.attributes.pulls.slice(0, 6)
      : props.data.pulls.data.attributes.pulls;

  return (
    <div
      className={`${styles.container} d-flex flex-wrap justify-content-center`}
    >
      {Array.isArray(data) ? (
        data.map((pull) => <GithubPullReqeust key={pull.id} pull={pull} />)
      ) : (
        <p className="text-danger"> ERROR </p>
      )}
    </div>
  );
};

export default GithubPullRequestsList;
