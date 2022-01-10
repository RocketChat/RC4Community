import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from '../styles/Menubar.module.css'

export default function Menubar(props) {

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Rocket.Chat Community</Navbar.Brand><Navbar.Toggle aria-controls="basic-navbar-nav" /><Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {props.menu?.body?.map((item) => {
                            return item.sub_menus ? (
                                <NavDropdown title={item.label} >
                                    {item.sub_menus.map((sub) => (
                                        <NavDropdown.Item href={sub.url}>{sub.label}</NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ) : (
                                <Nav.Link href={item.url}>{item.label}</Nav.Link>
                            );
                        })}

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}