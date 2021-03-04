import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';
const AppContext = createContext([{}, () => {}]);

const AppProvider = ({children}) => {

  const [addons, setAddons] = useState({ loading: true });
  const [editors, setEditors] = useState({ loading: true });
  const [selectedAddon, setSelectedAddon] = useState();

  const handleAddons = (response) => {
    setAddons({ loading: false, data: response.data });
    response.data.forEach(a => registerComponent(a.componentUrl));
  }

  const handleEditors = (response) => {
    setEditors({ loading: false, data: response.data });
    response.data.forEach(a => registerComponent(a.componentUrl));
  }

  const registerComponent = (url) => {
    if (url) {
      console.log('Registering component', url);
      var script = document.createElement('script');
      script.setAttribute('src', url);
      document.body.appendChild(script);  
    }
  }

  useEffect(() => {
    Axios.get(SERVICE_URL + '/api/addons')
      .then(response => handleAddons(response))
      .catch(err => setAddons({ loading: false, error: err }));
    Axios.get(SERVICE_URL + '/api/editors')
      .then(response => handleEditors(response))
      .catch(err => setEditors({ loading: false, error: err }));
  }, []);

  return (
    <AppContext.Provider value={{addons, setAddons, selectedAddon, setSelectedAddon, editors}}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };