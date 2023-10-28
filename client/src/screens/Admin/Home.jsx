import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import TableData from "./Table";
import {Button, Container} from "react-bootstrap";
import {useCookies} from "react-cookie";
import Header from "../Header";

const Home = () => {
    const navigate = useNavigate();
    // const [cookies, removeCookie] = useCookies([]);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const verifyCookie = async () => {
          if (!cookies.token) {
            navigate("/login");
          }
          console.log("no any token")
          console.log(cookies.token)
          
    
        };
        verifyCookie();
      }, [cookies, navigate]);

    return(
        <Container>
            <Header />
            <TableData />
        </Container>
    );
};

export default Home;