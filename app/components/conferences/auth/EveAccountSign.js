import { useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { eventAuth } from "../../../lib/conferences/eventCall";
import styles from "../../../styles/event.module.css";

const EventSignInForm = ({ err, setErr }) => {
  const [form, setForm] = useState({
    formEmail: "",
    formPassword: "",
    check: false,
  });
  const [load, setLoad] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const toPost = {
      email: form.formEmail,
      password: form.formPassword,
    };
    try {
      setErr({ show: false });
      setLoad(true);
      const res = await eventAuth(toPost);
      console.log("submi", res);
    } catch (e) {
      setErr({ show: true, mess: e.response.data.error });
      console.log("catch", e);
    } finally {
      setLoad(false);
    }
  };

  const handleCheck = (e) => {
    setForm((prev) => ({
      ...prev,
      check: !form.check,
    }));
  };

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email*</Form.Label>
        <Form.Control
          onChange={handleChange}
          required
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password*</Form.Label>
        <Form.Control
          onChange={handleChange}
          required
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className={styles.signin_form_foot} controlId="formCheckbox">
        <Form.Check
          onChange={handleCheck}
          type="checkbox"
          label="Remember me"
        />
        <Button disabled={load} variant="primary" type="submit">
          {load ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Sign In"
          )}
        </Button>
      </Form.Group>
    </Form>
  );
};

const EventSignUpForm = ({ err, setErr }) => {
  const [form, setForm] = useState({
    formEmail: "",
    formPassword: "",
    formRePassword: "",
  });

  const [load, setLoad] = useState(false);
  const [match, setMatch] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.formPassword !== form.formRePassword) {
      setMatch(false);
      e.stopPropagation();
      return;
    }
    const toPost = {
      email: form.formEmail,
      password: form.formPassword,
    };
    try {
      setErr({ show: false });
      setLoad(true);
      const res = await eventAuth(toPost);
      console.log("submi", res);
    } catch (e) {
      setErr({ show: true, mess: e.response.data.error });
      console.log("catch", e);
    } finally {
      setLoad(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setMatch(true);
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email*</Form.Label>
        <Form.Control
          onChange={handleChange}
          required
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password*</Form.Label>
        <Form.Control
          onChange={handleChange}
          required
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRePassword">
        <Form.Label>Re-Enter Password*</Form.Label>
        <Form.Control
          onChange={handleChange}
          required
          type="password"
          placeholder="Password"
          isInvalid={!match}
        />
        <Form.Control.Feedback type="invalid">
          Entered Psswords does not Match!
        </Form.Control.Feedback>
      </Form.Group>
      <Button disabled={load} variant="primary" type="submit">
        {load ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          "Sign Up"
        )}
      </Button>
    </Form>
  );
};

const EventAuth = () => {
  const [login, setLogin] = useState(false);
  const [err, setErr] = useState({
    show: false,
    mess: "",
  });

  return (
    <Card>
      <Card.Body>
        <Card.Subtitle>
          {err.show && <Alert variant="danger">{err.mess}</Alert>}
        </Card.Subtitle>
        {login ? (
          <EventSignInForm err={err} setErr={setErr} />
        ) : (
          <EventSignUpForm err={err} setErr={setErr} />
        )}
      </Card.Body>
      <Card.Footer
        className={styles.signin_card_foot}
        onClick={() => setLogin(!login)}
      >
        {login ? "I'm new! Sign Up" : "Back to Sign In"}
      </Card.Footer>
    </Card>
  );
};

export default EventAuth;
