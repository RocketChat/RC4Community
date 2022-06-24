import Head from "next/head";
import { Stack } from "react-bootstrap";
import IpfsAdder from "../../components/marketplace/ipfs";

function IPFSdemo() {
  return (
    <div>
      <Head>
        <title>Form</title>
        <meta name="description" content="Rocket.Chat ipfs tool demo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Stack className="mx-auto">
        <h1 className="mx-auto mt-3">
          Preview of Peer-to-Peer Sharing IPFS Component
        </h1>
        <IpfsAdder showText={"IPFS Add"} />
      </Stack>
    </div>
  );
}

export default IPFSdemo;
