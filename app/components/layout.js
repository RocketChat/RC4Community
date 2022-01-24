import { withAuthUser } from 'next-firebase-auth'
import '../styles/Layout.module.css'
import Footer from './footer'
import Menubar from './menubar'


function Layout(props) {
   
    return (
        <>
       <Menubar menu={props.menu.topNavItems} />
          {props.children}
        <Footer></Footer>
        </>
    )
}

export default withAuthUser()(Layout);
