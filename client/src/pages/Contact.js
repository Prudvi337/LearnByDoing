import { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import img1 from '../images/contact.gif'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // Add code to send form data to backend or email service
  };

  return (
    <>
      <Container fluid className="min-vh-100  d-flex align-items-center justify-content-center">
        <Row className="w-100 max-w-6xl bg-white rounded-lg shadow overflow-hidden rounded-5">
          <Col md={6} className="p-4">
            <h2 className="text-dark mb-4">Contact Us</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="message">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', height: '200px' }} 
                />
              </Form.Group>
              <Button type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </Col>
          <Col md={6} className="d-none d-md-block my-5">
            <div className="h-100 d-flex flex-column justify-content-between align-items-center">
              <img
                src={img1}
                alt="Decorative top section"
                 className="w-100 object-cover rounded-5"
  
              />
  </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
