import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { A } from 'hookrouter';
import { faHome, faCog, faCube, faTasks } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  width: 200px;
  min-width: 200px;
`

const Sidebar = ({ visible }) => (  
  <StyledNavbar className={ visible ? "py-4 pl-4 pr-0 border-bottom-0" : "d-none"}>
    <Nav className="vertical align-self-start flex-column">
      <div className="mb-2">
        <FontAwesomeIcon icon={faHome} className="text-secondary"/>
        <A className="pb-2 pl-2 font-weight-bold" href="/cases">CASES</A>
      </div>
      <div className="mb-2">
        <FontAwesomeIcon icon={faTasks} className="text-secondary"/>
        <A className="pb-2 pl-2 font-weight-bold" href="/tasks">TASKS</A>
      </div>
      <div className="mb-2 mt-4">
        <FontAwesomeIcon icon={faCube} className="text-secondary"/>
        <A className="pb-2 pl-2 font-weight-bold" href="/products">PRODUCTS</A>
      </div>
      <div className="mb-2">
        <FontAwesomeIcon icon={faCog} className="text-secondary"/>
        <A className="pb-2 pl-2 font-weight-bold" href="/settings">SETTINGS</A>
      </div>
    </Nav>
  </StyledNavbar>
);

export default Sidebar;

