import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { A } from 'hookrouter';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import photo from '../static/photo.jpg';

import { AppContext } from '../AppContext';

const StyledNavbar = styled(Navbar)`
  border-bottom: 1px solid lightgray;
  height: 70px;
`
const StyledToogle = styled.div`
  float: left;
  margin-left: 15px;
  margin-right: 25px;
  cursor: pointer;
  font-size: 20px;
  color: gray;
`
const StyledAddonImage = styled.img`
  width: 24px;
  height: 24px;
`

const SettingsIcon = () => (
  <A href="/settings" className="mt-1 pl-4 mr-2 border-left border-secondary">
    <FontAwesomeIcon icon={faCog} size="lg"/>
  </A>
)

const ProfileIcon = () => (
  <A href="/profile" className="ml-4 mr-2">
    <Image src={photo} roundedCircle/>
  </A>  
)

const Header = ({ toggleSidebar, showAddonView}) => {

  const { addons, selectedAddon, setSelectedAddon } = useContext(AppContext);

  const toggleAddon = (addon) => {
    if (selectedAddon !== addon) {
      setSelectedAddon(addon);
      showAddonView(true);
    } else {
      setSelectedAddon(undefined);
      showAddonView(false);
    }
  }

  const Addons = () => {
    return addons.data ? addons.data.map(a => <AddonIcon addon={a} active={a === selectedAddon} key={a.name} />) : null;  
  }

  const AddonIcon = ({ addon, active }) => (
    <A href="#" className="mt-1 pr-4" onClick={() => toggleAddon(addon)}>
      <StyledAddonImage className="text-secondary" src={active ? addon.iconSelectedUrl : addon.iconUrl} title={addon.label}/>
    </A>  
  )
  
  return (
    <StyledNavbar bg="white" sticky="top">
      <StyledToogle onClick={toggleSidebar}>
        <div className="icon-reorder tooltips" data-original-title="Toggle" data-placement="bottom">
          <FontAwesomeIcon icon={faBars} />
        </div>
      </StyledToogle>      
      <Navbar.Brand href="/cases">xCase</Navbar.Brand>
      <Nav className="ml-auto">
        <Addons />
        <SettingsIcon/>
        <ProfileIcon/>
      </Nav>
    </StyledNavbar>
  )
}

export default Header;
