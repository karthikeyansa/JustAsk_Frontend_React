import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "./Header.css";
import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { API } from "../Apiservice";

function Header(props) {
  const [loginview] = useState(true);
  const [token, deleteToken, removeToken] = useCookies(["mr-token"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
      API.Getuser(token).then((resp) => setUser(resp)).catch(error => console.log(error))
  }, []);

  const logout = () =>{
    API.Logout(token).then(resp => console.log(resp)).catch(error => console.log(error))
    deleteToken(["mr-token"])
    removeToken(["mr-token"])
    window.location.href ='/'
  }

  return (
    <React.Fragment>
      {/* logged in */}
      {loginview && (
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/app">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Just Ask"
              />
            </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Nav.Link href="/polls">Polls</Nav.Link>
            </Nav>
            <Form className="formcontrol">
              <FormControl
                type="text"
                width="100%"
                placeholder="🔍 Search"
                className="mr-sm-2"
              />
            </Form>
            <Nav className="mr-auto">
              {user && (
                <Nav.Link href="/profile">{user.get_proname}</Nav.Link>
              )}
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
    </React.Fragment>
  );
}

export default Header;
