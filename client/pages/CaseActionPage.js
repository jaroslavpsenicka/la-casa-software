import React, { useContext } from 'react';

import CaseAction from '../components/CaseAction'
import { CasesContext } from '../CasesContext';
import { ProductsContext } from '../ProductsContext';

const CaseActionPage = ({ caseId, name }) => {

  const { cases } = useContext(CasesContext);
  const [ products ] = useContext(ProductsContext);

  const theCase = cases.data.find(c => c.id === caseId);
  const product = products.data.find(p => p.name === theCase.product);
  const action = product.spec.actions.find(a => a.name === name);
  
  return (
    <div>
      <h4 className="text-muted font-weight-light text-uppercase mb-4">CASES / {theCase.name} / {action.label}</h4>
      <CaseAction theCase={theCase} action={action}/>
    </div>
  );
};

export default CaseActionPage;
