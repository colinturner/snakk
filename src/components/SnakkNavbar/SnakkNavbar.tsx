import React, { ReactElement, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./SnakkNavbar.css";
import norwayFlag from "../../assets/norwayFlag.png";

export default function SnakkNavbar(): ReactElement {
  return (
    <Navbar
      style={{ marginBottom: "10px" }}
      bg="primary"
      variant="dark"
      expand="lg"
    >
      <Navbar.Brand href="#">Snakk</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#languages">Languages</Nav.Link>
          <Nav.Link href="#learn">Learn verbs</Nav.Link>
          <Nav.Link href="#additional-resources">Additional resources</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Flag />
    </Navbar>
  );
}

export function Flag(): ReactElement {
  return <img className="flag" src={norwayFlag} alt="Norway Flag" />;
}
