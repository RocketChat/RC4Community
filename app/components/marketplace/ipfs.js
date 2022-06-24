import { Button, Card, Spinner, Stack } from "react-bootstrap";
import * as IPFS from "ipfs-core";
import { useRef, useState } from "react";

const IpfsAdder = ({ showText }) => {
  const [fileUrl, updateFileUrl] = useState(``);
  const [cid, setCID] = useState("");
  const [adding, setAdding] = useState(false);

  const hiddenInput = useRef(null);

  const getIPFS = async (e) => {
    try {
      setAdding(true);
      const file = e.target.files[0];

      const ipfs = await IPFS.create({ repo: "ok" + Math.random() });

      console.log("ipfs", ipfs);
      const { cid } = await ipfs.add(file);
      const url = `https://ipfs.io/ipfs/${cid.toString()}`;
      updateFileUrl(url);

      setCID(cid.toString());
      setAdding(false);
    } catch (e) {
      setAdding(false);
      console.error("An error occurred while uploading media", e);
    }
  };

  const handleInputClick = (event) => {
    hiddenInput.current.click();
  };

  return (
    <div className="mx-auto">
      <Stack direction="vertical" gap={2}>
        <Stack direction="horizontal" gap={2}>
          <Button disabled={adding} onClick={handleInputClick}>
            {adding ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              showText
            )}
          </Button>
          <input
            type="file"
            style={{ display: "none" }}
            ref={hiddenInput}
            accept="image/*"
            capture="camera"
            onChange={getIPFS}
          />
          {cid && <Copy cid={cid} />}
        </Stack>

        {fileUrl && <PreviewImage srcUrl={fileUrl} />}
      </Stack>
    </div>
  );
};

const Copy = ({ cid }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(cid)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack gap={2} direction="horizontal">
      <Button disabled variant="outline-dark">
        {cid.substr(0, 5)}...{cid.substr(cid.length - 5, cid.length)}
      </Button>
      <Button variant="outline-dark" onClick={handleCopyClick}>
        {isCopied ? "Copied" : "Copy"}
      </Button>
    </Stack>
  );
};

const PreviewImage = ({ srcUrl }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={srcUrl} />
      <Card.Body>
        <Card.Title>Image Preview</Card.Title>
        <Button href={srcUrl} target="_blank" variant="primary">
          Visit on IPFS
        </Button>
      </Card.Body>
    </Card>
  );
};

export default IpfsAdder;
