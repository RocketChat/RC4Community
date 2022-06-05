import { Button, Form } from "react-bootstrap";
import styles from "../../../styles/event.module.css";

const EventSignInForm = () => {
  const onSubmit = (e) => {
    console.log("logged in", e);
  };
  return (
    <Form className={styles.signin_form} onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email*</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password*</Form.Label>
        <Form.Control required type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group
        className={styles.signin_form_foot}
        controlId="formBasicCheckbox"
      >
        <Form.Check type="checkbox" label="Remember me" />
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form.Group>
    </Form>
  );
};

export default EventSignInForm;
