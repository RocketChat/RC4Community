import React, { useState } from 'react';

import Link from 'next/link';
import Cookies from 'js-cookie';

import RCAuthGoogleLoginButton from './auth/rc-auth-google/ui/RCAuth4Google';
import RocketChatLinkButton from './rocketchatlinkbutton';

import BrandLogo from './brandlogo';

import { Navbar, Nav, NavDropdown, Container, Dropdown } from 'react-bootstrap';
import styles from '../styles/Menubar.module.css';
import { useRCAuth4Google } from './auth/rc-auth-google/hooks/useRCAuth4Google';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className={styles.elipses}
    href=''
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className={styles.threedots} />
  </a>
));

CustomToggle.displayName = "CustomToggle"

export default function Menubar(props) {
  const [collapsed, setCollapsed] = useState(true);
  const userCookie = Cookies.get('user');

  const { user, handleLogin, handleLogout, handleResend, isModalOpen, setIsModalOpen, method } =
    useRCAuth4Google();

  return (
    <Container
      fluid
      className='border-bottom '
    >
      <Navbar
        expand='lg'
        className=' bg-white mx-4 my-2'
      >
        <BrandLogo
          brandLink={props.brandLink}
          brandLogoSrc={props.brandLogoSrc}
          imageTitle={props.imageTitle}
          brandName={props.brandName}
          height={21}
          width={124}
        />
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          className={styles.default_toggler + ' ms-auto'}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          <button
            className={`${styles.navbar_toggler} navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around bg-white`}
            type='button'
          >
            <span
              className={`${styles.toggler_icon} ${collapsed ? styles.toggler_bar_collapsed : styles.toggler_bar
                }`}
            />
          </button>
        </Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mx-auto'>
            {props.menu?.data?.attributes?.body?.map((item, index) => {
              return item.sub_menus && item?.sub_menus?.data?.length ? (
                <NavDropdown
                  key={`NavDropDown_${index}`}
                  title={item.label}
                  className={`ml-4 fw-normal ${styles.navbarItem}`}
                >
                  {item.sub_menus.data.map((sub, index) => (
                    <NavDropdown.Item
                      key={sub.id || sub._id || `NavDropDownItem_${index}`}
                      href={sub.attributes.url}
                    >
                      {sub.attributes.label}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link
                  href={item.url}
                  className='fw-normal'
                  key={item.id || item._id || `NavLink_${index}`}
                >
                  {item.label}
                </Nav.Link>
              );
            })}
          </Nav>
          {user._id && (
            <RocketChatLinkButton
              className={`bg-danger bg-gradient p-2 text-white ${styles.chat}`}
              user={user}
              channel={'general'}
            >
              Click to Chat
            </RocketChatLinkButton>
          )}
        </Navbar.Collapse>
        <div className='mx-3'>
          {userCookie && (
            <Dropdown
              align='end'
              className={styles.dropdown_menu}
            >
              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu
                size='sm'
                title=''
              >
                <Dropdown.Header>RC4Community Profile</Dropdown.Header>
                <Dropdown.Item>
                  <Link href={`/profile/${userCookie}`} className={styles.dropdown_menu_item}>
                    Profile
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className='mx-2'>
          <RCAuthGoogleLoginButton
            user={user}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            handleResend={handleResend}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            method={method}
          />
        </div>
      </Navbar>
    </Container>
  );
}
