import Error from "next/error";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { getFormData } from "../../lib/formAPI";
import styles from "../../styles/form.module.css";

function RCform({ formId, fw }) {
  const { form, isLoading, isError } = getFormData(formId);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", e);
  };

  return (
    <Card style={{ width: fw }} className={styles.showCard}>
      <Card.Title className={styles.showTitle}>{form.title}</Card.Title>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {form.data?.attributes.formQs.map((ele, i) => (
            <Form.Group key={i} className="mb-3" controlId="formBasicEmail">
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
          <Button variant="primary" o type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default RCform;
