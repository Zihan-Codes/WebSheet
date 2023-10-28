import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Table, Button, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Header from "../Header";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => { // getting all users
    try {
      const response = await axios.get("http://localhost:5000/get-users");
      const { data } = response;
      setUsers(data.allusers);
      console.log(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (tableId) => {

    // e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/tb/table-edit/${tableId}`);
      const { data } = response;
      // console.log(data);
      // console.log(data.tabledata)
      // console.log(data.tabledata.col1)
    
      setShow(true);
    }catch (error){
      console.log(error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(false);
    
    try {
      if(password === cpassword) {
        const inputData = {username: username, role: role, password: password, fullname: fullname};

      const { data } =await axios.post("http://localhost:5000/signup", {username: username, role: role, password: password, fullname: fullname}, {withCredentials: true});

        const { success, message } = data;
      if (success) {
        console.log("users saved");

        setFullname(null);
        setUsername(null);
        setRole(null);
        setPassword(null);
        setCpassword(null);

        fetchUser();
        
      } else {
        console.log("not saved")
      }
      }else {
        alert("password not match");
      }
      

    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    

    <Container className="vh-100" style={{ backgroundColor: 'lightblue' }}>
        <Header />

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mt-3" controlId="formCol1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formCol1">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formCol2">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={role} onChange={(e) => setRole(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formCol3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3" controlId="formCol3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
            </Form.Group>
            

            {/* Add more form fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col xs={12} md={12}>
        <div>
      {/* <Button onClick={goBack}>Go Back</Button> */}
      <h1>User List</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Role</th>
            {/* <th>Edit</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.fullname}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              {/* <td><Button size="sm" onClick={() => handleEdit(user._id)}>Edit</Button></td> */}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="position-fixed top-0 end-0 m-5 p-5">
          <Row>
            <Col><Button size="sm" onClick={handleShow}>Add User</Button></Col>
          </Row>      
      </div>
      
    </div>
        </Col>
      </Row>

    </Container>
  );
};

export default Dashboard;
