import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Table, Button, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";

const Uhome = () => {
  const [tables, setTable] = useState([]);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchTable();
  }, []);

  const fetchTable = async () => { // getting all users
    try {
      const response = await axios.get("https://web-sheet.vercel.app/tb/table");
      const { data } = response;
      setTable(data.tableData);
      console.log(data.tableData);

    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    

    <Container className="vh-100" style={{ backgroundColor: 'lightblue' }}>
        <Button onClick={handleLogout}>Logout</Button>

      <Row>
        <Col xs={12} md={12}>
        <div>
      {/* <Button onClick={goBack}>Go Back</Button> */}
      <h1>Data</h1>
      <div style={{overflowX: 'auto'}}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>Column1</th>
            <th>Column2</th>
            <th>Column3</th>
            <th>Column4</th>
            <th>Column5</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table, index) => (
            <tr key={table._id}>
              <td>{index + 1}</td>
              <td>{table.col1}</td>
              <td>{table.col2}</td>
              <td>{table.col3}</td>
              <td>{table.col4}</td>
              <td>{table.col5}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      
    </div>
        </Col>
      </Row>

    </Container>
  );
};

export default Uhome;
