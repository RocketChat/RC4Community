import '../styles/Layout.module.css';
import Footer from './footer';
import NewMenubar from './menubar/newMenuBar';
import { useRouter } from 'next/router';

function Layout(props) {
  const { pathname } = useRouter();
  return (
    <>
      <NewMenubar menu={props.menu.topNavItems} brandInfo={props.brandInfo} />
      {props.children}
      <Footer />
      {/* announcement component here*/}
      {/* pathname === '/virtualconf/mainstage' && (
        <p className={styles.announcement}>
          <span className={styles.announcement__svg}>
            <BookmarkSVG />
          </span>{' '}
          Bookmark this page and come back on{' '}
          <span className={styles.announcement__text}>April 6</span> for the
          LIVE conference
        </p>
      )*/}
    </>
  );
}

export default Layout;
