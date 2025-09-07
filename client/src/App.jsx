import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Admin from './pages/Admin';
import Login from './pages/Login';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import { setAuthToken } from './api';
import ContactSeller from './pages/ContactSeller';
import AdminMessages from './pages/AdminMessages';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
  }, []);

  return (
    <>
      <AppNavbar />
      
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactSeller />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

