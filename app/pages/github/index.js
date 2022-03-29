import Head from "next/head";
import styles from "../../styles/GithubPage.module.css";
import { Container, Col } from "react-bootstrap";
import { getNavItems } from "../../lib/navbar";
import Github from "../../components/github";
import { githubKitData } from "../../lib/github";

export default function GithubComponentKitPage(props) {
  return (
    <div>
      <Head>
        <title>Github Components Kit</title>
        <meta
          name="description"
          content="Github Components Kit for community builders"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Container
        fluid
        className="d-flex flex-column align-items-center gap-3 gap-md-5"
      >
        <Col className="d-flex flex-column align-items-center gap-2 pt-3">
          <h1
            className={`display-6 fw-bold text-center ${styles.hero_heading}`}
          >
            <span className={styles.redText}>Github </span> Components Kit
          </h1>
          <p
            className={`fw-regular col-5 col-md-12 text-center ${styles.hero_subheading}`}
          >
            Showcase your Github Repositories
          </p>
        </Col>
        <div className={` d-flex flex-column py-1 align-items-center`}>
          <h2 className={`mx-auto w-auto mt-1 mb-5 ${styles.title}`}>
            Repository Overview
          </h2>
          <Github githubData={props.githubData} />
        </div>

        <div className={` d-flex flex-column py-1 align-items-center`}>
          <h2 className={`mx-auto w-auto mt-2  mb-5 ${styles.title}`}>
            GitHub Issues
          </h2>
          <Github type={"issues"} githubData={props.githubData} />
        </div>

        <div className={` d-flex flex-column py-1 align-items-center`}>
          <h2 className={`mx-auto w-auto mt-2  mb-5 ${styles.title}`}>
            GitHub Pull Requests
          </h2>
          <Github type={"pulls"} githubData={props.githubData} />
        </div>

        <div className={` d-flex flex-column py-1 align-items-center mb-5 `}>
          <h2 className={`mx-auto w-auto mt-2  mb-5 ${styles.title}`}>
            Contributors ✨
          </h2>
          <Github type={"contributors"} githubData={props.githubData} />
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const topNavItems = await getNavItems();
  const githubData = await githubKitData("RocketChat", "RC4Community", [
    "issues",
    "pulls",
    "contributors",
  ]);

  return {
    props: {
      topNavItems,
      githubData,
    },
    revalidate: 120,
  };
}
