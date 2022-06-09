import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Spinner,
} from "react-bootstrap";
import {
  eventAuth,
  eventAuthSignIn,
  eventAuthSignUp,
} from "../../../lib/conferences/eventCall";
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
      const res = await eventAuthSignIn(toPost);
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
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text>Email*</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          required
          type="email"
          placeholder="Enter email"
          name="formEmail"
          aria-label="Email"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Password*</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          required
          type="password"
          placeholder="Password"
          name="formPassword"
          aria-label="Password"
        />
      </InputGroup>
      <Form.Group className={styles.sign_form_foot} controlId="formCheckbox">
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
    formfName: "",
    formlName: "",
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
      data: {
        attributes: {
          "first-name": form.formfName,
          "last-name": form.formlName,
          email: form.formEmail,
          password: form.formPassword,
        },
        type: "user",
      },
    };
    try {
      setErr({ show: false });
      setLoad(true);
      const res = await eventAuthSignUp(toPost);
      console.log("submi", res);
    } catch (e) {
      setErr({ show: true, mess: e.response.data?.errors[0].detail });
      console.log("catch", String(e));
    } finally {
      setLoad(false);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMatch(true);
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text>First & last name</InputGroup.Text>
        <Form.Control
          name="formfName"
          onChange={handleChange}
          aria-label="First name"
        />
        <Form.Control
          name="formfName"
          onChange={handleChange}
          aria-label="Last name"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Email*</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          required
          type="email"
          placeholder="Enter email"
          name="formEmail"
          aria-label="Email"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Password*</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          required
          type="password"
          placeholder="Password"
          name="formPassword"
          aria-label="Password"
        />
      </InputGroup>
      <InputGroup className="mb-3" controlId="formRePassword">
        <InputGroup.Text>Re-Enter Password*</InputGroup.Text>
        <Form.Control
          onChange={handleChange}
          required
          type="password"
          placeholder="Password"
          isInvalid={!match}
          name="formRePassword"
          aria-label="Re-Password"
        />
        <Form.Control.Feedback type="invalid">
          Entered Passwords does not Match!
        </Form.Control.Feedback>
      </InputGroup>
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
  const [login, setLogin] = useState(true);
  const [err, setErr] = useState({
    show: false,
    mess: "",
  });

  return (
    <Card className={styles.sign_card}>
      <Card.Header>
        <Nav
          fill
          className="justify-content-center"
          variant="tabs"
          activeKey={login}
          defaultActiveKey="#signin"
        >
          <Nav.Item onClick={() => setLogin(true)}>
            <Nav.Link eventKey="true" href="#signin">
              Sign In
            </Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => setLogin(false)}>
            <Nav.Link eventKey="false" href="#signup">
              Sign Up
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
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
        className={styles.sign_card_foot}
        onClick={() => {
          setLogin(!login), setErr({ show: false });
        }}
      >
        {login ? "I'm new here! Sign Up" : "Back to Sign In"}
      </Card.Footer>
    </Card>
  );
};

export default EventAuth;
