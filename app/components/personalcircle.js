import { Button, ButtonGroup, Col } from "react-bootstrap";
import styles from "../styles/Personacircle.module.css";
import personalCircles from "../data/persionalCircleData";
export default function Personacircle(props) {
  return (
    <>
      <Col
        className={`${styles.personas} d-flex flex-wrap justify-content-center`}
      >
        {personalCircles.map((personal) => {
          return (
            <span className={`${styles.persona}`}>
              <div className={styles.svg}>{personal.svg}</div>
              <div className={styles.title}>{personal.title}</div>
            </span>
          );
        })}
      </Col>
    </>
  );
}
