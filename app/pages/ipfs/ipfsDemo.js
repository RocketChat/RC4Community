import Head from "next/head";
import { Button, Stack } from "react-bootstrap";
import * as IPFS from 'ipfs-core'
import { useRef, useState } from "react";
import IpfsAdder from "../../components/marketplace/ipfs";


function IPFSdemo() {
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
        </Stack>
        <IpfsAdder />

        
    </div>
  );
}

export default IPFSdemo;
