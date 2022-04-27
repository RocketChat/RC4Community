import Head from "next/head";
import { Button, Stack } from "react-bootstrap";
import * as IPFS from 'ipfs-core'
import { useState } from "react";


function IPFSdemo() {

    const [fileUrl, updateFileUrl] = useState(``)
    const [cid, setCID] = useState('')
    
    const getIPFS = async (e) => {
        const file = e.target.files[0]

        const ipfs = await IPFS.create()
    
        console.log("ipfs", ipfs)
        const { cid } = await ipfs.add(file)
        const url = `https://ipfs.io/ipfs/${cid.toString()}`
        updateFileUrl(url)

        setCID(cid.toString())
        // const { cid } = await ipfs.add('Hello world')

        console.info(file)    
      }

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
        <Button onClick={getIPFS}>IPFS</Button>
        <input
        type="file"
        accept="image/*"
        capture="camera"
        onChange={getIPFS}
        />
        {fileUrl && <div>The CID: <a href={fileUrl}>{cid}</a></div>}
        {fileUrl && <div>The CID: <img src={fileUrl}></img></div>}

        
    </div>
  );
}

export default IPFSdemo;
