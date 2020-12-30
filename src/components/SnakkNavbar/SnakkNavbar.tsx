import React, { ReactElement, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./SnakkNavbar.css";
import norwayFlag from "../../assets/norwayFlag.png";
import styled from "styled-components";
import { theme } from "../../theme";

// Styled components

const Flag = styled.img`
  max-width: 40px;

  @media ${theme.device.tablet} {
    margin-right: 20px;
  }
`;

export default function SnakkNavbar(): ReactElement {
  return (
    <Navbar
      style={{ marginBottom: "10px", borderRadius: "5px" }}
      bg="primary"
      variant="dark"
      expand="lg"
    >
      <Flag src={norwayFlag} alt="Norway Flag" />
      <Navbar.Brand href="#">Snakk</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#languages">Languages</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
