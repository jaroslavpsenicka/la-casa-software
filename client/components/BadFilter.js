import React from 'react';
import Image from 'react-bootstrap/Image';

import noResults from '../static/no-results.gif';

const BadFilter = () => (
  <div className="mt-5 text-center text-secondary">
    <Image src={noResults} className="d-block m-auto" />
    No news matching your criteria, try tuning the knobs.</div>
)

export default BadFilter;