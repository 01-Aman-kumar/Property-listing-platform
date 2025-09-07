import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  ListGroup,
  Spinner,
} from "react-bootstrap";

const ContactSeller = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // success, danger, info
  const [loading, setLoading] = useState(false); // spinner state

  const adminDetails = {
    name: "Aryan Kumar",
    email: "admin@example.com",
    phone: "+91 9508042263",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setStatus("Sending message...");
  setStatusType("info");

  try {
    const { data } = await api.post("/api/contact-seller", formData);

    setStatus(data.message || "Message sent successfully!");
    setStatusType("success");
    setFormData({ name: "", email: "", message: "" });
    // navigate("/");
  } catch (err) {
    if (err.response && err.response.data?.error) {
      setStatus(err.response.data.error);
    } else {
      setStatus("Server error. Try again later.");
    }
    setStatusType("danger");
  } finally {
    setLoading(false);
  }
};

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4 rounded">
            <h1 className="text-center mb-4">Contact Seller</h1>

            {/* Admin Details */}
            <Card className="mb-4">
              <Card.Header as="h5">Admin Contact Details</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Name:</strong> {adminDetails.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {adminDetails.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone:</strong> {adminDetails.phone}
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {/* Contact Form */}
            <Card className="p-4">
              <h4 className="mb-3">Send a Message to Seller</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 d-flex align-items-center justify-content-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </Form>

              {status && (
                <Alert variant={statusType} className="mt-3">
                  {status}
                </Alert>
              )}
            </Card>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactSeller;
