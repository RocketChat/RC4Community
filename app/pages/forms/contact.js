import React from "react";
import { Button, Card } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from 'next/router';
import styles from "../../styles/form.module.css"


const ContactPage = () => {
    const router = useRouter()
    const ContactForm = (
        <Card className={styles.card}>
            <Card.Header>Component</Card.Header>
            <Card.Body>
                <Card.Title>Create a form</Card.Title>
                <Card.Text>
                Please click the following button to create a form.
                </Card.Text>
                <Button onClick={() => router.push('/forms/create')} variant="primary">
                {/* <Link href="/forms/create">
                    <a>Create Form!</a>
                </Link> */}
                Create form!
            </Button>
            </Card.Body>
        </Card>
      );
 
 return (
   <div>
     {ContactForm}
   </div>
 );
};
 
export default ContactPage;