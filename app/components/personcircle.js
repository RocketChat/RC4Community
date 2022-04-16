import { Col } from "react-bootstrap";
import styles from "../styles/Personacircle.module.css";
import dynamic from 'next/dynamic'
import React from "react";


const fetchIcon=(iconName)=>{
  let Icon = dynamic(() => import('react-icons/fa').then(icons => icons[iconName]));
  return <Icon  className={styles.icon} />;
}

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
              
             { fetchIcon(person?.persona_icon?.icon) }
              
              </div>
              <div className={styles.title}>{person.name}</div>
            </span>
          );
        })}
      </Col>
    </>
  );
}
