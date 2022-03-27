import Head from "next/head";
import { Stack } from "react-bootstrap";
import dynamic from "next/dynamic";

const Jitsi = dynamic(
    () => import('../components/jitsi/jitsi'),
    { ssr: false }
)

function JitsiDemo() {
  return (
    <div>
      <Head>
        <title>Jitsi</title>
        <meta name="description" content="Rocket.Chat form tool demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Stack className="mx-auto">
        <h1 className="mx-auto mt-3">Preview of Jitsi Component</h1>
        <Jitsi password={"somepassword"} subject={"NewMeet"}/>
      </Stack>
    </div>
  );
}

export default JitsiDemo;
