import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import api from '../api';
import PropertyCard from '../components/PropertyCard';

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/api/properties/${id}`);
        setProperty(res.data);

        // fetch similar properties (same location but different id)
        const similarRes = await api.get('/api/properties', {
          params: { location: res.data.location }
        });
        const filtered = similarRes.data.filter((p) => p._id !== res.data._id);
        setSimilar(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="my-5">
      {/* 🔹 Property Details */}
      <Row className="mb-5">
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={property.image}
              alt={property.title}
              style={{ objectFit: 'cover', height: '400px' }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <h2>{property.title}</h2>
          <h4 className="text-primary">₹ {property.price.toLocaleString()}</h4>
          <p><strong>Location:</strong> {property.location}</p>
          <p>{property.description}</p>
          <Button variant="success" size="lg">Contact Seller</Button>
        </Col>
      </Row>

      {/* 🔹 Similar Properties */}
      <h3 className="mb-4">Similar Properties</h3>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {similar.length > 0 ? (
          similar.map((p) => (
            <Col key={p._id}>
              <PropertyCard property={p} />
            </Col>
          ))
        ) : (
          <p>No similar properties found.</p>
        )}
      </Row>
    </Container>
  );
}
