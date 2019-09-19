import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./SnakkNavbar.css";

class SnakkNavbar extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="#">Snakk</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#languages">Languages</Nav.Link>
            <Nav.Link href="#learn">Learn verbs</Nav.Link>
            <Nav.Link href="#additional-resources">
              Additional resources
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default SnakkNavbar;
