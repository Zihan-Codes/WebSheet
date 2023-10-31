import React, {useEffect, useState} from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";

function Header() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    // useEffect(() => {
    //     const verifyCookie = async () => {
    //       if (!cookies.token) {
    //         navigate("/login");
    //       }
          
    
    //     };
    //     verifyCookie();
    //   }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  const handleGoBack = () => {
    // Logic for going back
    navigate(-1);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Your App Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Button variant="outline-secondary" onClick={handleDashboard} className="me-auto">
            Dashboard
          </Button>
          <div className="ms-auto">
            <Button variant="outline-primary" onClick={handleGoBack} className="me-2">
              Go Back
            </Button>
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
