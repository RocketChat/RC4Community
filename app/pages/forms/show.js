import { getFormData } from "../../lib/formAPI";
import { Button, Card, Form } from "react-bootstrap";
import styles from "../../styles/form.module.css";

function Blog({ formFields }) {
  console.log("foelds", formFields);
  return (
    <Card className={styles.showCard}>
      <Card.Body>
        <Form>
          {formFields.map((ele, i) => (
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
      </Card.Body>
    </Card>
  );
}

export async function getStaticProps() {
  try {
    const res = await getFormData();
    // const data = await res.json()
    return {
      props: {
        formFields: res,
      },
      revalidate: 30,
    };
  } catch (error) {
    console.log("error is", error);
  }
}

export default Blog;
