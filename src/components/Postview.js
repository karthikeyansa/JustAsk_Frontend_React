import React, { useState, useEffect } from "react";
import "./Postview.css";
import { Container, Jumbotron, Row, Col } from "react-bootstrap";
import moment from "moment";
import ModalImage from "react-modal-image";
import { API } from "../Apiservice";
import camera from "../assets/camera.png";
import { useCookies } from "react-cookie";
import NavigationIcon from "@material-ui/icons/Navigation";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Safe from 'react-safe';
import Baseurl from "./Baseurl";


const baseurl = Baseurl();

function Postview(props) {
  const [comments, setComments] = useState([]);
  const [newcomment, setNewcomment] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [token] = useCookies(["mr-token"]);

  useEffect(() => {
    API.Getselectedpost(props.post, token)
      .then((resp) => setPost(resp))
      .catch((error) => console.log(error));
  }, [post]);

  useEffect(() => {
    API.GetCommentspost(props.post, token)
      .then((resp) => setComments(resp))
      .catch((error) => console.log("error", error));
  }, [comments]);

  useEffect(() => {
    API.Getuser(token)
      .then((resp) => setUser(resp))
      .catch((error) => console.log(error));
  }, []);

  const commentSubmit = () => {
    const uploadData = new FormData();
    uploadData.append("body", newcomment);
    if (screenshot) {
      uploadData.append("thumbnail", screenshot);
    }
    API.Commentsubmit(uploadData, props.post, token)
      .then((resp) => setComments(resp))
      .catch((error) => console.log(error));
    setNewcomment("");
    setScreenshot(null);
  };

  const unlikepost = () => {
    API.Postlike({ action: "unlike" }, props.post, token).catch((error) =>
      console.log(error)
    );
    console.log("post unliked");
  };
  const likepost = () => {
    API.Postlike({ action: "like" }, props.post, token).catch((error) =>
      console.log(error)
    );
    console.log("post liked");
  };
  const likecomment = (comment) => {
    API.CommentLike({ action: "like" }, comment, token).catch((error) =>
      console.log(error)
    );
    console.log("comment liked");
  };
  const unlikecomment = (comment) => {
    API.CommentLike({ action: "unlike" }, comment, token).catch((error) =>
      console.log(error)
    );
    console.log("comment unliked");
  };
  const deletecomment = (comment) => {
    API.CommentDelete(comment, token).catch((error) => console.log(error));
    console.log("comment deleted");
  };
  return (
    <React.Fragment>
      <br />
      <Container className="layout">
        <Row className="justify-content-md-center">
          <Col>
            <Jumbotron>
              <br />
              <h2 className="text-dark">{props.post.title}</h2>
              <br className="brhalf" />
              <Container>
                <Row>
                  <Col>
                    <simple className="text-primary">
                      Asked on&nbsp;
                      {moment(props.post.timestamp).format("DD-MMM-YY")}
                    </simple>
                  </Col>
                  <Col>
                    {post && (
                      <span className="text-success">
                        Suggestions: {post.commentcount}
                      </span>
                    )}
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
              </Container>
              <br />
              <Container fluid>
                <Row>
                  <Col>
                    <h4>{props.post.body}</h4>
                  </Col>
                </Row>
              </Container>
              <Container>
                <React.Fragment>
                  <br className="brhalf" />
                  {props.post.thumbnail !== null && (
                    <ModalImage
                      small={baseurl + props.post.thumbnail}
                      large={baseurl + props.post.thumbnail}
                      alt="post screenshot"
                      className="postThumbnail"
                    />
                  )}
                </React.Fragment>
              </Container>
              <br />
              <Container>
                <Row>
                  <Col>
                    <p>
                      <NavigationIcon
                        className="navigateleft text-muted"
                        onClick={unlikepost}
                      />
                      &nbsp;
                      {post && (
                        <span className="text-primary">
                          {post.likecount} Votes{" "}
                        </span>
                      )}
                      &nbsp;
                      <NavigationIcon
                        className="navigateright text-muted"
                        onClick={likepost}
                      />
                    </p>
                    <simple className="text-muted">Tags :</simple>
                    {props.post.tags.split(", ").map((tag) => {
                      return (
                        <React.Fragment>
                          <a href="/" className="btn btn-outline-danger btn-sm">
                            {tag}
                          </a>
                          &nbsp;
                        </React.Fragment>
                      );
                    })}
                  </Col>
                  <Col>
                    <br />
                    <simple className="text-primary">
                      Asked on&nbsp;
                      {moment(props.post.timestamp).format("DD-MMM-YY")}
                    </simple>
                  </Col>
                  <Col>
                    <br className="brhalf" />
                    <simple>Posted By: </simple>
                    <br />
                    <img
                      src={baseurl + props.post.get_userpic}
                      className="profilepic"
                      height="50"
                      width="50"
                    />
                    <br className="brhalf" />
                    <simple className="text-primary">
                      {props.post.get_username}
                    </simple>
                  </Col>
                </Row>
              </Container>
              <hr />
              <h4>
                <u className="text-success">Suggestions</u>
              </h4>
              <br />
              <Container>
                <Row>
                  {comments &&
                    comments.map((comment, i) => {
                      if (comment.thumbnail) {
                        return (
                          <React.Fragment>
                            <Safe.p>{comment.body}</Safe.p>
                            <ModalImage
                              small={baseurl + comment.thumbnail}
                              large={baseurl + comment.thumbnail}
                              alt="comment screenshot"
                              className="postThumbnail"
                            />
                            <br />
                            <Container>
                              <Row>
                                <Col>
                                  <br />
                                  <NavigationIcon
                                    className="navigateleft text-muted"
                                    onClick={() => unlikecomment(comment)}
                                  />
                                  &nbsp;
                                  <span className="text-primary">
                                    {comment.commentlike} Votes &nbsp;
                                  </span>
                                  <NavigationIcon
                                    className="navigateright text-muted"
                                    onClick={() => likecomment(comment)}
                                  />
                                  <br />
                                  <br />
                                  {/* Delete comment */}
                                  {user.id === comment.author && (
                                    <React.Fragment>
                                      <DeleteForeverIcon
                                        color="error"
                                        fontSize="large"
                                        onClick={() => deletecomment(comment)}
                                      />
                                    </React.Fragment>
                                  )}
                                </Col>
                                <Col>
                                  <br />
                                  <span className="text-primary">
                                    Replied on:{" "}
                                    {moment(comment.timestamp).format(
                                      "DD-MMM-YY"
                                    )}
                                  </span>
                                </Col>
                                <Col>
                                  <br className="brhalf" />
                                  <simple>Answered by: </simple>
                                  <br />
                                  <img
                                    src={baseurl + comment.get_userpic}
                                    className="profilepic"
                                    height="50"
                                    width="50"
                                  />
                                  <br className="brhalf" />
                                  <simple className="text-primary">
                                    {comment.get_username}
                                  </simple>
                                </Col>
                              </Row>
                              <br />
                            </Container>
                            <hr />
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment>
                            <Safe.p key={i}>{comment.body}</Safe.p>
                            <Container>
                              <Row>
                                <Col>
                                  <br />
                                  <NavigationIcon
                                    className="navigateleft text-muted"
                                    onClick={() => unlikecomment(comment)}
                                  />
                                  &nbsp;
                                  <span className="text-primary">
                                    {comment.commentlike} Votes &nbsp;
                                  </span>
                                  <NavigationIcon
                                    className="navigateright text-muted"
                                    onClick={() => likecomment(comment)}
                                  />
                                  <br />
                                  <br />
                                  {/* Delete comment */}
                                  {user.id === comment.author && (
                                    <React.Fragment>
                                      <DeleteForeverIcon
                                        color="error"
                                        fontSize="large"
                                        onClick={() => deletecomment(comment)}
                                      />
                                    </React.Fragment>
                                  )}
                                </Col>
                                <Col>
                                  <br />
                                  <span className="text-primary">
                                    Replied on:{" "}
                                    {moment(comment.timestamp).format(
                                      "DD-MMM-YY"
                                    )}
                                  </span>
                                </Col>
                                <Col>
                                  <br className="brhalf" />
                                  <simple>Answered by: </simple>
                                  <br />
                                  <img
                                    src={baseurl + comment.get_userpic}
                                    className="profilepic"
                                    height="50"
                                    width="50"
                                  />
                                  <br className="brhalf" />
                                  <simple className="text-primary">
                                    {comment.get_username}
                                  </simple>
                                </Col>
                              </Row>
                              <br />
                            </Container>
                            <hr />
                          </React.Fragment>
                        );
                      }
                    })}
                </Row>
              </Container>
            </Jumbotron>
          </Col>
        </Row>
        <label htmlFor="textarea">Your Suggestion</label>
        <br />
        <br />
        <textarea
          className="editor"
          id="textarea"
          placeholder="Type here ..."
          value={newcomment}
          onChange={(event) => setNewcomment(event.target.value)}
        />
        <div className="imageupload">
          <label htmlFor="file-input">
            Upload a Screenshot
            <br />
            <img src={camera} alt="camera" height="75" width="75" />
          </label>
          <input
            type="file"
            id="file-input"
            className="imageinput"
            onChange={(event) => setScreenshot(event.target.files[0])}
          />
          <br />
          <h6 className="text-muted">
            <i>
              uploaded image will be seen once you complete posting your
              suggestion.
            </i>
          </h6>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button onClick={commentSubmit} className="btn btn-primary">
          Submit
        </button>
        &nbsp;
        <a href="/app" className="btn btn-danger">
          Back
        </a>
        <br />
        <br />
        <br />
      </Container>
    </React.Fragment>
  );
}

export default Postview;
