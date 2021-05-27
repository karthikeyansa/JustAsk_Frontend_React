import React, { useState, useEffect } from "react";
import "./Postview.css";
import { Container, Jumbotron, Row, Col, Alert, Toast, InputGroup, FormControl } from "react-bootstrap";
import moment from "moment";
import ModalImage from "react-modal-image";
import { API } from "../Apiservice";
import camera from "../assets/camera.png";
import { useCookies } from "react-cookie";
import NavigationIcon from "@material-ui/icons/Navigation";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SendIcon from '@material-ui/icons/Send';
import Safe from 'react-safe';
import Baseurl from "./Baseurl";

const baseurl = Baseurl();

function Postview(props) {
  const [comments, setComments] = useState([]);
  const [newcomment, setNewcomment] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [post, setPost] = useState(null);
  const [token] = useCookies(["mr-token"]);

  useEffect(() => {
    API.Getuser(token)
      .then((resp) => setUser(resp))
      .catch((error) => console.log(error));
  }, []);

  useEffect(()=>{
    if(user){
      API.Getchats(props.post, token).then(resp => setChats(resp)).catch(error => console.log(error))
    }
  },[chats, user])

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
  
    const sendMessage = () => {
      const uploadData = new FormData();
      uploadData.append("body", input);
      API.Newchat(uploadData, props.post, token)
      .then((resp) => setChats(resp))
      .catch((error) => console.log(error));
      setInput("");
    }

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
        <Container>
          <Row>
            {/* post */}
            <Col sm={8}>
              <Container className="layout">
                <Row className="justify-content-md-center">
                  <Col>
                    <Jumbotron>
                    <br />
                    <h2 className="text-dark">{props.post.title}</h2>
                    <br />
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
                          <br />
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
                              {props.post.tags.split(", ").map((tag) => {
                                return (
                                  <React.Fragment>
                                    <a href="#" className="btn btn-outline-danger btn-sm">
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
                            <br />
                            <simple>Posted By: </simple>
                            <br />
                            <img
                              src={baseurl + props.post.get_userpic}
                              className="profilepic"
                              height="50"
                              width="50"
                            />
                            <br />
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
                          {comments && comments.map((comment, i) => {
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
                                          <br />
                                          <simple>Answered by: </simple>
                                          <br />
                                          <img
                                            src={baseurl + comment.get_userpic}
                                            className="profilepic"
                                            height="50"
                                            width="50"
                                          />
                                          <br />
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
                                              <br />
                                              <simple>Answered by: </simple>
                                              <br />
                                              <img
                                                src={baseurl + comment.get_userpic}
                                                className="profilepic"
                                                height="50"
                                                width="50"
                                              />
                                              <br />
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
                <h6 className="text-muted">
                  <i>
                    This is a WYSIWYG Textpad.
                  </i>
                </h6>
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
            </Col>
          
            {/* Chat */}
            
            <Col sm={4} lg={4} md={4}>
              <Jumbotron className="container">
                <Alert variant="primary" style={{textAlign:"center"}}>JustAsk Channel</Alert>
                  <Container fluid="true" className="chatstyle" >
                    {chats && chats.map((chat) =>{
                      if(chat.get_username === user.get_proname){
                        return (
                              <React.Fragment>
                                  <Toast style={{width:'50%',right:'0',position:'absolute'}}>
                                    <Toast.Header closeButton={false} closeLabel="" style={{backgroundColor:"blue",color:"white"}}>
                                      <strong className="mr-auto">{chat.get_username}</strong>
                                    </Toast.Header>
                                  <Toast.Body>{chat.body}</Toast.Body>
                                </Toast>
                                <div className="row">&nbsp;</div>
                                <div className="row">&nbsp;</div>
                                <div className="row">&nbsp;</div>
                                <div className="row">&nbsp;</div>                                
                              </React.Fragment>
                              )
                            }
                      else{
                          return (
                            <React.Fragment>
                                <Toast style={{width:'50%'}}>
                                  <Toast.Header closeButton={false} closeLabel="" style={{backgroundColor:"green",color:"white"}}>
                                    <strong className="mr-auto">{chat.get_username}</strong>
                                  </Toast.Header>
                                <Toast.Body>{chat.body}</Toast.Body>
                              </Toast>
                              <div className="row">&nbsp;</div>                              
                            </React.Fragment>
                          )
                        }
                        })}
                  </Container>
                
                  <br />
            
                  <InputGroup className="input-group mb-3">
                    <FormControl
                      placeholder="Type here..."
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={input} 
                      onChange={event => setInput(event.target.value)}
                      required
                    />&nbsp;
                    <InputGroup.Append>
                    <SendIcon color="primary" fontSize="large" onClick={sendMessage}/>
                    </InputGroup.Append>
                  </InputGroup>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
    </React.Fragment>
  );
}

export default Postview;
