import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./screens/Admin/Home";
import Login from "./screens/Auth/Login";
import Dashboard from "./screens/Admin/Dashboard";
import Uhome from "./screens/User/Home";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <h2>Header</h2>
    //   </header>
    //   <Home />
    // </div>
    <BrowserRouter>
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
         <Route path="/admin-home" element={<Home />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/user-home" element={<Uhome />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
