import Head from "next/head";
import RCform from "../../components/clientForms/show";
import { getForms } from "../../lib/formAPI";

function FormDemo({ formFields }) {
  return (
    <div>
      <Head>
        <title>Form</title>
        <meta name="description" content="Rocket.Chat form tool demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <RCform formFields={formFields} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await getForms();
  return {
    props: {
      formFields: res,
    },
  };
}

export default FormDemo;
