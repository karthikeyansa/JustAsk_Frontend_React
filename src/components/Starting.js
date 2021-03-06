import React from "react";
import logo from "../assets/logo.png";
import technology from "../assets/technologies.png";
import { Container, Navbar, Form, FormControl, Nav } from "react-bootstrap";
import "./Starting.css";

function Starting() {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Just Ask"
            />
          </Navbar.Brand>
          <Form className="formcontrol searchbox">
            <FormControl
              type="text"
              placeholder="🔍 Search"
              className="mr-sm-2"
              width="100%"
            />
          </Form>
          <Nav className="mr-auto">
            &nbsp;
            <Nav.Link href="/login">Log&nbsp;In</Nav.Link>
            &nbsp;
            <Nav.Link href="/register">Sign&nbsp;Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <center>
          <br />
          <img src={technology} alt="Just Ask" />
        </center>
      </Container>
    </div>
  );
}

export default Starting;
