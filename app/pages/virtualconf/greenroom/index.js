import Head from "next/head";
import styles from "../../../styles/Mainstage.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Jitsibroadcaster from '../../../components/clientsideonly/jitsibroadcaster'

const Greenroom = () => {
	return (
		<>
			<Head>
				<title>Conference Green Room</title>
			</Head>
			<main className={styles.main}>
				<div className={styles.container}>
				</div>
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
