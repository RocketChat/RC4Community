import Head from "next/head";
import { Stack } from "react-bootstrap";
// import { EventHome } from "RCevent";
import dynamic from 'next/dynamic'

// const {EventHome} = dynamic(() => import('rcevent/home'), {
//   ssr: false
// })


function EventHomeDemo() {
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
        </Stack>
        <Stack direction="horizontal">
        </Stack>
        <Stack direction="horizontal">
        </Stack>
      </Stack>
    </div>
  );
}

export default EventHomeDemo;
