import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const StyledLoadingImage = styled(FontAwesomeIcon)`
  width: 20px !important;
  height: 20px;
  margin: 12px auto;
`

const Loading = ({text}) => (
  <div className="mt-5 text-center text-secondary">
    <StyledLoadingImage icon={faSpinner} className="fa-pulse mb-3 d-block" />
    { text ? text : 'Loading...'}
  </div>
)

export default Loading;