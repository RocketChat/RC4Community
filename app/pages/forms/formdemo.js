import Head from "next/head";
import { Stack } from "react-bootstrap";
import RCform from "../../components/clientForms/show";

function FormDemo() {
  return (
    <div>
      <Head>
        <title>Form</title>
        <meta name="description" content="Rocket.Chat form tool demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Stack className="mx-auto">
        <h1 className="mx-auto mt-3">Preview of Form Component</h1>
        <Stack direction="horizontal">
          <RCform formId={1} fw={"40%"} />
          <RCform formId={2} fw={"50%"} />
        </Stack>
        <Stack direction="horizontal">
          <RCform formId={3} fw={"50%"} />
          <RCform formId={4} fw={"40%"} />
        </Stack>
        <Stack direction="horizontal">
          <RCform formId={5} fw={"50%"} />
        </Stack>
      </Stack>
    </div>
  );
}

export default FormDemo;
