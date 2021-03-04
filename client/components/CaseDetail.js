import React, { useContext } from 'react';
import { adapt } from "webcomponents-in-react"
import { navigate } from 'hookrouter';

import { CasesContext } from '../CasesContext';

const CaseDetail = ({ theCase }) => {

  const { update } = useContext(CasesContext);

  const setAndNavigate = () => {
    update(theCase.id);
    navigate('/cases');
  }

  const CustomOverviewTag = adapt(`${theCase.product}-detail`);
  return <CustomOverviewTag {...theCase.data} onSubmit={() => setAndNavigate()} />
}

export default CaseDetail;