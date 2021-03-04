import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import styled from 'styled-components';

const StyledProductImage = styled.img`
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 5px auto;
`

const CreateCaseDialog = ({products, show, onAdd, onCancel}) => {

  const Product = ({ product }) => {
    return (
      <li className="list-group-item cursor-pointer hover" onClick={() => onAdd(product)}>
        <StyledProductImage src={product.icon}/>
        <div className="ml-5 text-primary">{product.label}</div>
        <div className="ml-5 text-secondary">{product.description}</div>
      </li>
    )
  }

  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>New Case</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          { products
            .filter(p => p.spec.createComponentUrl)
            .map(p => <Product product={p.spec} key={p.id} />) }
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateCaseDialog;