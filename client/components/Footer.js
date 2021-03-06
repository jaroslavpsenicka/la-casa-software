import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { NewsContext } from '../NewsContext';

const Footer = ({ totalRecords }) => {

  const { loadNextPage } = useContext(NewsContext);

  return (
    <Row className="mt-3">
      <div className="col-sm-6 pl-0 text-secondary">Total {totalRecords} records.</div>
      <div className="col-sm-6 pr-0">
        <Button className="btn-default float-right" onClick={() => loadNextPage()}>Next Page</Button>
      </div>
    </Row>
  )
}

export default Footer 
