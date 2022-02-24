import '../styles/Layout.module.css';
import { withFirebaseAuthUser } from './auth/firebase';
import Footer from './footer';
import Menubar from './menubar';
import NewMenubar from './newMenuBar';

function Layout(props) {
  return (
    <>
      {/*<Menubar menu={props.menu.topNavItems} />*/}
      <NewMenubar menu={props.menu.topNavItems} />
      {props.children}
      <Footer></Footer>
    </>
  );
}

export default withFirebaseAuthUser()(Layout);
