import { Col , Row , Badge } from 'react-bootstrap';
import Image from "next/image";
import IssueIcon from '../../public/svg/issue';
import StarIcon from '../../public/svg/star';
import ForkIcon from '../../public/svg/forks';
import styles from '../../styles/GitlabProject.module.css';

const GitlabProject = ({data}) => {
  return (

    <div
    className={`${styles.container} d-flex flex-wrap justify-content-center`}
    >
      <Col className={`${styles.column} py-2 px-3 m-2 rounded`}>
        <Row className={`${styles.item_container} d-flex align-items-center`}>
          <Col xs="auto" className={`${styles.numbers}`}>
            <a href={data.html_url}>
              <Image
                className="rounded-circle"
                src={data.avatar_url}
                width={40}
                height={40}
              />
            </a>
          </Col>
          <Col xs="auto" className={`${styles.project_name}`}>
            <a href={data.html_url}>{data.full_name}</a>
          </Col>
        </Row>
        <Row className="d-flex align-items-center">
          <Col xs="auto" className={`${styles.numbers}`}>
            <span className="me-2">
              <IssueIcon />
            </span>
            {data.open_issues_count}
          </Col>
          <Col xs="auto" className={`me-1 ${styles.numbers}`}>
            <span className="me-2">
              <StarIcon />
            </span>
            {data.star_count}
          </Col>
          <Col xs="auto" className={`me-2 ${styles.numbers}`}>
            <span className="me-2">
              <ForkIcon />
            </span>
            {data.forks_count}
          </Col>
        </Row>
        {
          (Array.isArray(data.topics) && (data.topics.length > 0 )) && 
          (
            <Row className={`${styles.md_container} p-1 d-flex align-items-center justify-content-start`}>
              {data.topics.map((topic) => {
                return (<Col xs="auto" className={`m-0 px-1`}>
                <Badge pill bg="light" text="dark">
                  {topic}
                </Badge>
              </Col>)
              })}
            </Row>
          )
        }
        <Row className={`${styles.md_container} p-1`}>
          <span>
              {data.description}
          </span>
        </Row>
      </Col>
    </div>
  );
};

export default GitlabProject;