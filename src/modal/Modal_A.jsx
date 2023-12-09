import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Modal_B from "./Modal_B";

const Modal_A = ({ show, handleClose, region }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [area, setArea] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    // Filter contacts when searchTerm changes
    const delayDebounceFn = setTimeout(() => {
      const filtered = contacts.filter(
        (contact) =>
          contact.country.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }, 300); // Adjust the delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, contacts]);

  const handleSubmit = (params) => {
    if (params === "us-contacts") {
      fetch(
        "https://contact.mediusware.com/api/country-contacts/United%20States/?page=1"
      )
        .then((res) => res.json())
        .then((data) => {
          setContacts(data.results);
          setFilteredContacts(data.results);
          handleShow2();
        });
      setArea("United States Contacts");
      return;
    }

    fetch("https://contact.mediusware.com/api/contacts/")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.results);
        setFilteredContacts(data.results);
        handleShow2();
      });
    setArea("All Contacts");
  };

  const handleShow2 = () => {
    setShow2(true);
  };

  const handleClose2 = () => {
    setShow2(false);
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {region === "All Contacts" ? "Modal A" : "Modal B"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="searchTerm">
            <Form.Label>Search Contacts</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>

          <Button
            onClick={() => handleSubmit("all-contacts")}
            style={{ backgroundColor: "#46139f" }}
          >
            All Contacts
          </Button>
          <Button
            onClick={() => handleSubmit("us-contacts")}
            style={{ backgroundColor: "#ff7f50", margin: "10px" }}
          >
            US Contacts
          </Button>
          <Button
            style={{
              border: "2px solid #46139f",
              backgroundColor: "white",
              color: "black",
            }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Modal_B
            data={{
              show2,
              handleClose2,
              area,
              contacts: filteredContacts, // Pass filtered contacts to Modal_B
              setContacts,
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Modal_A;
