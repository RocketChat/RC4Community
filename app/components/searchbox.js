import { Form } from "react-bootstrap";
import styles from '../styles/Searchbox.module.css'
export default function Searchbox() {
    return(
   
   <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control type="text" placeholder="Search the community" />

  </Form.Group>
  </Form>
   
    )
}