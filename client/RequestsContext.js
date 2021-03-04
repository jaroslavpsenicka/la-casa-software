import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';
const RequestsContext = createContext([{}, () => {}]);

const RequestsProvider = ({children}) => {

  const [requests, setRequests] = useState({ loading: true });

  useEffect(() => {
    Axios.get(SERVICE_URL + '/api/requests')
      .then(response => setRequests({ loading: false, data:response.data }))
      .catch(err => setRequests({ loading: false, error: err }));
  }, []);
  
  return (
    <RequestsContext.Provider value={[requests, setRequests]}>{children}</RequestsContext.Provider>
  );
}

export { RequestsContext, RequestsProvider };