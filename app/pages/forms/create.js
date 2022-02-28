import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Modal,
} from "react-bootstrap";
import styles from "../../styles/form.module.css";
import InputGroup from "react-bootstrap/InputGroup";
import { MdDeleteOutline } from "react-icons/md";

const CreateForm = () => {
  const [formValues, setFormValues] = useState([
    { label: "", value: "", type: "text", min: "", max: "", required: false },
  ]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isPreviewShown, setPreviewShown] = useState(false);
  const [show, setShow] = useState(false);

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
    setPreviewShown(!isPreviewShown);
    setShow(true);
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
  };

  return (
    <Card className={styles.createCard}>
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
      <ShowForm formVal={formValues} show={show} handleClose={handleClose} />
    </Card>
  );
};

const ShowForm = ({ formVal, show, handleClose, handleShow }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {formVal.map((ele, i) => (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{ele.value}</Form.Label>
                {ele.type == "number" ? (
                  <>
                    <Form.Control
                      key={i}
                      type={ele.type}
                      min={ele.min}
                      max={ele.max}
                      placeholder=""
                      required={ele.required}
                    />
                    <Form.Text className="text-muted">
                      * Value must be in range {ele.min} - {ele.max}
                    </Form.Text>
                  </>
                ) : (
                  <Form.Control
                    key={i}
                    type={ele.type}
                    placeholder=""
                    required={ele.required}
                  />
                )}

                {ele.type == "number"}
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateForm;
