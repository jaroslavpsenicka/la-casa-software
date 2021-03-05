import React, { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const RecordDialog = ({record, show, onSubmit, onCancel}) => {

  const labelRef = useRef(null);
  const [ headlines, setHeadlines ] = useState(record.Headlines);
  const [ description, setDescription ] = useState(record.Description);

  return (
    <Modal show={show} onHide={onCancel} onShow={() => labelRef.current.focus()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <Form.Group as={Row}>
          <Form.Label column sm={3}>Headlines</Form.Label>
          <Col sm={9}>
            <Form.Control as="textarea" rows="3" ref={labelRef} value={headlines}
              onChange={(event) => setHeadlines(event.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Type</Form.Label>
          <Col sm={9}>
            <Form.Control as="textarea" rows="5" value={description}
              onChange={(event) => setDescription(event.target.value)} />
          </Col>
        </Form.Group>
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={() => onSubmit({ ...record, Headlines: headlines, Description: description })}>Update</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RecordDialog;