import React from 'react';
import { useRoutes, useRedirect } from 'hookrouter';
import loadable from '@loadable/component'
import Axios from 'axios';
import { NewsProvider } from './NewsContext';

import Contents from './components/Contents';
import Header from './components/Header';

import './App.css';

const App = () => {

  const NewsPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/NewsPage'));  
  const NoPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/NoPage'));

  const routes = {
    "/news": () => <NewsPage />,
  };

  useRedirect('/', '/news');
  const RouteContainer = () => {
    return useRoutes(routes) || <NoPage />;
  };
  
  Axios.defaults.headers.common['X-Version'] = process.env.REACT_APP_VERSION;
  Axios.defaults.headers.common['X-Environment'] = process.env.NODE_ENV;
  if (process.env.REACT_APP_SERVICE_URL) {
    console.log('Using service', process.env.REACT_APP_SERVICE_URL);
  }

  return (
    <>
      <Header/>
      <NewsProvider>
        <Contents>
          <RouteContainer />
        </Contents>
      </NewsProvider>
    </>
  )
}

export default App;
