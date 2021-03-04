import React, { useContext } from 'react';
import styled from 'styled-components';
import { adapt } from "webcomponents-in-react"
import { navigate } from 'hookrouter';

import { AppContext } from '../AppContext';
import { CasesContext } from '../CasesContext';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';

const AddonView = styled.div`
  width: 300px;
  min-width: 300px;
  height: calc(100vh - 70px);
`

const AddonContainer = ({ visible }) => {  

  const { selectedAddon } = useContext(AppContext);
  const { selected } = useContext(CasesContext);

  const Addon = () => {
    const AddonTag = adapt(`${selectedAddon.name}-addon`);
    return (
      <>
        <h4 className="text-muted font-weight-light text-uppercase mb-4">{selectedAddon.label}</h4>
        <AddonTag id={selectedAddon.name + '-addon'} class="d-flex flex-grow-1" 
          onNavigate={({detail}) => navigate(detail)}
          serviceUrl={SERVICE_URL}
          caseId={ selected ? selected.id : undefined } />
      </>
    )
  }

  return (
    <AddonView className={ visible ? 'py-4 pr-4 pl-0 d-flex flex-column' : 'd-none' }>
      { selectedAddon ? <Addon /> : null }
    </AddonView>
  ); 
};

export default AddonContainer;

