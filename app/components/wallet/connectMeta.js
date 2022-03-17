import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { FaWallet } from "react-icons/fa";
import styles from "../../styles/meta.module.css";

const Meta = () => {
  const [metaAccnt, setMetaAccnt] = useState("0x0");
  const [userBalance, setUserBalance] = useState(null);
  const [show, setShow] = useState(false);
  const [buttonText, setButtonText] = useState("Connect to MetaMask");
  const [connected, setConnected] = useState(false);

  const handleClose = () => setShow(false);

  const getAccount = async () => {
    if (typeof ethereum == "undefined") {
      setShow(true);
      return;
    }
    try {
      setButtonText("Connecting...");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setMetaAccnt(account);
      getAccountBalance(account);
    } catch {
      console.error("An error occurred");
      setButtonText("Re-connect to Metamask");
    }
  };

  const getAccountBalance = async (account) => {
    try {
      const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      setUserBalance(balance);
      setButtonText("Connected");
      setConnected(true);
    } catch (error) {
      console.log("An error ocurred while fetching balance", error);
      setButtonText("Re-connect to Metamask");
      setConnected(false);
    }
  };

  useEffect(() => {
    if (typeof ethereum == "undefined") {
      setShow(true);
      return;
    }
    ethereum.on("accountsChanged", (accounts) => {
      setMetaAccnt(accounts[0]);
      getAccountBalance(accounts.toString());
    });

    ethereum.on("chainChanged", (chainId) => {
      alert(chainId);
      location.reload();
    });
  }, [metaAccnt]);

  return (
    <div>
      {connected ? (
        <ShowBalance balance={userBalance} account={metaAccnt} />
      ) : (
        <Button onClick={getAccount}>
          {<FaWallet />} {buttonText}
        </Button>
      )}
      <ErrorModal show={show} handleClose={handleClose} />
    </div>
  );
};

const ShowBalance = ({ balance, account }) => {
  return (
    <div>
      <div className={styles.account}>
        {parseInt(balance, 16)} ETH
        <OverlayTrigger
          overlay={
            <Tooltip placement="right" id="tooltip-disabled">
              Account Id!
            </Tooltip>
          }
        >
          <Badge className={styles.pill} pill>
            {`${account.substr(0, 4)}...${account.substr(
              account.length - 4,
              account.length
            )}`}
          </Badge>
        </OverlayTrigger>
      </div>
    </div>
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
          <Alert variant="danger" onClose={handleClose}>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Please get MetaMask and setup the MetaMask by following the
              instructions as listed on official website.
            </p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Meta;