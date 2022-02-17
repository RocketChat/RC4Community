import { Col } from "react-bootstrap";
import styles from "../styles/Personacircle.module.css";
import {getStrapiURL } from '../lib/api';
export default function Personcircle({persons}) {
  return (
    <>
      <Col
        className={`${styles.personas} d-flex flex-wrap justify-content-center`}
      >
        {persons.map((person) => {
          return (
            <span className={`${styles.persona}`}>
              <div className={styles.svg}> 
                <img src={getStrapiURL("")+person.avatar.url} />
              </div>
              <div className={styles.title}>{person.title}</div>
            </span>
          );
        })}
      </Col>
    </>
  );
}
