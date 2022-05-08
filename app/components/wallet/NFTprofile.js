import { useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { connectAccount, fetchAssets } from "../../lib/walletAPI";
import { ErrorModal } from "./connectMeta";
import styles from "../../styles/meta.module.css";

const NFTProfile = ({ limit }) => {
  const [assets, setAssets] = useState(null);
  const [showErr, setShowErr] = useState(false);
  const [bmess, setBmess] = useState("Set NFT profile");
  const [errMess, setErrMess] = useState("");
  const [preview, setPreview] = useState(false);
  const [select, setSelect] = useState(null);

  const handleClose = () => {
    setShowErr(false);
    setSelect(null);
  };

  const handleImage = (e) => {
    const selClass = e.target.className.split(" ")[1];
    setSelect(selClass);
    if (select != null) {
      document.querySelector(`.${select}`).style.boxShadow = "none";
    }
    document.querySelector(`.${selClass}`).style.boxShadow =
      "0px 0px 13px 1px #000000f2";
  };

  const handlePreviewModal = () => setPreview(false);

  const handleButton = async () => {
    if (typeof ethereum == "undefined") {
      setShowErr(true);
      setErrMess("Please Install MetaMask");
      return;
    }
    try {
      setBmess("Connecting Wallet...");
      const account = await connectAccount();
      setBmess("Fetching assets...");
      // before
      // const fessets = await fetchAssets(account, limit);

      const fessets = await fetchAssets('0xc361fc33b99f88612257ac8cc2d852a5cee0e217', limit);
      if (fessets.owner) {
        setErrMess(fessets.owner[0]);
        setShowErr(true);
        console.error(fessets.owner[0]);
        return;
      }
      setAssets(fessets.assets);
      setPreview(true);
      setBmess("Set NFT profile");
    } catch (error) {
      setBmess("Re-Fetch assets");
      console.error("Oh snap, we ran into an error", error);
    }
  };
  return (
    <>
      <Button variant="warning" onClick={handleButton}>{bmess}</Button>
      <ErrorModal show={showErr} handleClose={handleClose} err={errMess} />
      <GalleryModal
        show={preview}
        assets={assets}
        handleClose={handlePreviewModal}
        handleImage={handleImage}
      />
    </>
  );
};

const GalleryModal = ({ handleClose, show, assets, handleImage }) => {
    console.log("assets", assets)
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a NFT</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.selectNFT}>
          {assets ?
            assets.map(
              (a, i) =>
                a.image_url && (
                  <div key={i} className={styles.asset}>
                    <Image
                      key={i}
                      onClick={handleImage}
                      className={`${styles.assetImage} nim_${i}`}
                      src={a.image_url}
                    />
                  </div>
                )
            ) : "No assets available"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NFTProfile;
