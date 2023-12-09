import React, { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Modal_C from "./Modal_C";

const Modal_B = ({ data }) => {
  const { show2, handleClose2, area, contacts, setContacts } = data;
  const [selectedContact, setSelectedContact] = useState(null);

  const handlerEvenContacts = (evenContacts) => {
    const EvenContacts = evenContacts.filter((contact) => contact.id % 2 === 0);
    setContacts(EvenContacts);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const textColor = area === "All Contacts" ? "#46139f" : "#ff7f50";

  return (
    <div>
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: textColor }}>{area}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contacts.map((contact, index) => (
            <p key={index} onClick={() => handleContactClick(contact)}>
              {contact.phone}
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <InputGroup>
            <InputGroup.Text>Only even</InputGroup.Text>
            <InputGroup.Checkbox
              onClick={() => handlerEvenContacts(contacts)}
            />
          </InputGroup>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {selectedContact && (
        <Modal_C
          contact={selectedContact}
          handleCloseC={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
};

export default Modal_B;
