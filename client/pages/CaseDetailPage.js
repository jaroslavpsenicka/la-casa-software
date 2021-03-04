import React, { useContext, useEffect } from 'react';

import CaseDetail from '../components/CaseDetail'
import { CasesContext } from '../CasesContext';

const CaseDetailPage = ({ caseId }) => {

  const { cases, setSelected } = useContext(CasesContext);

  const theCase = cases.data.find(c => c.id === caseId);
  
  useEffect(() => {
    setSelected(theCase);
  }, [])

  return (
    <div>
      <h4 className="text-muted font-weight-light text-uppercase mb-4">CASES / {theCase.name}</h4>
      <CaseDetail theCase={theCase} />
    </div>
  );
};

export default CaseDetailPage;
