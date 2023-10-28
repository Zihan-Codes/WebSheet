import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {Card, Form, Col, Row, Button, Container} from 'react-bootstrap';

// import loginimg from "../../images/loginimg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputValue;
  const [passwordError, setPasswordError] = useState('');

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const { data } = await axios.post(
        "http://localhost:5000/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, userType } = data;
      if (success) {
        console.log(message)

        if(userType === "admin"){
            navigate("/admin-home")
        }else {
            navigate("/user-home");
        }
        
        
      } else {
        console.log(message)
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      username: "",
      password: "",
    });
  };




  return (

    <Container className="vh-100" style={{ backgroundColor: 'lightblue' }}>
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} md={4}>
        <Card>
        <Card.Body className="login-card-body">
          <h1 className="text-center">Welcome</h1>
          <Card.Title className="text-center">Sign into your account</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" onChange={handleOnChange} placeholder="Enter username" required />
            </Form.Group>
            <Form.Group className="mt-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleOnChange} placeholder="Password" required />
            </Form.Group>
            <Form.Group className="text-center mt-3">
            <Button variant="primary" type="submit" className="login-button w-50">
              Login
            </Button>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-between mt-3">
            <Form.Check type="checkbox" label="Remember me" />
            <Card.Link href="#">Forgot password?</Card.Link>
          </div>
          <hr />

        </Card.Body>
      </Card>
        </Col>
      </Row>
    </Container>
    
  );
};

export default Login;
