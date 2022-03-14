import { useState } from "react";
import { Alert, Badge, Button, Modal } from "react-bootstrap";
import { FaWallet } from "react-icons/fa";

const Meta = () => {
  const [metaAccnt, setMetaAccnt] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState("Connect to MetaMask");
  const [connected, setConnected] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAccount = async () => {
    if (typeof ethereum == "undefined") {
      setShow(true);
      return;
    }
    // location.reload()
    setButtonText("Connecting...");
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setButtonText("Connected");
      const account = accounts[0];
      setMetaAccnt(account);
      getAccountBalance(account);
    } catch {
      console.error("An error occurred");
      setButtonText("Re-connect to Metamask");
    }
  };

  const getAccountBalance = async (account) => {
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });
    setUserBalance(balance);
    setConnected(true);
  };

  const handleAccountChange = (newAccnt) => {
    setMetaAccnt(newAccnt);
  };

  const handleChainChange = () => {
    location.reload();
  };

  typeof ethereum !== "undefined" &&
    ethereum.on("accountsChanged", (accounts) => {
      setMetaAccnt(accounts[0]);
    });

  typeof ethereum !== "undefined" &&
    ethereum.on("chainChanged", (chainId) => {
      location.reload();
    });

  console.log("et", metaAccnt);
  console.log("ote", parseInt(userBalance, 16));

  return (
    <div>
      {connected ? (
        <ShowBalance balance={userBalance} account={metaAccnt} />
      ) : (
        <Button onClick={getAccount}>{<FaWallet />} {buttonText }</Button>
      )}
      <ErrorModal show={show} handleClose={handleClose} />
    </div>
  );
};

const ShowBalance = ({ balance, account }) => {
  return (
    <Button style={{display: "flex", alignItems: "flex-end"}} variant="secondary">
      <Badge bg="dark">{parseFloat(balance, 16)}</Badge>
      <div style={{marginLeft: "0.5em", overflow: "hidden", textOverflow: "ellipsis", width: "90px"}}>{account}</div>
    </Button>
  );
};

function ErrorModal({ show, handleClose }) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Alert variant="danger" onClose={handleClose} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Please get MetaMask and setup the MetaMask by following the
              instructions as listed on official website.
            </p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Meta;
