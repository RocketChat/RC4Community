import { useState } from "react";
import Head from "next/head";
import styles from "../../../styles/Mainstage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Jitsibroadcaster from '../../../components/clientsideonly/jitsibroadcaster'
import InAppChat from "../../../components/inappchat/inappchat";
import { Button } from "react-bootstrap";

const greenroom_rid = process.env.NEXT_PUBLIC_ROCKET_CHAT_GREENROOM_RID;
const host = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://community.liaison.rocketchat.digital";

const Greenroom = () => {
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
          			<InAppChat host={host} closeChat={handleOpenChat} rid={greenroom_rid} />
        			) : (
          			<Button style={{ float: 'right' }} onClick={handleOpenChat}>Open Chat</Button>
        		)}
				<Container>
					<Row>
						<Col>
							<Jitsibroadcaster room={"GSOC Alumnus Meet"} disName={"Speaker"} />
						</Col>
					</Row>
				</Container>
			</main>
		</>

	)
}

export default Greenroom;
