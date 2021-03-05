import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';

const StyledLoadingImage = styled(FontAwesomeIcon)`
  width: 20px !important;
  height: 20px;
  margin: 12px auto;
`

const Updating = ({text}) => (
  <Row className="pt-3 pb-3 mb-1 text-secondary bg-white">
    <div className="m-auto">
      <StyledLoadingImage icon={faSpinner} className="fa-pulse mb-2 d-block" />
      { text ? text : 'Updating record...'}
    </div>
  </Row>
)

export default Updating;