import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={property.image} style={{ objectFit: 'cover', height: 200 }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{property.title}</Card.Title>
        <Card.Text className="mb-2 text-muted">{property.location}</Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>₹ {property.price.toLocaleString()}</strong>
          <Button as={Link} to={`/property/${property._id}`} variant="primary" size="sm">View</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
