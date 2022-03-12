import React, { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";
import styles from "../../styles/form.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import { MdDeleteOutline } from "react-icons/md";
import { getStrapiURL } from "../../lib/api";

const RCreateForm = () => {
  const [formValues, setFormValues] = useState([
    { label: "", value: "", type: "text", min: "", max: "", required: false },
  ]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Form Title");

  async function addForm() {
    const toPost = {
      title: title,
      formQs: formValues,
    };
    let path = getStrapiURL();

    try {
      const sendForm = await fetch(`${path}/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toPost),
      });

      if (sendForm.ok) {
        return sendForm;
      }
    } catch (error) {
      console.log("Error" + error);
    }
  }

  let handleChange = (e, i) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { label: "", value: "", type: "text", min: "", max: "", required: false },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    setShow(true);
    addForm();
  };

  const handleSelect = (e, i) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const handleSwitch = (e, i) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = !isSwitchOn;
    setFormValues(newFormValues);
    setIsSwitchOn(!isSwitchOn);
  };

  const handleClose = () => {
    setShow(false);
    setFormValues([
      { label: "", value: "", type: "text", min: "", max: "", required: false },
    ]);
  };

  const handleTitle = (e) => {
    setTitle(e);
  };

  return (
    <Card className={styles.createCard}>
      <Card.Title>
        <div
          suppressContentEditableWarning={true}
          contentEditable={true}
          className={styles.formTitle}
          onInput={(e) => handleTitle(e.currentTarget.textContent)}
        >
          {title}
        </div>
      </Card.Title>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">Required</Card.Subtitle>
        <form onSubmit={handleSubmit}>
          {formValues.map((element, index) => (
            <div className={styles.formRow} key={index}>
              <InputGroup>
                <Form.Check
                  type="switch"
                  name="required"
                  id="custom-switch"
                  inline={true}
                  className={styles.radio}
                  onChange={(e) => handleSwitch(e, index)}
                />

                <Form.Select
                  className={styles.select}
                  name="type"
                  onChange={(e) => handleSelect(e, index)}
                  value={element.type}
                  aria-label="Default select example"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">E-mail</option>
                </Form.Select>
                <FormControl
                  required
                  aria-label="Text input with dropdown button"
                  name="value"
                  type="text"
                  placeholder="Enter the question"
                  onChange={(e) => handleChange(e, index)}
                />
                {element.type == "number" && (
                  <FormControl
                    required
                    aria-label="Min. Value"
                    name="min"
                    type="number"
                    placeholder="Min. Value"
                    onChange={(e) => handleChange(e, index)}
                  />
                )}
                {element.type == "number" && (
                  <FormControl
                    required
                    aria-label="Max. Value"
                    name="max"
                    type="number"
                    placeholder="Max. Value"
                    onChange={(e) => handleChange(e, index)}
                  />
                )}

                {index ? (
                  <Button
                    onClick={() => removeFormFields(index)}
                    variant="danger"
                    id="button-addon1"
                  >
                    <MdDeleteOutline />
                  </Button>
                ) : null}
              </InputGroup>
            </div>
          ))}
          <ButtonGroup className={styles.submitGroup} aria-label="Card buttons">
            <Button variant="light" onClick={() => addFormFields()}>
              Add
            </Button>
            <Button color="#0083ffd4" variant="success" type="submit">
              Generate
            </Button>
          </ButtonGroup>
        </form>
      </Card.Body>
      <ShowForm
        formVal={formValues}
        show={show}
        title={title}
        handleClose={handleClose}
      />
    </Card>
  );
};

const ShowForm = ({ show, handleClose, title }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert show={show} variant="success">
            <Alert.Heading>How's it going?!</Alert.Heading>
            <p>You have successfully created the form!</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={handleClose} variant="outline-success">
                Close me y'all!
              </Button>
            </div>
          </Alert>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RCreateForm;
