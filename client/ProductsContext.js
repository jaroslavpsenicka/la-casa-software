import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';
const ProductsContext = createContext([{}, () => {}]);

const ProductsProvider = ({children}) => {

  const [products, setProducts] = useState({ loading: true });

  const handleProducts = (data) => {
    setProducts({ loading: false, data: data });
    data.filter(p => p.spec).map(p => registerComponents(p));
  }

  const registerProduct = (p) => {
    registerComponents(p);
    setProducts({ ...products, data: [...products.data, p]});
  }

  const registerComponents = (p) => {
    registerComponent(p.spec.overviewComponentUrl);
    registerComponent(p.spec.createComponentUrl);
    registerComponent(p.spec.detailComponentUrl);
    p.spec.actions
      .filter(a => a.view !== 'window')
      .forEach(a => registerComponent(a.componentUrl));
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
    setProducts(prev => { return { ...prev, loading: true }});
    Axios.get(SERVICE_URL + '/api/products')
      .then(response => handleProducts(response.data))
      .catch(err => setProducts({ loading: false, error: err }));
  }, []);
  
  return (
    <ProductsContext.Provider value={[products, setProducts, registerProduct]}>{children}</ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsProvider };