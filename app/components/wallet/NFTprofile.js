import { useEffect, useState } from "react";
import { Alert, Button, Image, Modal, Spinner } from "react-bootstrap";
import { connectAccount, fetchAssets } from "../../lib/walletAPI";
import { ErrorModal } from "./connectMeta";
import styles from "../../styles/meta.module.css";
import Cookies from "js-cookie";
import SuperProfileUpsertNFT, { mutationNFT } from "../superProfile/upsertNFT";

const NFTProfile = ({ limit }) => {
  const [assets, setAssets] = useState(null);
  const [showErr, setShowErr] = useState(false);
  const [bmess, setBmess] = useState("Set NFT profile");
  const [errMess, setErrMess] = useState("");
  const [preview, setPreview] = useState(false);
  const [select, setSelect] = useState(null);
  const [load, setLoad] = useState(false);

  const uid = Cookies.get("user");

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
    if (!uid) {
      setShowErr(true);
      setErrMess("Please login or signup to use this feature");
      return;
    }
    try {
      setBmess("Connecting Wallet...");
      const account = await connectAccount();
      setBmess("Fetching assets...");

      const fessets = await fetchAssets(account, limit);
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
      <Button variant="warning" onClick={handleButton}>
        {bmess}
      </Button>
      <ErrorModal show={showErr} handleClose={handleClose} err={errMess} />
      <GalleryModal
        show={preview}
        assets={assets}
        handleClose={handlePreviewModal}
        handleImage={handleImage}
        uid={uid}
        select={select}
        load={load}
        setLoad={setLoad}
        errMess={errMess}
        setErrMess={setErrMess}
      />
    </>
  );
};

const GalleryModal = ({
  handleClose,
  show,
  assets,
  handleImage,
  uid,
  select,
  load,
  setLoad,
  errMess,
  setErrMess,
}) => {
  const [mutate, setMutate] = useState(false);
  try {
    let assetSelected = assets[select.split("_")[1]] || undefined;

    let address = assetSelected.asset_contract.address;
    let token = assetSelected.token_id;
  } catch {
    let address = "";
    let token = "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    assetSelected = assets[select.split("_")[1]];
    address = assetSelected.asset_contract.address;
    token = assetSelected.token_id;
    setMutate(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a NFT</Modal.Title>
        </Modal.Header>
        {mutate === true && (
          <SuperProfileUpsertNFT
            setMutate={setMutate}
            setErrMess={setErrMess}
            setLoad={setLoad}
            uid={uid}
            address={address}
            token={token}
          />
        )}

        {mutate == "err" && (
          <Alert variant={"danger"}>{errMess} - Please try again!</Alert>
        )}
        {mutate == "yay" && (
          <Alert
            variant={"success"}
            onClose={() => {
              handleClose();
              setMutate(false);
            }}
            dismissible
          >
            NFT set success!
          </Alert>
        )}
        <Modal.Body className={styles.selectNFT}>
          {assets
            ? assets.map(
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
              )
            : "No assets available"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={load} onClick={handleSubmit}>
            {!load ? (
              "Save Changes"
            ) : (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NFTProfile;
