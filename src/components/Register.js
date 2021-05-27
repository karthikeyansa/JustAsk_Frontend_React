import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useCookies } from "react-cookie";
import { API } from "../Apiservice";
import logo from "../assets/logo.png";
import googleLogin from "../services/googleLogin";
import GoogleLogin from "react-google-login";
import "./logreg.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mr-token"]);
  const [code, setcode] = useState(null)

  useEffect(() => {
    console.log(token);
    if (token["mr-token"]) window.location.href = "/app";
  }, [token]);

  const RegisterClicked = () => {
    API.Register({ email: email, password1: password, password2: password }).then(resp => setcode(resp.code))
      .catch((error) => console.log(error));
      console.log(code);
      alert("User registered");
  };
  console.log(email, password);

  const responseGoogle = async (response) => {
    let googleResponse = await googleLogin(response.accessToken);
    setToken("mr-token", googleResponse.key);
  };
  return (
    <React.Fragment>
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
            
          </Form>
          <Nav className="mr-auto">
            &nbsp;
            <Nav.Link href="/login">Log&nbsp;In</Nav.Link>
            &nbsp;
            <Nav.Link href="/register">Sign&nbsp;Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="container2">
        <br />
        <br />
        <center>
          <img src={logo} alt="Just Ask" width="70" height="70" />
          <br />
          <br />
          <GoogleLogin
            clientId="56429741622-6s6v93sca7nneu1cm7u3hnqijbq3q6ga.apps.googleusercontent.com"
            buttonText="Log in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
          <br />
          <br />
        </center>
        <Container className="formcontainer">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <b>E-mail</b>
              </Form.Label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicPassword">
              <Form.Label>
                <b>Password</b>
              </Form.Label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={RegisterClicked}>
              Register
            </Button>
          </Form>
        </Container>
        <br />
        <center>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </center>
      </Container>
    </React.Fragment>
  );
}

export default Register;
