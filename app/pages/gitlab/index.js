import Head from "next/head";
import styles from "../../styles/GitlabPage.module.css";
import { Container, Col } from "react-bootstrap";
import { getNavItems } from "../../lib/navbar";
import GitlabLogo from '../../public/svg/gitlablogo';
import Gitlab from "../../components/gitlab";
import { gitlabKitData } from "../../lib/gitlab";

export default function GitlabComponentKitPage(props) {
  return (
    <div>
      <Head>
        <title>Gitab Components Kit</title>
        <meta
          name="description"
          content="Gitlab Components Kit for community builders"
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
            <div><GitlabLogo /></div>
            <span className={styles.redText}>Gitlab </span> Components Kit
          </h1>
          <p
            className={`fw-regular col-5 col-md-12 text-center ${styles.hero_subheading}`}
          >
            Showcase your Gitlab  Projects
          </p>
        </Col>
        <div className={` d-flex flex-column py-1 align-items-center`}>
          <h2 className={`mx-auto w-auto mt-1 mb-5 ${styles.title}`}>
            Project Overview
          </h2>
          <Gitlab gitlabData={props.gitlabData} />
        </div>

        <div className={` d-flex flex-column py-1 align-items-center`}>
          <h2 className={`mx-auto w-auto mt-2  mb-5 ${styles.title}`}>
            Gitlab Issues
          </h2>
          <Gitlab type={"issues"} gitlabData={props.gitlabData} />
        </div>

        <div className={` d-flex flex-column py-1 align-items-center`}>
          <h2 className={`mx-auto w-auto mt-2  mb-5 ${styles.title}`}>
            Gitlab Merge Requests
          </h2>
          <Gitlab type={"merges"} gitlabData={props.gitlabData} />
        </div>

        <div className={` d-flex flex-column py-1 align-items-center mb-5 `}>
          <h2 className={`mx-auto w-auto mt-2  mb-5 ${styles.title}`}>
            Project Members ✨
          </h2>
          <Gitlab type={"members"} gitlabData={props.gitlabData} />
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const topNavItems = await getNavItems();
  const gitlabData = await gitlabKitData( "3472737" , [
    "issues",
    "members",
    "merges",
  ]);

  return {
    props: {
      topNavItems,
      gitlabData,
    },
    revalidate: 120,
  };
}