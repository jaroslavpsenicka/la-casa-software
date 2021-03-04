import React, { useState } from 'react';
import { useRoutes, useRedirect } from 'hookrouter';
import loadable from '@loadable/component'
import Axios from 'axios';
import { CasesProvider } from './CasesContext';
import { ProductsProvider } from './ProductsContext';
import { RequestsProvider } from './RequestsContext';
import { AppProvider } from './AppContext';

const App = () => {

  const [ sidebarVisible, setSidebarVisible ] = useState(true);
  const [ addonViewVisible, setAddonViewVisible ] = useState(false);

  const Header = loadable(() => import(/* webpackChunkName: "components" */ './components/Header'));  
  const Contents = loadable(() => import(/* webpackChunkName: "components" */ './components/Contents'));  
  const Sidebar = loadable(() => import(/* webpackChunkName: "components" */ './components/Sidebar'));  
  const AddonContainer = loadable(() => import(/* webpackChunkName: "components" */ './components/AddonContainer'));  
  const CaseCreatePage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/CaseCreatePage'));  
  const CaseDetailPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/CaseDetailPage'));  
  const CaseActionPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/CaseActionPage'));  
  const CasesPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/CasesPage'));  
  const TasksPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/TasksPage'));  
  const ProductDetailPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/ProductDetailPage'));  
  const RequestDetailPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/RequestDetailPage'));  
  const ProductsPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/ProductsPage'));
  const SettingsPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/SettingsPage'));  
  const NoPage = loadable(() => import(/* webpackChunkName: "pages" */ './pages/NoPage'));

  const routes = {
    "/create-case/:productName": ({productName}) => <CaseCreatePage productName={productName} />,
    "/cases": () => <CasesPage />,
    "/cases/:id": ({id}) => <CaseDetailPage caseId={id} />,
    "/cases/:id/action/:name": ({id, name}) => <CaseActionPage caseId={id} name={name} />,
    "/tasks": () => <TasksPage />,
    "/requests/:id": ({id}) => <RequestDetailPage requestId={id} />,
    "/products": () => <ProductsPage />,
    "/products/:name": ({name}) => <ProductDetailPage name={name} />,
    "/settings": () => <SettingsPage />
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
      <Header toggleSidebar={() => setSidebarVisible(!sidebarVisible)} showAddonView={(show) => setAddonViewVisible(show)}/>
      <div className="d-flex">
        <ProductsProvider>
          <CasesProvider>
            <RequestsProvider>
              <Sidebar visible={sidebarVisible}/>
              <Contents>
                <RouteContainer />
              </Contents>
              <AddonContainer visible={addonViewVisible} />
            </RequestsProvider>
          </CasesProvider>
        </ProductsProvider>
      </div>  
    </AppProvider>
  )
}

export default App;
