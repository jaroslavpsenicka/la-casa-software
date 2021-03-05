import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

import photo from '../static/photo.jpg';

const StyledNavbar = styled(Navbar)`
  border-bottom: 1px solid lightgray;
  height: 70px;
`

const Header = () => (
  <StyledNavbar bg="white" sticky="top">
    <Navbar.Brand href="/news" className="text-secondary">LCS</Navbar.Brand>
    <Nav className="ml-auto">
    <a href="https://github.com/jaroslavpsenicka/la-casa-software" target="_new" className="mt-1">
      <Image src={photo} roundedCircle/>
    </a>
    </Nav>
  </StyledNavbar>
)

export default Header;
