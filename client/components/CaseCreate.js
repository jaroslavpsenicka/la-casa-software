import React, { useContext } from 'react';
import { adapt } from "webcomponents-in-react"
import { navigate } from 'hookrouter';

import { CasesContext } from '../CasesContext';

const CaseCreate = ({product}) => {

  const { create } = useContext(CasesContext);

  const setAndNavigate = (caseId) => {
    create(caseId);
    navigate('/cases');
  }

  const CustomOverviewTag = adapt(`${product.name}-create`);
  return <CustomOverviewTag {...product} onSubmit={({detail}) => setAndNavigate(detail)} />
}

export default CaseCreate;