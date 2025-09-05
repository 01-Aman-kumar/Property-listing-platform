// src/components/Banner.jsx
import React from "react";
import { Carousel } from "react-bootstrap";

export default function Banner() {
  return (
    <Carousel fade interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury Apartment"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Find Your Dream Home</h3>
          <p>Explore luxury apartments, villas and affordable housing.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1723110994499-df46435aa4b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvcGVydGllc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Modern Villa"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Best Locations</h3>
          <p>Properties in prime areas of Noida, Delhi & NCR.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1600&q=80"
          alt="Affordable Homes"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Affordable Homes</h3>
          <p>Find properties that fit your budget.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
