import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import api from "../api";
import PropertyCard from "../components/PropertyCard";
import Banner from "../components/Banner";   // 👈 import

export default function Home() {
  const [properties, setProperties] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = new URLSearchParams(location.search);
        const params = {};
        for (const [k, v] of q.entries()) {
          if (k === "minPrice" || k === "maxPrice") {
            const n = Number(v);
            if (!Number.isNaN(n)) params[k] = n;
          } else {
            params[k] = v;
          }
        }

        const res = await api.get("/api/properties", { params });
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties();
  }, [location.search]);

  return (
    <>
      <Banner /> {/* 👈 full width scroll banner */}

      <Container className="my-5">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {properties.length > 0 ? (
            properties.map((p) => (
              <Col key={p._id}>
                <PropertyCard property={p} />
              </Col>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </Row>
      </Container>
    </>
  );
}
