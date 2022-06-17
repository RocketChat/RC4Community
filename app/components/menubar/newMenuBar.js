import { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, Container, Col, Row, Offcanvas } from 'react-bootstrap';
import styles from '../../styles/Menubar.module.css';
import { FirebaseAuthMenuButton } from '../auth/firebase';
import BrandLogo from '../brandlogo';
import NFTProfilePicture from './nftProfilePicture';

const ArrowIcon = () => {
  return (
    <svg
      width='14'
      height='15'
      viewBox='0 0 32 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1.5 1.5L15.5 15.5L31 1.5' stroke='black' stroke-width='2' />
    </svg>
  );
};

const MobileNav = ({ nav_Items, nft }) => {
  const [dropDown, setDropDown] = useState({ show: false, _id: 0 });

  return (
    <Navbar className='d-lg-none' expand={false}>
      <Container fluid>
        <Navbar.Toggle
          aria-controls='offcanvasNavbar'
          className={styles.default_toggler}
        >
          <div
            className={`${styles.navbar_toggler} navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around bg-white`}
            type='button'
          >
            <span className={`${styles.toggler_icon} mb-2`}></span>
            <span className={`${styles.toggler_icon} mt-2`}></span>
          </div>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id='offcanvasNavbar'
          aria-labelledby='offcanvasNavbarLabel'
          placement='start'
        >
          <Offcanvas.Header closeButton>
            <Navbar.Brand
              href='#'
              className='d-flex justify-content-center align-items-center '
            >
              <BrandLogo
                brandLink={'/'}
                logoLink={
                  'https://global-uploads.webflow.com/611a19b9853b7414a0f6b3f6/611bbb87319adfd903b90f24_logoRC.svg'
                }
                imageTitle={'Rocket.Chat'}
                brandName={'Rocket.Chat Community'}
                height={30}
                width={132}
              />
            </Navbar.Brand>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {nav_Items?.map((nav_Item) =>
              nav_Item.url ? (
                <div key={nav_Item.id}>
                  <Row
                    className={`${styles.dropdown} d-flex flex-row justify-content-between align-items-center mt-3 `}
                    onClick={() => {
                      setDropDown({ show: false, _id: 0 });
                    }}
                  >
                    <Col>
                      <a
                        href={nav_Item.url}
                        className='text-decoration-none fs-4 fw-light text-dark'
                      >
                        {nav_Item.label}
                      </a>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div key={nav_Item.id}>
                  <Row
                    className={`${styles.dropdown} d-flex flex-row justify-content-between align-items-center mt-3 `}
                    onClick={() => {
                      if (dropDown._id === nav_Item.id) {
                        setDropDown({ show: false, _id: 0 });
                      } else {
                        setDropDown({ show: true, _id: nav_Item.id });
                      }
                    }}
                  >
                    <Col
                      className={
                        dropDown._id === nav_Item.id && dropDown.show
                          ? `${styles.color} fs-4 fw-light`
                          : 'fs-4 fw-light'
                      }
                    >
                      {nav_Item.label}
                    </Col>
                    <Col>
                      {nav_Item.sub_menus?.length > 1 && (
                        <span
                          className={
                            dropDown.show
                              ? `${styles.arrowRotate} bg-transparent me-2`
                              : `${styles.arrow} bg-transparent me-2 `
                          }
                        >
                          <ArrowIcon />
                        </span>
                      )}
                    </Col>
                  </Row>
                  {dropDown._id === nav_Item.id && dropDown.show ? (
                    <div>
                      <div>
                        {nav_Item.sub_menus.map(
                          (item) =>
                            item.parent_id === null && (
                              <>
                                <div className='p-2 fw-medium'>
                                  <a
                                    href={item.url}
                                    className={styles.subItemLinks}
                                  >
                                    {item.label}
                                  </a>
                                </div>
                                {nav_Item.sub_menus.map(
                                  (subItem) =>
                                    subItem.parent_id === item.id && (
                                      <div className='px-4 py-1 fw-light'>
                                        <a
                                          href={subItem.url}
                                          className={styles.subItemLinks}
                                        >
                                          {subItem.label}
                                        </a>
                                      </div>
                                    )
                                )}
                              </>
                            )
                        )}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Navbar.Brand className={styles.brand}>
          {nft ? <NFTProfilePicture id='img2' /> : <FirebaseAuthMenuButton />}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

const DesktopNav = ({ nav_Items, nft }) => {
  const [isShown, setIsShown] = useState(0);
  const clickRef = useRef(null);

  const handleClickOutside = (event) => {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      setIsShown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <Navbar className='d-none d-lg-flex justify-content-between px-4 py-3'>
      <BrandLogo
        brandLink={'/'}
        logoLink={
          'https://global-uploads.webflow.com/611a19b9853b7414a0f6b3f6/611bbb87319adfd903b90f24_logoRC.svg'
        }
        imageTitle={'Rocket.Chat'}
        brandName={'Rocket.Chat Community'}
        height={32}
        width={132}
      />
      <Nav className='w-full ' ref={clickRef}>
        {nav_Items?.map((nav_item, key) =>
          nav_item.sub_menus?.length > 1 ? (
            <span
              key={key}
              className='p-2 d-flex flex-column mx-3 '
              onMouseEnter={() => {
                setIsShown(nav_item.id);
              }}
              onTouchStart={() => {
                setIsShown(nav_item.id);
              }}
              onMouseLeave={() => setIsShown(0)}
            >
              <span className={`${styles.navbar_item_hover} text-muted`}>
                {nav_item.url ? (
                  <a href={nav_item.url} className='text-decoration-none'>
                    {nav_item.label}
                  </a>
                ) : (
                  nav_item.label
                )}
              </span>
              {/*submenu container | this will be shown for those whose id is in isShown */}
              <div className={`${styles.navbar_subitems} shadow-lg`}>
                {isShown === nav_item.id && (
                  <div
                    className={
                      nav_item.sub_menus?.length > 10
                        ? 'd-flex flex-row '
                        : 'd-flex flex-column '
                    }
                  >
                    {/* iterate over sub menus like omnichannels, devops, GSoC, GSoD */}
                    {nav_item.sub_menus.map(
                      (item) =>
                        item.parent_id < 1 && (
                          <div className={`${styles.navbar_subitems_items}`}>
                            <div>
                              <a
                                href={item.url}
                                className={styles.subItemLinks}
                              >
                                {item.label}
                              </a>
                            </div>
                            {/*if submenus contain more sub menus */}
                            {nav_item.sub_menus.map(
                              (subItem) =>
                                subItem.parent_id === item.id && (
                                  <div className='px-4 pt-3 fw-light'>
                                    <a
                                      href={subItem.url}
                                      className={styles.subItemLinks}
                                    >
                                      {subItem.label}
                                    </a>
                                  </div>
                                )
                            )}
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            </span>
          ) : (
            <Nav.Link
              key={key}
              className={`${styles.navbar_item_hover} text-muted mx-3`}
            >
              {nav_item.label}
            </Nav.Link>
          )
        )}
      </Nav>
      <div>
        {nft ? <NFTProfilePicture id='img1' /> : <FirebaseAuthMenuButton />}
      </div>
    </Navbar>
  );
};

export default function NewMenubar(props) {
  const [pfpIsNFT, setPfpIsNFT] = useState(true);
  return (
    <Container fluid className=''>
      <MobileNav nav_Items={props.menu?.body} nft={pfpIsNFT} />
      <DesktopNav nav_Items={props.menu?.body} nft={pfpIsNFT} />
    </Container>
  );
}
