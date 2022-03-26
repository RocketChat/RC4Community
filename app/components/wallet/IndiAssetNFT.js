import { useState } from "react";
import { Button, Card, Form, Modal, Spinner } from "react-bootstrap";
import { fetchOpenSea } from "../../lib/walletAPI";

const RequestNFT = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="warning" onClick={handleShow}>
        Request NFT
      </Button>
      <NFTCard show={show} handleClose={handleClose} />
    </div>
  );
};

const NFTCard = ({ show, handleClose }) => {
  const [NFT, setNFT] = useState("");

  const [nform, setNform] = useState({
    nadd: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    token: "1",
  });

  const [proc, setProc] = useState(false);

  const handleFetch = async (a, t) => {
    setProc(true);
    const res = await fetchOpenSea(a, t);
    setProc(false);
    setNFT(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFetch(nform.nadd, nform.token);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNform((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Retrieve a Single Asset</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Address of the contract for this NFT</Form.Label>
            <Form.Control
              name="nadd"
              type="text"
              onChange={handleChange}
              required
              placeholder={nform.nadd}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Token ID for this item</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="token"
              type="text"
              required
              placeholder={nform.token}
            />
          </Form.Group>
          {NFT.image_url ? (
            <Card style={{ width: "10em", marginTop: "1em" }}>
              <Card.Header>Preview Image</Card.Header>
              <Card.Img src={NFT.image_preview_url}></Card.Img>
            </Card>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={proc} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={proc} type="submit">
            {proc ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Submit"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RequestNFT;
