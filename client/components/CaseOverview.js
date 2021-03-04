import React from 'react';

const CaseOverview = ({theCase, showOverview}) => {
  const CustomOverviewTag = `${theCase.product}-overview`;
  return showOverview ? <div className="mt-2 ml-5 mr-2 text-secondary">
    <CustomOverviewTag {...theCase.data} />
  </div> : null;
}

export default CaseOverview;