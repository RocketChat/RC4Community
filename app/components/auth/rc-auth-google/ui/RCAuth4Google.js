import { useState } from 'react';

import { NoUserAvatar } from '../../NoUserAvatar';

import styles from '../styles/DummyLoginButton.module.css';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import Image from "next/image";

export default function RCAuthGoogleLoginButton({
  user,
  handleLogin,
  handleLogout,
  handleResend,
  isModalOpen,
  setIsModalOpen,
  method,
}) {
  const [isLoginUiOpen, setIsLoginUiOpen] = useState(false);

  const [accessCode, setAccessCode] = useState(null);

  return (
    <div className={styles.authDialogWrapper}>
      <div className={styles.avatar}>
        <button className={styles.avatarButton}>
          <span
            className='d-flex align-items-center'
            onClick={() => setIsLoginUiOpen((prev) => !prev)}
          >
            {user?.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                className='rounded-circle'
                height={42}
                width={42}
              />
            ) : (
              <NoUserAvatar
                name={user?.name}
                size='42'
              />
            )}
          </span>
        </button>
      </div>
      {isLoginUiOpen && (
        <div className={styles.authContainer}>
          {user._id ? (
            <>
              <div className='d-flex flex-column align-items-center mt-4 mb-3 ml-3 mr-3 border-bottom'>
                <div className='mb-1'>
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={user.name}
                      style={{
                        borderRadius: '50%',
                      }}
                      height={64}
                      width={64}
                    />
                  ) : (
                    <NoUserAvatar
                      size='64'
                      name={user.name}
                    />
                  )}
                </div>
                <div className='font-weight-bold mb-1'>{user.name}</div>
                <div
                  className='mb-1'
                  style={{ color: 'var(--bs-gray-700)' }}
                >
                  {user.email}
                </div>
              </div>
              <div className='d-flex justify-content-center mb-4 mt-3 ml-3 mr-3'>
                <Button
                  variant='secondary'
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className='d-flex flex-column align-items-center my-3'>
              <Button onClick={handleLogin}>Log In</Button>
            </div>
          )}
        </div>
      )}
      <AccessModal
        handleResend={handleResend}
        handleLogin={handleLogin}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        accessCode={accessCode}
        setAccessCode={setAccessCode}
        method={method}
      />
    </div>
  );
}

const AccessModal = ({
  handleLogin,
  handleResend,
  isModalOpen,
  setIsModalOpen,
  accessCode,
  setAccessCode,
  method,
}) => {
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccessCode(undefined);
    handleLogin(accessCode);
    handleModalToggle();
  };

  const handleEdit = (e) => {
    setAccessCode(e.target.value);
  };

  return (
    <>
      <Modal
        show={isModalOpen}
        onHide={handleModalToggle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Two-factor authentication via {method}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id='access_form'
            onSubmit={handleSubmit}
          >
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInput1'
            >
              {method === 'totp' ? (
                <Form.Label>
                  Open your authentication app and enter the code. You can also use one of your
                  backup codes.
                </Form.Label>
              ) : (
                <Form.Label>Verify your email for the code we sent.</Form.Label>
              )}
              <InputGroup className='mb-3'>
                <Form.Control
                  type='text'
                  required
                  placeholder='123456'
                  autoFocus
                  onChange={handleEdit}
                />
                {method === 'email' && (
                  <Button
                    onClick={handleResend}
                    variant='outline-secondary'
                  >
                    Resend
                  </Button>
                )}
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleModalToggle}
          >
            Close
          </Button>
          <Button
            form='access_form'
            variant='primary'
            type='submit'
          >
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
