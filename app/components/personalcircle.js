import { Button, ButtonGroup } from "react-bootstrap";
import styles from '../styles/Personacircle.module.css'

export default function Personacircle(props) {
    return (
        <>
        <ButtonGroup size="lg" className="mb-2">
        <span className={styles["select-role-buttons-row"]}>
          {props.personas.map((persona) => (
            <span className={styles["select-role-button"]}>
              <Button>{persona.name}</Button>
            </span>
          ))}
        </span>
        </ButtonGroup>
        </>
    )
}