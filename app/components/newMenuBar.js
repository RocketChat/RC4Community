import { useState } from 'react';
import { Navbar, Nav, Container, Col, Row, Offcanvas } from 'react-bootstrap';
import styles from '../styles/Menubar.module.css';
import { FirebaseAuthMenuButton } from './auth/firebase';

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

const navData = [
  {
    __component: 'menu.links',
    id: 3,
    label: 'Community',
    sub_menus: [
      {
        id: 1,
        label: 'Google Summer of Code 2022',
        sub_menu_items: [
          {
            id: 1,
            label: 'Program information',
            url: 'https://docs.rocket.chat/contributors/google-summer-of-code/google-summer-of-code-2021',
          },
          {
            id: 2,
            label: 'Introductions',
            url: 'https://open.rocket.chat/channel/gsoc2022',
          },
          {
            id: 3,
            label: 'Team',
            url: 'https://open.rocket.chat/channel/google-summer-of-code',
          },
          {
            id: 4,
            label: 'Leaderboard',
            url: 'https://gsoc.rocket.chat',
          },
          {
            id: 5,
            label: 'Virtual Conference',
            url: 'https://rocket.chat',
          },
          {
            id: 6,
            label: 'Office Hours',
            url: 'https://rocket.chat',
          },
          {
            id: 7,
            label: 'Projects Ideas',
            url: 'https://docs.rocket.chat/contributors/google-summer-of-code/google-summer-of-code-2021#project-ideas',
          },
          {
            id: 8,
            label: 'Results',
            url: 'https://docs.rocket.chat/contributors/google-summer-of-code/google-summer-of-code-2021#update-may-20th-2021',
          },
        ],
      },
      {
        id: 2,
        label: 'Google Season of Doc 2022',
        sub_menu_items: [
          {
            id: 1,
            label: 'Program information',
            url: 'https://docs.rocket.chat/contributors/google-season-of-docs/google-season-of-docs-2021',
          },
          {
            id: 2,
            label: 'Introductions',
            url: 'https://open.rocket.chat/channel/gsod2022',
          },
        ],
      },
    ],
  },
  {
    __component: 'menu.dropdown',
    id: 6,
    label: 'Knowledge',
    sub_menus: [
      {
        id: 1,
        label: 'DevOps',
        url: 'https://rocket.chat/devops/',
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:53.723Z',
        updated_at: '2021-06-21T09:03:53.723Z',
      },
      {
        id: 2,
        label: 'Omnichannel',
        url: 'https://rocket.chat/omnichannel/',
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:54.046Z',
        updated_at: '2021-06-21T09:03:54.046Z',
      },
      {
        id: 5,
        label: 'Remote Work',
        url: 'https://rocket.chat/remote-work/',
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:54.992Z',
        updated_at: '2021-06-21T09:03:54.992Z',
      },
      {
        id: 6,
        label: 'Small',
        url: 'https://rocket.chat/small-and-medium/',
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:55.372Z',
        updated_at: '2021-06-21T09:03:55.372Z',
      },
      {
        id: 7,
        label: 'Virtual Conference',
        url: 'https://rocket.chat/virtual-conference/',
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:55.694Z',
        updated_at: '2021-06-21T09:03:55.694Z',
      },
      {
        id: 8,
        label: 'Education',
        url: 'https://rocket.chat/education/',
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:56.029Z',
        updated_at: '2021-06-21T09:03:56.029Z',
      },
      {
        id: 4,
        label: 'Security',
        url: 'https://rocket.chat/security/',
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:54.670Z',
        updated_at: '2021-06-21T09:03:54.670Z',
      },
      {
        id: 3,
        label: 'Team Collaboration',
        url: 'https://rocket.chat/team-collaboration/',
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:54.358Z',
        updated_at: '2021-06-21T09:03:54.358Z',
      },
    ],
  },
  {
    __component: 'menu.dropdown',
    id: 10,
    label: 'Product',
    sub_menus: [],
  },
  {
    __component: 'menu.dropdown',
    id: 8,
    label: 'Groups',
    sub_menus: [
      {
        id: 9,
        label: 'Admin',
        url: null,
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:56.285Z',
        updated_at: '2021-06-21T09:03:56.285Z',
      },
      {
        id: 12,
        label: 'Student',
        url: null,
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:57.289Z',
        updated_at: '2021-06-21T09:03:57.289Z',
      },
      {
        id: 10,
        label: 'Developer',
        url: null,
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:56.608Z',
        updated_at: '2021-06-21T09:03:56.608Z',
      },
      {
        id: 11,
        label: 'Live Chat User',
        url: null,
        published_at: '2021-06-21T09:03:49.991Z',
        created_at: '2021-06-21T09:03:56.953Z',
        updated_at: '2021-06-21T09:03:56.953Z',
      },
    ],
  },
  {
    __component: 'menu.dropdown',
    id: 9,
    label: 'Events',
    sub_menus: [],
  },
  {
    __component: 'menu.dropdown',
    id: 7,
    label: 'Partners',
    sub_menus: [],
  },
];
const MobileNav = ({ nav_Items }) => {
  const [dropDown, setDropDown] = useState({ show: false, _id: 0 });

  return (
    <Navbar className='d-lg-none' expand={false}>
      <Container fluid>
        <Navbar.Toggle
          aria-controls='offcanvasNavbar'
          className={styles.default_toggler}
        >
          <button
            className={`${styles.navbar_toggler} navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around bg-white`}
            type='button'
          >
            <span className={`${styles.toggler_icon} mb-2`}></span>
            <span className={`${styles.toggler_icon} mt-2`}></span>
          </button>
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id='offcanvasNavbar'
          aria-labelledby='offcanvasNavbarLabel'
          placement='start'
        >
          <Offcanvas.Header closeButton>
            <Navbar.Brand href='#'>Rocket Chat Community</Navbar.Brand>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {nav_Items.map((nav_Item) => (
              <div>
                <Row
                  className='d-flex flex-row justify-content-between align-items-center mt-3 '
                  onClick={() =>
                    setDropDown({ show: !dropDown.show, _id: nav_Item.id })
                  }
                >
                  <Col
                    className='fs-4 fw-light'
                    className={
                      dropDown._id === nav_Item.id && dropDown.show
                        ? `${styles.color}`
                        : ''
                    }
                  >
                    {nav_Item.label}
                  </Col>
                  <Col>
                    {nav_Item.sub_menus.length > 1 && (
                      <span className={`${styles.arrow} bg-transparent me-2 `}>
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
                          item.parent_id < 0 && (
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
            ))}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Navbar.Brand>
          <div className='ms-2'>
            <FirebaseAuthMenuButton />
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

const DesktopNav = ({ nav_Items }) => {
  const [isShown, setIsShown] = useState(0);
  return (
    <Navbar className='d-none d-lg-flex justify-content-between px-4 '>
      <Navbar.Brand href='#home' className={styles.brand}>
        Rocket.Chat Community
      </Navbar.Brand>
      <Nav className='w-full'>
        {nav_Items.map((nav_item) => (
          <>
            {nav_item.sub_menus.length > 1 ? (
              <>
                <span
                  className='p-2 d-flex flex-column mx-3'
                  onMouseEnter={() => setIsShown(nav_item.id)}
                  onMouseLeave={() => setIsShown(0)}
                >
                  <span className={`${styles.navbar_item_hover} text-muted`}>
                    {nav_item.label}
                  </span>
                  <div className={`${styles.navbar_subitems} shadow-lg`}>
                    {isShown === nav_item.id && (
                      <div className='d-flex flex-wrap'>
                        {nav_item.sub_menus.map(
                          (item) =>
                            item.parent_id < 1 && (
                              <div
                                className={`${styles.navbar_subitems_items} `}
                              >
                                <div>
                                  <a
                                    href={item.url}
                                    className={styles.subItemLinks}
                                  >
                                    {item.label}
                                  </a>
                                </div>
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
              </>
            ) : (
              <Nav.Link
                className={`${styles.navbar_item_hover} text-muted mx-3`}
              >
                {nav_item.label}
              </Nav.Link>
            )}
          </>
        ))}
      </Nav>
      <div className='mx-1'>
        <FirebaseAuthMenuButton />
      </div>
    </Navbar>
  );
};

export default function NewMenubar(props) {
  return (
    <Container fluid class='border-bottom '>
      <MobileNav nav_Items={props.menu.body} />
      <DesktopNav nav_Items={props.menu.body} />
    </Container>
  );
}
