import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useHistory } from "react-router";
import { Nav, Container, NavDropdown } from "react-bootstrap";
import "./Header.css";
const Header = () => {
  const routerHistory = useHistory();
  const userEnd = () => {
    localStorage.clear();
    sessionStorage.clear();
    // window.location.href = "/";
    routerHistory.push("/");
    console.log("hello logout");
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="color-gradiant"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">Nuniyo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="">
              <Nav.Link href="/">Signup</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
