import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';
const CasesContext = createContext([{}, () => {}]);

const CasesProvider = ({children}) => {

  const [cases, setCases] = useState({ loading: true });
  const [selected, setSelected] = useState();
  const [creating, setCreating] = useState();
  const [updating, setUpdating] = useState();

  const create = (caseId) => {
    if (caseId) {
      setCreating(caseId);
      setTimeout(checkCreating, 2000, caseId);
    }
  }

  const update = (caseId) => {
    if (caseId) {
      setUpdating(caseId);
      setTimeout(checkUpdating, 2000, caseId);
    }
  }

  const checkCreating = (caseId) => {
    Axios.get(SERVICE_URL + '/api/creating/' + caseId)
      .then(response => created(response.data))
      .catch(err => setTimeout(checkCreating, 1000));
  }

  const checkUpdating = (caseId) => {
    Axios.get(SERVICE_URL + '/api/updating/' + caseId)
      .then(response => updated(response.data))
      .catch(err => setTimeout(checkUpdating, 1000));
  }

  const created = (newCase) => {
    setCreating(false);
    setCases({ ...cases, data: [newCase, ...cases.data]})  
  }

  const updated = (updatedCase) => {
    setUpdating(false);
    setCases({ ...cases, data: cases.data.map(c => {
      return c.id === updatedCase.id ? updatedCase : c;
    })})  
  }

  useEffect(() => {
    setCases(prev => { return { ...prev, loading: true }});
    Axios.get(SERVICE_URL + '/api/cases')
      .then(response => setCases({ loading: false, data: response.data }))
      .catch(err => setCases({ loading: false, error: err }));
  }, []);

  return (
    <CasesContext.Provider value={{
      cases, setCases, 
      selected, setSelected,
      creating, create, 
      updating, update}}>{children}</CasesContext.Provider>
  );
}

export { CasesContext, CasesProvider };