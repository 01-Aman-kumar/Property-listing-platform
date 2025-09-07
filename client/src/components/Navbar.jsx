import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';


export default function AppNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [query, setQuery] = useState('');

  // Placeholder list
  const placeholders = [
    `Search "Noida 2BHK"`,
    'Search "Delhi 3BHK" ',
    'Search "min:2000000 max:5000000" ',
    "Search by location, title or price"
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true); // start animation
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setAnimate(false); // reset after swap
      }, 500); // match animation duration
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  // Parse query
  const parseQuery = (text) => {
    const params = {};
    const regex = /\b(min|max|location|title):([\w\s]+)\b/gi;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const key = match[1].toLowerCase();
      const value = match[2].trim();
      if (key === 'min') params.minPrice = value;
      else if (key === 'max') params.maxPrice = value;
      else if (key === 'location') params.location = value;
      else if (key === 'title') params.search = value;
    }
    if (!Object.keys(params).length && text) {
      params.search = text;
    }
    return params;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = parseQuery(query);
    const urlParams = new URLSearchParams(params).toString();
    navigate(`/?${urlParams}`);
  };

  return (
    <Navbar bg="light" expand="lg" style={{ position: "sticky", top: 0, zIndex: 1020 }} className="shadow-sm py-3">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">PropertyList</Navbar.Brand>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll" className="justify-content-between">
          {/* Left */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {token && <Nav.Link as={Link} to="/admin">Add New Property</Nav.Link>}
            {token && <Nav.Link as={Link} to="/admin/messages">User Message</Nav.Link>}
          </Nav>

          {/* Center: Animated Search */}
          <Form onSubmit={handleSearch} className="mx-auto w-50">
            <InputGroup>
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                className={animate ? "placeholder-animate" : ""}
              />
              <Button type="submit" variant="primary">Search</Button>
            </InputGroup>
          </Form>

          {/* Right */}
          <Nav>
            {!token ? (
              <Nav.Link as={Link} to="/login">Admin Login</Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
