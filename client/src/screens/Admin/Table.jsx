import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Table, Button, Container, Modal, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const TableData = () => {
  const [tables, setTable] = useState([]);
  const [checkupdate, setCheckupdate] = useState("");

  const [col1, setCol1] = useState("");
  const [col2, setCol2] = useState("");
  const [col3, setCol3] = useState("");
  const [col4, setCol4] = useState("");
  const [col5, setCol5] = useState("");
  const [tableIds, setTableIds] = useState("");

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setCol1(null);
    setCol2(null);
    setCol3(null);
    setCol4(null);
    setCol5(null);
    setShow(false);
  };

  useEffect(() => {
    fetchTable();
  }, []);

  const fetchTable = async () => { // getting all users
    try {
      // const response = await axios.get("http://localhost:5000/tb/table");
      const response = await axios.get("https://web-sheet.vercel.app/tb/table");
      const { data } = response;
      setTable(data.tableData);
      console.log(data.tableData);

      setCol1(null);
      setCol2(null);
      setCol3(null);
      setCol4(null);
      setCol5(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (tableId) => {
    setCheckupdate(1);
    setTableIds(null);
    // e.preventDefault();
    try {
      // const response = await axios.get(`http://localhost:5000/tb/table-edit/${tableId}`);
      const response = await axios.get(`https://web-sheet.vercel.app/tb/table-edit/${tableId}`);
      const { data } = response;
      // console.log(data);
      // console.log(data.tabledata)
      // console.log(data.tabledata.col1)
      setCol1(data.tabledata.col1);
      setCol2(data.tabledata.col2);
      setCol3(data.tabledata.col3);
      setCol4(data.tabledata.col4);
      setCol5(data.tabledata.col5);
      setTableIds(data.tabledata._id);
      setShow(true);
    }catch (error){
      console.log(error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(col1, col2, col3, col4, col5);
    setShow(false);
    // Additional submission logic
    try {
      const inputData = {col1: col1, col2: col2, col3: col3, col4: col4, col5: col5, tableIds: tableIds};
      if(checkupdate === 1){
        const { data } =await axios.post("https://web-sheet.vercel.app/tb/update-table", {inputData}, {withCredentials: true});

        const { success, message } = data;
      if (success) {
        console.log("data updated")
        fetchTable();
        
      } else {
        console.log("not update")
      }
      } else {
        const { data } =await axios.post("https://web-sheet.vercel.app/tb/savetable", {inputData}, {withCredentials: true});

        const { success, message } = data;
      if (success) {
        console.log("data saved")
        fetchTable();
        
      } else {
        console.log("not saved")
      }
      }

    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (dataId) => {
    try {
      
      await axios.delete(`https://web-sheet.vercel.app/delete-data/${dataId}`);

      console.log('User deleted successfully');
      fetchTable();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  

  return (
    

    <Container className="vh-100" style={{ backgroundColor: 'lightblue' }}>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCol1">
              <Form.Label>Column 1</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={col1} onChange={(e) => setCol1(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formCol2">
              <Form.Label>Column 2</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={col2} onChange={(e) => setCol2(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formCol3">
              <Form.Label>Column 3</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={col3} onChange={(e) => setCol3(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formCol4">
              <Form.Label>Column 4</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={col4} onChange={(e) => setCol4(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formCol5">
              <Form.Label>Column 5</Form.Label>
              <Form.Control type="text" placeholder="Enter data" value={col5} onChange={(e) => setCol5(e.target.value)} />
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
      <h1>Data</h1>
      <div style={{overflowX: 'auto'}}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th className="fixed-col"></th>
            <th>Column1</th>
            <th>Column2</th>
            <th>Column3</th>
            <th>Column4</th>
            <th>Column5</th>
            <th>Edit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table, index) => (
            <tr key={table._id}>
              <td className="fixed-col">{index + 1}</td>
              <td>{table.col1}</td>
              <td>{table.col2}</td>
              <td>{table.col3}</td>
              <td>{table.col4}</td>
              <td>{table.col5}</td>
              <td><Button size="sm" onClick={() => handleEdit(table._id)}>Edit</Button></td>
              <td><Button variant="danger" size="sm" onClick={() => deleteData(table._id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    

      <div className="position-fixed bottom-0 end-0 m-5 p-5">
          <Row>
            <Col><Button size="sm" onClick={handleShow}>Add Data</Button></Col>
          </Row>      
      </div>
      
    </div>
        </Col>
      </Row>

    </Container>
  );
};

export default TableData;
