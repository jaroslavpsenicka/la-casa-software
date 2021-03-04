import React, { useContext, useRef } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { navigate } from 'hookrouter';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Loading from '../components/Loading';
import LoadingError from '../components/LoadingError';
import { ProductsContext } from '../ProductsContext';

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';

const ProductsPage = () => {

  const [ products, setProducts, registerProduct ] = useContext(ProductsContext);
  const inputFile = useRef(null); 

  const onUpload = (event) => {
    if (event.target.name === "file") {
      const formData = new FormData();
      const baseUrl = window.location.protocol + '//' + window.location.hostname + (location.port ? ':' + location.port : '');
      formData.append('baseUrl', baseUrl)
      formData.append('file', event.target.files[0], event.target.files[0].name);
      axios.post(SERVICE_URL + '/api/products', formData)
        .then(resp => registerProduct(resp.data))
        .catch(err => console.log(err));
      }
  }

  const Products = ({ products }) => {
    return products.map(p => <ProductCard product={p} key={p.id} />);
  }

  const NoProducts = () => (
    <div className="mt-5 text-center text-secondary">No, there is no product registered, use the plus-sign to upload a product description file.</div>
  );

  const ProductCard = ({ product }) => (
    <Col md={6} lg={4} xl={3}>
      <Col md={12} className="h-150px b-2-ddd p-2 pl-3 mb-4 bg-white text-dark rounded-lg">
        <div className="col-md-10 cursor-pointer" onClick={() => navigate('/products/' + product.name)}>
          <h5 className="pt-2 text-primary">{product.spec.label ? product.spec.label : product.name}</h5>
          <div className="h-100px text-secondary">{product.spec.description ? product.spec.description : 'No description.'}</div>
        </div>
      </Col>
    </Col>
  )

  return (  
    <div>
      <input type="file" name="file" id="file" ref={inputFile} className="d-none" 
        onChange={(event) => onUpload(event)} />
      <h4 className="w-100 text-muted font-weight-light text-uppercase mb-4 mr-3">
        <FontAwesomeIcon icon={faPlus} className="mr-2 float-right cursor-pointer text-success"
          onClick={() => inputFile.current.click()}/>
        Products
      </h4>
      <div className="text-secondary">The page shows list of registered products.</div>
      <Row className="mt-4">
        { 
          products.loading ? <Loading /> : 
          products.error ? <LoadingError error = { products.error }/> :  
          products.data ? <Products products = { products.data }/> : 
          <NoProducts />
        }
      </Row>
    </div>
  )
};

export default ProductsPage;
