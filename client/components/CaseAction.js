import React, { useContext } from 'react';
import { adapt } from "webcomponents-in-react"
import { navigate } from 'hookrouter';

import { CasesContext } from '../CasesContext';

const CaseAction = ({ theCase, action }) => {

  const { update } = useContext(CasesContext);

  const setAndNavigate = () => {
    update(theCase.id);
    navigate('/cases');
  }

  const CustomOverviewTag = adapt(`${theCase.product}-${action.name}`);
  return <CustomOverviewTag {...theCase.data} onSubmit={() => setAndNavigate()} onCancel={() => navigate('/cases')}/>
}

export default CaseAction;