import React, { useContext } from 'react';
import { ProductsContext } from '../ProductsContext';

import Loading from '../components/Loading';
import LoadingError from '../components/LoadingError';

const ProductDetailPage = ({ name }) => {

  const [ products ] = useContext(ProductsContext);

  const Product = ({ name }) => {
    const product = products.data.find(p => p.name === name);
    if (!product) return <NoSuchProduct />;
    
    return <>
      <h4 className="text-muted font-weight-light text-uppercase mb-4">PRODUCTS / {product.spec.label}</h4>
      <div className="form-group row">
        <label htmlFor="name" className="col-md-2 col-form-label">Name:</label>
        <div className="col-md-4">
          <input id="name" disabled={true} type="text" className="form-control" value={product.spec.name}/>
        </div>
        <label htmlFor="label" className="col-md-2 col-form-label">Label:</label>
        <div className="col-md-4">
          <input id="label" disabled={true} type="text" className="form-control" value={product.spec.label}/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="description" className="col-md-2 col-form-label">Description:</label>
        <div className="col-md-10">
          <input id="description" disabled={true} type="text" className="form-control" value={product.spec.description}/>
        </div>
      </div>

      <h5 className="my-4">Components</h5>

      <div className="form-group row">
        <label htmlFor="icon" className="col-md-2 col-form-label">Icon URL:</label>
        <div className="col-md-10">
          <input id="icon" disabled={true} type="text" className="form-control" value={product.spec.icon}/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="overview" className="col-md-2 col-form-label">Overview URL:</label>
        <div className="col-md-10">
          <input id="overview" disabled={true} type="text" className="form-control" value={product.spec.overviewComponentUrl}/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="create" className="col-md-2 col-form-label">Create URL:</label>
        <div className="col-md-10">
          <input id="create" disabled={true} type="text" className="form-control" value={product.spec.createComponentUrl}/>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="detail" className="col-md-2 col-form-label">Detail URL:</label>
        <div className="col-md-10">
          <input id="detail" disabled={true} type="text" className="form-control" value={product.spec.detailComponentUrl}/>
        </div>
      </div>

      <h5 className="mt-4 mb-2">Actions</h5>
      { product.spec.actions ? <ActionTable actions={product.spec.actions} /> : <div className="text-secondary">There are no actions</div> }

    </>
  }
  
  const ActionTable = ({actions}) => (
    <table className="table bg-white">
      <thead>
        <tr>
          <th className="border-top-0" scope="col"></th>
          <th className="border-top-0 text-secondary" scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        { actions.map(a => a.view === 'separator' ? <ActionSeparator key={a}/> : <Action key={a.name} action={a}/>) }
      </tbody>
    </table>
  )

  const ActionSeparator = () => (
    <tr>
      <td colSpan="2" className="text-secondary text-center">separator</td>
    </tr>
  )

  const Action = ({action}) => (
    <tr>
      <td scope="col" className="font-weight-bold">{action.label}</td>
      <td scope="col">{action.description}</td>
    </tr>
  )

  const NoSuchProduct = () => (
    <div className="mt-5 text-center text-secondary">No, there is no such product.</div>
  )

  return (
    <div>
      {
        products.loading ? <Loading /> : 
        products.error ? <LoadingError error = { products.error }/> :  
        products.data ? <Product name={name}/> : <NoSuchProduct />
      }
    </div>  
  )
};

export default ProductDetailPage;



