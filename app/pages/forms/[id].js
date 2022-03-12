import Head from "next/head";
import RCform from "../../components/clientForms/show";
import { getFormData } from "../../lib/formAPI";

export default function FormPage({ formFields }) {
  return (
    <div>
      <Head>
        <title>Form</title>
        <meta name="description" content="Rocket.Chat form tool demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <RCform formFields={[formFields]} />
    </div>
  );
}

FormPage.getInitialProps = async (ctx) => {
  const res = await getFormData(ctx.query.id);
  return { formFields: res };
};
