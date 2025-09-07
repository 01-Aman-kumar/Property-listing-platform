import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';

export default function Admin() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    image: '',
    description: ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        price: Number(form.price),
        location: form.location,
        image: form.image,
        description: form.description
      };
      setValidated(true);
      await api.post('/api/properties', payload);
      setMsg('Property added successfully');
      
      setForm({ title:'', price:'', location:'', image:'', description:'' });
      navigate("/")
    } catch (err) {
      console.error(err.response.data.message);
      setMsg(err.response.data.message);
    }
    
  };

  return (
    <Card className="p-4 mx-auto" style={{ maxWidth: 760 }}>
      <h4>Add New Property</h4>
      {msg && <div className="alert alert-info">{msg}</div>}
      <Form onSubmit={handleSubmit}  noValidate validated={validated}  >
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={form.title} onChange={handleChange} required/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" value={form.price} onChange={handleChange} required/>
          <Form.Control.Feedback type="invalid">
            Price should be valid.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" value={form.location} onChange={handleChange} required/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid location.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Image URL</Form.Label>
          <Form.Control name="image" value={form.image} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} required/>
          <Form.Control.Feedback type="invalid">
            Please provide Best description.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Add Property</Button>
      </Form>
    </Card>
  );
}
