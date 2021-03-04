import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { adapt } from "webcomponents-in-react"

const ActionDialog = ({product, action, show, onPerform, onCancel}) => {

  const CustomDialogTag = adapt(`${product.name}-${action.name}`);
  
  return (  
    <Modal show={show} onHide={onCancel}>
      <CustomDialogTag {...action} onPerform={onPerform} onCancel={onCancel} />
    </Modal>
  )
}

export default ActionDialog;