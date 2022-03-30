import { useState } from "react";
import Head from "next/head";
import styles from "../../../styles/Mainstage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Jitsibroadcaster from '../../../components/clientsideonly/jitsibroadcaster'
import InAppChat from "../../../components/inappchat/inappchat";
import { Button } from "react-bootstrap";

const greenroom_rid = process.env.NEXT_PUBLIC_ROCKET_CHAT_GREENROOM_RID;

const Greenroom = ({ cookies }) => {
	const [openChat, setOpenChat] = useState(false);

  	const handleOpenChat = () => {
    	setOpenChat((prevState) => !prevState);
  	};
	return (
		<>
			<Head>
				<title>Conference Green Room</title>
			</Head>
			<main className={styles.main}>
				<div className={styles.container}>
				</div>
				{openChat ? (
          			<InAppChat host="http://localhost:3000" closeChat={handleOpenChat} cookies={cookies} rid={greenroom_rid} />
        			) : (
          			<Button style={{ float: 'right' }} onClick={handleOpenChat}>Open Chat</Button>
        		)}
				<Container>
					<Row>
						<Col>
							<Jitsibroadcaster />
						</Col>
					</Row>
				</Container>
			</main>
		</>

	)
}

export default Greenroom;

Greenroom.getInitialProps = ({ req }) => {
	const cookies = req.cookies;
  
	return {
	  cookies,
	};
  };
