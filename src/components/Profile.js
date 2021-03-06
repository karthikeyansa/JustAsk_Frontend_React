import React, { useState, useEffect } from "react";
import {Modal, Button } from "react-bootstrap";
import "./Profile.css";
import moment from "moment";
import { useCookies } from "react-cookie";
import { API } from "../Apiservice";
import Header from "./Header";
import Baseurl from './Baseurl';

const baseurl = Baseurl();

function MyVerticallyCenteredModal(props) {
  const [password, setPassword] = useState("");
  const [token] = useCookies(["mr-token"]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.Getuser(token)
      .then((resp) => setUser(resp))
      .catch((error) => console.log(error));
  }, [user]);

  const changePassword = () => {
    API.ChangePassword({ password: password }, token)
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title className="text-danger" id="contained-modal-title-vcenter">
          Password Change
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <b>Note : </b>You are logged in as &nbsp;{user && user.get_proname}
          <br />
          <b>New password: </b>&nbsp;
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={changePassword}>Confirm</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Profile(props) {
  const [user, setUser] = useState(null);
  const [token] = useCookies(["mr-token"]);
  const [image, setImage] = useState(null);
  const [check, setCheck] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    API.Getuser(token)
      .then((resp) => setUser(resp))
      .catch((error) => console.log(error));
  }, [user]);

  useEffect(() => {
    if (!token["mr-token"]) window.location.href = "/";
  }, [token]);

  const newProfilepicture = () => {
    setCheck(false);
    const uploadData = new FormData();
    if (image) {
      uploadData.append("image", image);
    }
    API.ProfilepictureUpdate(uploadData, token["mr-token"])
      .then((resp) => setUser(resp))
      .catch((error) => console.log(error));
  };

  const deletePicture = () => {
    API.DeletePicture(token)
      .then((resp) => setUser(resp))
      .catch((error) => console.log(error));
  };

  console.log(user, "user found");
  return (
    <React.Fragment>
      <Header />
      <br />
      <br />
      <br />
      <div className="containerprofile">
        <nav>
          <h4>
            <a href="#" className="text-primary">
              Profile
            </a>
          </h4>
        </nav>
        <div className="imageupload">
          <div>
            <label htmlFor="image-file">
              <img
                src={user && baseurl + user.get_proimage}
                width="150"
                height="150"
                title="click here to change your profile picture"
                className="image"
              />
              <br />
              <br />
            </label>
            <form>
              <input
                type="file"
                id="image-file"
                onChange={(event) => {
                  setImage(event.target.files[0]);
                  setCheck(true);
                }}
                className="inputfilehidder"
                required
              />
            </form>
          </div>
        </div>
        <div className="profiledeatils">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h5>
            Username :&nbsp;&nbsp;
            <simple className="text-primary">{user && user.get_proname}</simple>
          </h5>
          <h5>
            Email :&nbsp;&nbsp;
            <simple className="text-primary">
              {user && user.get_proemail}
            </simple>
          </h5>
          <h5>
            Questions :&nbsp;&nbsp;
            <simple className="text-primary">
              {user && user.get_totalquestions}
            </simple>
          </h5>
          <h5>
            Joined&nbsp;
            <a href="/app" className="text-primary">
              JustAsk
            </a>
            &nbsp;on:&nbsp;&nbsp;
            <simple className="text-primary">
              {moment(user && user.get_datejoined).format("DD-MMM-YY")}
            </simple>
          </h5>
          <br />
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Change Password
          </Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          &nbsp;&nbsp;
          <Button variant="danger" onClick={deletePicture}>
            Remove profile picture
          </Button>
          &nbsp;&nbsp;
          {check && (
            <Button variant="primary" onClick={newProfilepicture}>
              Update Profile picture
            </Button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
