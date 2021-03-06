import React from 'react';
import FormControl from 'react-bootstrap/FormControl';

const SearchField = ({ value, setValue }) => (
  <FormControl placeholder="type to filter" aria-label="search" className="col-sm-6"
    autoFocus value={value} onChange={(event) => setValue(event.target.value)}/>
)

export default SearchField;