import React from 'react';
import { useRoutes, useRedirect } from 'hookrouter';
import loadable from '@loadable/component'
import Axios from 'axios';
import { CasesProvider } from './CasesContext';
import { AppProvider } from './AppContext';

const App = () => {

  const Header = loadable(() => import(/* webpackChunkName: "components" */ './components/Header'));  
  const Contents = loadable(() => import(/* webpackChunkName: "components" */ './components/Contents'));  
  const CasesPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/CasesPage'));  
  const NoPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/NoPage'));

  const routes = {
    "/cases": () => <CasesPage />,
  };

  useRedirect('/', '/cases');
  const RouteContainer = () => {
    return useRoutes(routes) || <NoPage />;
  };
  
  Axios.defaults.headers.common['X-Version'] = process.env.REACT_APP_VERSION;
  Axios.defaults.headers.common['X-Environment'] = process.env.NODE_ENV;
  if (process.env.REACT_APP_SERVICE_URL) {
    console.log('Using service', process.env.REACT_APP_SERVICE_URL);
  }

  return (
    <AppProvider>
      <Header/>
      <CasesProvider>
        <Contents>
          <RouteContainer />
        </Contents>
      </CasesProvider>
    </AppProvider>
  )
}

export default App;
