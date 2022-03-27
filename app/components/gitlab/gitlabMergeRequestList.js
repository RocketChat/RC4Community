import { Col, NavLink, Row } from "react-bootstrap";
import styles from "../../styles/GitlabMergeList.module.css";
import Image from "next/image";
import PullsIcon from '../../public/svg/pull';

const GitlabMergeReqeust = ({ mergeRequest }) => {
  return (
    <Col className={`${styles.column} py-2 px-3 m-2 rounded`}>
      <Row className="d-flex align-items-center">
        <Col xs="auto" className={`${styles.numbers}`}>
          <a href={mergeRequest.author.web_url}>
            <Image
              className="rounded-circle"
              src={mergeRequest.author.avatar_url}
              width={40}
              height={40}
            />
          </a>
        </Col>
        <Col xs="auto" className={`${styles.username}`}>
          <a href={mergeRequest.author.web_url}>
            <span>{mergeRequest.author.name}</span>
            <span>{" | "}</span>
            <span>{`@${mergeRequest.author.username}`}</span>
          </a>
        </Col>
      </Row>
      <Row className={`${styles.item_container}`}>
        <NavLink href={mergeRequest.web_url}>{mergeRequest.title}</NavLink>
      </Row>
      <Row className="d-flex align-items-center">
        <Col xs="auto" className={`${styles.numbers}`}>
          <span className="me-2">
            <PullsIcon />
          </span>
          {mergeRequest.state}
        </Col>
        <Col xs="auto" className={`${styles.numbers}`}>
          #{mergeRequest.iid}
        </Col>
      </Row>
    </Col>
  );
};
const GitlabMergeRequestsList = (props) => {
  const data =
    props.data.merges.merges.length > 6
      ? props.data.merges.merges.slice(0, 6)
      : props.data.merges.merges;

  return (
    <div
      className={`${styles.container} d-flex flex-wrap justify-content-center`}
    >
      {Array.isArray(data) ? (
        data.map((mergeRequest) => <GitlabMergeReqeust key={mergeRequest.id} mergeRequest={mergeRequest} />)
      ) : (
        <p className="text-danger"> ERROR </p>
      )}
    </div>
  );
};

export default GitlabMergeRequestsList;