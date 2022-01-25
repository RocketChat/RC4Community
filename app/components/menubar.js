import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Col, Row } from 'react-bootstrap';
import styles from '../styles/Menubar.module.css';

export default function Menubar(props) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Container fluid className='border-bottom '>
      <Navbar expand='lg' className=' bg-white mx-4 my-2'>
        <Navbar.Brand href='#home' className={styles.brand}>
          Rocket.Chat Community
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          className={styles.default_toggler}
        >
          <button
            className={`${styles.navbar_toggler} navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around bg-white`}
            type='button'
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            <span
              className={`${styles.toggler_icon} ${
                collapsed ? styles.top_bar_collapsed : styles.top_bar
              }`}
            ></span>
            <span
              className={`${styles.toggler_icon} ${
                collapsed ? styles.bottom_bar_collapsed : styles.bottom_bar
              }`}
            ></span>
          </button>
        </Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mx-auto'>
            {props.menu?.body?.map(item => {
              return item.sub_menus ? (
                <NavDropdown
                  title={item.label}
                  className={`ml-4 fw-light ${styles.navbarItem}`}
                >
                  {item.sub_menus.map(sub => (
                    <NavDropdown.Item
                      href={sub.url}
                      className={['dropdown-toggle']}
                    >
                      {sub.label}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link href={item.url} className='fw-light'>
                  {item.label}
                </Nav.Link>
              );
            })}
          </Nav>
          <Row className={`bg-danger bg-gradient p-2 ${styles.chat}`}>
            <Col className='text-white '>Chat</Col>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
