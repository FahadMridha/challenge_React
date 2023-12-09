import React from "react";
import { Modal, Button } from "react-bootstrap";

const Modal_C = ({ contact, handleCloseC }) => {
  return (
    <Modal
      show={contact !== null}
      onHide={handleCloseC}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>ID:</strong> {contact.id}
        </p>
        <p>
          <strong>Name:</strong> {contact.country.name}
        </p>
        <p>
          <strong>Phone:</strong> {contact.phone}
        </p>
        {/* Add more details as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseC}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modal_C;
