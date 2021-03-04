import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt as faListAlt0 } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faAngleDown, faListAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ProductsContext } from '../ProductsContext';
import { CasesContext } from '../CasesContext';
import { navigate, A} from 'hookrouter';
import Dropdown from 'react-bootstrap/Dropdown';

import Loading from '../components/Loading';
import LoadingError from '../components/LoadingError';
import Search from '../components/Search';
import CaseOverview from '../components/CaseOverview';
import CreateCaseDialog from '../components/CreateCaseDialog';
import ActionDialog from '../components/ActionDialog';

import styled from 'styled-components';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';

const StyledProductImage = styled.img`
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 5px auto;
`
const StyledLoadingImage = styled(FontAwesomeIcon)`
  position: absolute;
  width: 20px !important;
  height: 20px;
  margin: 12px 5px;
`
const MarginDropdownMenu = styled(Dropdown.Menu)`
  margin: 0 !important;
`

const CasesPage = () => {

  const [ showOverview, setShowOverview ] = useState(false);
  const { cases, creating, updating, update } = useContext(CasesContext);
  const [ products ] = useContext(ProductsContext);
  const [ showCreateCaseDialog, setShowCreateCaseDialog ] = useState(false);
  const [ removeDialog, setRemoveDialog ] = useState(false);
  const [ customDialogs, setCustomDialogs ] = useState({});

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" className="p-2" ref={ref} onClick={e => { e.preventDefault(); onClick(e) }}>
      <FontAwesomeIcon icon={faAngleDown} size="lg" />
      {children}
    </a>
  ));

  const createCase = (product) => {
    setShowCreateCaseDialog(false);
    navigate('/create-case/' + product.name);
  }

  const setShowAction = (theCase, action, show) => {   
    switch (action.view) {
      case 'dialog':
        const values = {...customDialogs};
        values[action.name] = show;
        setCustomDialogs(values);
        break;
      case 'window':
        const url = action.componentUrl
          .replace('${SERVICE_URL}', SERVICE_URL)
          .replace('${CASE_ID}', theCase.id)
        window.open(url);
        break;
      default:
        navigate('/cases/' + theCase.id + '/action/' + action.name);
        break;
    }
  }

  const NoCases = () => (
    <div className="mt-5 text-center text-secondary">No, there are no cases of this kind.</div>
  )

  const CaseActions = ({theCase}) => {
    const product = products.data.find(p => p.name === theCase.product);
    const items = product.spec.actions ? product.spec.actions.map(a => {
      return a.view === 'separator' ? <Dropdown.Divider key='-'/> : <CaseAction theCase={theCase} action={a} key={a.name}/>
    }) : null;

    return (
      <Dropdown className="float-right cursor-pointer">
        <Dropdown.Toggle as={CustomToggle}></Dropdown.Toggle>
        <MarginDropdownMenu>{items}</MarginDropdownMenu>
      </Dropdown>
    )
  }

  const CaseAction = ({theCase, action}) => {
    return <Dropdown.Item key={action.name} onClick={() => setShowAction(theCase, action, true)}>{action.label}</Dropdown.Item>
  }

  const CaseRow = ({theCase}) => {
    const product = products.data && products.data.find(p => p.name === theCase.product);
    return product ? <CaseRowKnownProduct product={product} theCase={theCase} /> : <CaseRowUnknownProduct theCase={theCase} />;
  }

  const CaseRowKnownProduct = ({product, theCase}) => {
    const dialogActions = product.spec.actions ? product.spec.actions.filter(a => a.view === 'dialog') : [];
    return (
      <div className="p-2 pl-3 mb-1 bg-white text-secondary">
        <CaseActions theCase={theCase} />
        <div className="mr-5">
          <A href={`/products/${product.name}`}>
            <StyledProductImage src={product.spec.icon} />
          </A>
          <h5 className="text-ellipsis pr-3 ml-5 mb-0 text-primary">
            <A href={`/cases/${theCase.id}`}>{theCase.name}</A>
          </h5>
          <div className="text-secondary ml-5">{theCase.description ? theCase.description : 'No description.'}</div>
        </div>
        <CaseOverview theCase={theCase} showOverview={showOverview} className="mt-2"/>
        <CaseDialogs theCase={theCase} product={product} actions={dialogActions} />
      </div>
    )
  }

  const CaseRowUnknownProduct = ({theCase}) => (
    <div className="p-2 pl-3 mb-1 bg-white text-secondary">
      <div className="mr-5">
        <StyledProductImage src="/none.svg" />
        <h5 className="text-ellipsis pr-3 ml-5 mb-0 text-secondary">{theCase.name}</h5>
        <div className="text-secondary ml-5">{theCase.description ? theCase.description : 'No description.'}</div>
      </div>
      <CaseOverview theCase={theCase} className="mt-2"/>
    </div>
  )

  const CreatingCaseRow = () => (
    <div className="p-2 pl-3 mb-1 bg-white text-secondary">
      <div className="mr-5">
        <StyledLoadingImage icon={faSpinner} className="fa-pulse" />
        <h5 className="text-ellipsis pr-3 ml-5 mb-0 text-secondary">The case is being created...</h5>
        <div className="text-secondary ml-5">Please wait while the case detail is loading.</div>
      </div>
    </div>
  )

  const UpdatingCaseRow = () => (
    <div className="p-2 pl-3 mb-1 bg-white text-secondary">
      <div className="mr-5">
        <StyledLoadingImage icon={faSpinner} className="fa-pulse" />
        <h5 className="text-ellipsis pr-3 ml-5 mb-0 text-secondary">The case is being updated...</h5>
        <div className="text-secondary ml-5">Please wait while the case detail is loading.</div>
      </div>
    </div>
  )

  const CaseDialogs = ({theCase, product, actions}) => {
    return actions.map(a => <ActionDialog 
      key={a.name} 
      product={product} 
      action={a} 
      show={customDialogs[a.name]} 
      onCancel={() => setShowAction(theCase, a, false)}
      onPerform={() => { 
        setShowAction(theCase, a, false); 
        update(theCase.id);
      }}/>
    ); 
  }

  const Cases = ({ cases }) => {
    const caseRows = cases.map(c => updating === c.id ? <UpdatingCaseRow key={c.id} /> : <CaseRow theCase={c} key={c.id} />);
    if (creating) caseRows.unshift(<CreatingCaseRow key="0"/>)
    return caseRows;
  }
  
  return (
    <div>
      <h4 className="text-muted font-weight-light text-uppercase mb-4">
        <FontAwesomeIcon icon={faPlus} className="mr-2 float-right cursor-pointer text-success"
          title="Add new case"
          onClick={() => setShowCreateCaseDialog(true)}/>
        <FontAwesomeIcon icon={showOverview ? faListAlt : faListAlt0} className="mr-4 float-right cursor-pointer text-secondary"
          title="Toggle case overview"
          onClick={() => setShowOverview(!showOverview)}/>
        Cases
      </h4>
      <div className="text-secondary">The page shows list of cases of various types.</div>
      <CreateCaseDialog 
        products={products ? products.data : undefined}
        show={showCreateCaseDialog} 
        onAdd={(product) => createCase(product)} 
        onCancel={() => setShowCreateCaseDialog(false)}/>      
      <Search/>
      {
        cases.loading ? <Loading /> : 
        cases.error ? <LoadingError error = { cases.error }/> :  
        cases.data ? <Cases cases={cases.data}/> : 
        <NoCases />
      }
    </div>  
  )
};

export default CasesPage;
