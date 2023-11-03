import React, {useEffect, useState} from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import {useCookies} from "react-cookie";

function Header() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    document.cookie = "token=myToken; SameSite=None; Secure";

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
      <div className="d-flex w-100 justify-content-between">
        {/* Left-aligned button for larger screens */}
        <Button variant="outline-secondary" onClick={handleDashboard} className="d-none d-lg-block">
          Dashboard
        </Button>

        {/* Centered "Dashboard" button for mobile view */}
        <Button variant="outline-secondary" onClick={handleDashboard} className="d-lg-none me-2">
          Dashboard
        </Button>

        {/* Centered "Go Back" button for mobile view */}
        <Button variant="outline-primary" onClick={handleGoBack} className="d-lg-none me-2">
          Go Back
        </Button>

        {/* Centered "Logout" button for mobile view */}
        <Button variant="outline-danger" onClick={handleLogout} className="d-lg-none">
          Logout
        </Button>

        {/* Right-aligned buttons for larger screens */}
        <div className="d-none d-lg-flex">
          <Button variant="outline-primary" onClick={handleGoBack} className="me-2">
            Go Back
          </Button>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}

export default Header;
