import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";

const Meta = () => {
  const [metaAccnt, setMetaAccnt] = useState(null);
  const [userBalace, setUserBalance] = useState(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAccount = async () => {
    if (typeof ethereum == "undefined") {
      setShow(true);
      console.log("nonono");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    setMetaAccnt(account);
    getAccountBalance(account);
  };

  const getAccountBalance = async (account) => {
    const balance = await ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
    setUserBalance(balance);
};

  console.log("et", metaAccnt);
  console.log("ote", parseInt(userBalace, 16))

  return (
    <div>
      <Button onClick={getAccount}>Connect to MetaMask</Button>
      <ErrorModal show={show} handleClose={handleClose} />
    </div>
  );
};

function ErrorModal({ show, handleClose }) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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
