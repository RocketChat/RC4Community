// import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from '../styles/Infotiles.module.css'
export default function Infotiles() {
    return(
        <>
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Rocket.Chat features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Rocket.Chat in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/Rocket.Chat/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Rocket.Chat projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Rocket.Chat site to a public URL with Rocket.Chat SaaS.
            </p>
          </a>
        </div>
        </>
    )

}