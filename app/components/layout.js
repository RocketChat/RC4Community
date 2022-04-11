import "../styles/Layout.module.css";
import Footer from "./footer";
import Menubar from "./menubar";
import Announcement from "./announcement";
import BookmarkSVG from "/public/svg/bookmark.js";
import styles from "../styles/Mainstage.module.css";
import { useRouter } from "next/router";

function Layout(props) {
  const { pathname } = useRouter();
  return (
    <>
      <Announcement announcement={props.menu.announcement} />
      <Menubar menu={props.menu.topNavItems} />
      {props.children}
      <Footer></Footer>
      {pathname === "/virtualconf/mainstage" && (
        <p className={styles.announcement}>
          <span className={styles.announcement__svg}>
            <BookmarkSVG />
          </span>{" "}
          Bookmark this page and come back on{" "}
          <span className={styles.announcement__text}>April 6</span> for the
          LIVE conference
        </p>
      )}
    </>
  );
}

export default Layout;
