import React, { useState, useEffect } from "react";
import { Jumbotron, Button, Container, Col, Row, Modal } from "react-bootstrap";
import Truncate from "react-truncate";
import moment from "moment";
import "./Section.css";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import camera from "../assets/camera.png";
import { API } from "../Apiservice";
import { useCookies } from "react-cookie";
import Baseurl from "./Baseurl";

const baseurl = Baseurl();

function MyVerticallyCenteredModal(props) {
  const [title, setTitle] = useState("");
  const [newpost, setNewpost] = useState("");
  const [tags, setTags] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [token] = useCookies(["mr-token"]);

  const PostSubmit = () => {
    const uploadData = new FormData();
    uploadData.append("title", title);
    uploadData.append("body", newpost);
    if (screenshot) {
      uploadData.append("thumbnail", screenshot);
    }
    uploadData.append("tags", tags);
    API.Postsubmit(uploadData, token).catch((error) => console.log(error));
    setTitle("");
    setNewpost("");
    setTags("");
    setScreenshot(null);
    alert("Post Published. Click close or add another post.");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <u>Ask a Public Question</u>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Your title ..."
          className="form-control"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <br />
        <label for="question">Question</label>
        <textarea
          className="editor"
          id="textarea"
          placeholder="Type here ..."
          value={newpost}
          onChange={(event) => setNewpost(event.target.value)}
        />
        <div className="imageupload">
          <label for="file-input">
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
          <h6 class="text-muted">
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
        <label for="tags">Tags</label>
        <input
          type="text"
          className="form-control"
          id="tags"
          title="Tags ..."
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          required
        />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={PostSubmit}>Post your Question</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function MyVerticallyCenteredModal2(props) {
  const [question, setQuestion] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");
  const [choice5, setChoice5] = useState("");
  const [token] = useCookies(["mr-token"]);

  const PollSubmit = () => {
    const uploadData = new FormData();
    uploadData.append("question", question);
    uploadData.append("choice1", choice1);
    uploadData.append("choice2", choice2);
    if (choice3) {
      uploadData.append("choice3", choice3);
    }
    if (choice4) {
      uploadData.append("choice4", choice4);
    }
    if (choice5) {
      uploadData.append("choice5", choice5);
    }
    API.Pollsubmit(uploadData, token).catch((error) => console.log(error));
    alert("Poll Published. Go and cast your vote.");
    setQuestion("");
    setChoice1("");
    setChoice2("");
    setChoice3("");
    setChoice4("");
    setChoice5("");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <u>Create a Poll</u>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label for="question">Question</label>
        <textarea
          className="editor"
          id="textarea"
          placeholder="Your question ..."
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <br />
        <hr />
        <br />
        <label for="Choice1">Choice1</label>
        <input
          type="text"
          className="form-control"
          id="choice1"
          title="choice1"
          value={choice1}
          onChange={(event) => setChoice1(event.target.value)}
          required
        />
        <br />
        <label for="Choice2">Choice2</label>
        <input
          type="text"
          className="form-control"
          id="choice2"
          title="choice2"
          value={choice2}
          onChange={(event) => setChoice2(event.target.value)}
          required
        />
        <br />
        <label for="Choice3">Choice3</label>
        <input
          type="text"
          className="form-control"
          id="choice3"
          title="choice3"
          value={choice3}
          onChange={(event) => setChoice3(event.target.value)}
          required
        />
        <br />
        <label for="Choice4">Choice4</label>
        <input
          type="text"
          className="form-control"
          id="choice4"
          title="choice4"
          value={choice4}
          onChange={(event) => setChoice4(event.target.value)}
          required
        />
        <br />
        <label for="Choice5">Choice5</label>
        <input
          type="text"
          className="form-control"
          id="choice5"
          title="choice5"
          value={choice5}
          onChange={(event) => setChoice5(event.target.value)}
          required
        />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={PollSubmit}>Post your Poll</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Section(props) {
  const [posts, setPosts] = useState([]);
  const [poll, setPoll] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [token] = useCookies(["mr-token"]);

  useEffect(() => {
    console.log("token", token);
    API.Getposts(token)
      .then((resp) => setPosts(resp))
      .catch((error) => console.log(error));
  }, [posts]);

  useEffect(() => {
    API.Latestpoll(token)
      .then((resp) => setPoll(resp))
      .catch((error) => console.log(error));
  }, [poll]);
  
  console.log(posts);

  const postClicked = (post) => (event) => {
    props.clickedPost(post);
  };

  const pollvote = (choice, poll) =>{
    const uploadData = new FormData();
    uploadData.append("choice", choice);
      API.Pollvote(uploadData, poll, token).then(resp => console.log(resp)).catch(error => console.log(error))
      console.log("poll voted")
  }

  return (
    <React.Fragment>
      <Container>
        <br />
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Ask a Question
            </Button>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            &nbsp;&nbsp;
            <Button variant="warning" onClick={() => setModalShow2(true)}>
              Create a Poll
            </Button>
            <MyVerticallyCenteredModal2
              show={modalShow2}
              onHide={() => setModalShow2(false)}
            />
          </Col>
        </Row>
      </Container>
      <br />
      <Container>
        <Row>
          {/* Posts */}
          <Col sm={8}>
            <Container className="postcol8">
              <Jumbotron>
                <h3 className="text-primary">
                  <LibraryBooksIcon fontSize="large"/>
                  &nbsp;<u>Top Questions</u>
                </h3>
                <br />
                <React.Fragment>
                  <Container>
                    {posts &&
                      posts.map((post, i) => {
                        return (
                          <React.Fragment>
                            <h3 className="text-dark">{post.title}</h3>
                            <br />
                            <Container>
                              <Row>
                                <Col>
                                  <span className="text-primary">
                                  Asked on&nbsp;
                                    {moment(post.timestamp).format("MMM-YY")}
                                  </span>
                                </Col>
                                <Col>
                                  <span className="text-success">
                                    Suggestions: {post.commentcount}
                                  </span>
                                </Col>
                                <Col>
                                  <span className="text-primary">
                                    Votes: {post.likecount}
                                  </span>
                                </Col>
                                
                              </Row>
                            </Container>
                            <br />

                            <h5
                              className="text-dark"
                              title="Click to view"
                              onClick={postClicked(post)}
                            >
                              <Truncate
                                lines={2}
                                ellipsis={
                                  <span>
                                    ...
                                    <ImportContactsIcon />
                                  </span>
                                }
                              >
                                {post.body}
                              </Truncate>
                            </h5>
                            <Container>
                              <Row>
                                <Col>
                                  <br />
                                  {post.tags.split(", ").map((tag) => {
                                    return (
                                      <React.Fragment>
                                        <a
                                          href="/"
                                          className="btn btn-outline-danger btn-sm"
                                        >
                                          {tag}
                                        </a>
                                        &nbsp;
                                      </React.Fragment>
                                    );
                                  })}
                                </Col>
                                <Col>
                                </Col>
                                <Col>
                                  <br className="brhalf" />
                                  <span>Posted By: </span>
                                  <br />
                                  <img
                                    src={baseurl + post.get_userpic}
                                    className="profilepic"
                                    height="50"
                                    width="50"
                                  />
                                  <br className="brhalf" />
                                  <p className="text-primary">
                                    {post.get_username}
                                  </p>
                                </Col>
                              </Row>
                            </Container>
                            <hr />
                          </React.Fragment>
                        );
                      })}
                  </Container>
                </React.Fragment>
              </Jumbotron>
            </Container>
          </Col>
          {/* Polls */}
          <Col sm={4}>
            <Jumbotron className="pollcol4">
              <h3 className="text-success">
                <TrendingUpIcon fontSize="large"/>
                &nbsp;<u>Opinion&nbsp;Polls</u>
              </h3>
              {poll && (
                <React.Fragment>
                <Container>
                    <Row>
                        <Col sm={9}>
                        <p>{poll.question}</p>
                        </Col>
                    </Row>
                </Container>                      
              {/* Poll completed */}
              {poll.completed === true && (
                <React.Fragment>
                  <br />
                  <div style={{width:"30%"}}><b>(A)&nbsp;{poll.choice1}</b><span className="text-muted">&nbsp;({poll.choice1_total})</span><br /><br className="brhalf"/>
                  <div style={{display:"flex"}}>
                  <div style={{display:"inline-block", backgroundColor:"blue" ,width:`calc(101% - ${poll.choice1_wid}%)`}}>&nbsp;</div><b>&nbsp;{poll.choice1_val}&nbsp;%</b>
                  </div>
                  </div><br />
                  <div style={{width:"30%"}}><b>(B)&nbsp;{poll.choice2}</b><span className="text-muted">&nbsp;({poll.choice2_total})</span><br /><br className="brhalf"/>
                  <div style={{display:"flex"}}>
                  <div style={{display:"inline-block", backgroundColor:"red" ,width:`calc(101% - ${poll.choice2_wid}%)`}}>&nbsp;</div><b>&nbsp;{poll.choice2_val}&nbsp;%</b>
                  </div>
                  </div><br />
                  {poll.choice3 && (
                  <React.Fragment>
                  <div style={{width:"30%"}}><b>(C)&nbsp;{poll.choice3}</b><span className="text-muted">&nbsp;({poll.choice3_total})</span><br /><br className="brhalf"/>
                  <div style={{display:"flex"}}>
                  <div style={{display:"inline-block", backgroundColor:"orange" ,width:`calc(101% - ${poll.choice3_wid}%)`}}>&nbsp;</div><b>&nbsp;{poll.choice3_val}&nbsp;%</b>
                  </div>
                  </div><br />
                  </React.Fragment>
                  )}
                  {poll.choice4 && (
                  <React.Fragment>
                  <div style={{width:"30%"}}><b>(D)&nbsp;{poll.choice4}</b><span className="text-muted">&nbsp;({poll.choice4_total})</span><br /><br className="brhalf"/>
                  <div style={{display:"flex"}}>
                  <div style={{display:"inline-block", backgroundColor:"purple" ,width:`calc(101% - ${poll.choice4_wid}%)`}}>&nbsp;</div><b>&nbsp;{poll.choice4_val}&nbsp;%</b>
                  </div>
                  </div><br />
                  </React.Fragment>
                  )}
                   {poll.choice5 && (
                  <React.Fragment>
                  <div style={{width:"30%"}}><b>(E)&nbsp;{poll.choice5}</b><span className="text-muted">&nbsp;({poll.choice5_total})</span><br /><br className="brhalf"/>
                  <div style={{display:"flex"}}>
                  <div style={{display:"inline-block", backgroundColor:"lightgreen" ,width:`calc(101% - ${poll.choice5_wid}%)`}}>&nbsp;</div><b>&nbsp;{poll.choice5_val}&nbsp;%</b>
                  </div>
                  </div><br />
                  </React.Fragment>
                  )}
                </React.Fragment>
              )}
              {/* Poll notcompleted */}
              {poll.completed === false && (
                <React.Fragment>
                  <input type="radio" name="choice" onClick={() => pollvote(poll.choice1, poll)}/>&nbsp;{poll.choice1}<br /><br />
                  <input type="radio" name="choice" onClick={() => pollvote(poll.choice1, poll)}/>&nbsp;{poll.choice1}<br /><br />
                  {poll.choice3 && (<React.Fragment><input type="radio" name="choice" onClick={() => pollvote(poll.choice1, poll)}/>&nbsp;{poll.choice1}<br /><br /></React.Fragment>)}
                  {poll.choice4 && (<React.Fragment><input type="radio" name="choice" onClick={() => pollvote(poll.choice1, poll)}/>&nbsp;{poll.choice1}<br /><br /></React.Fragment>)}
                  {poll.choice5 && (<React.Fragment><input type="radio" name="choice" onClick={() => pollvote(poll.choice1, poll)}/>&nbsp;{poll.choice1}<br /><br /></React.Fragment>)}
                </React.Fragment>
              )}
              Total response: {poll.total_response}
              <hr />
              <Col>
                Ends On:&nbsp;
                <span className="text-primary">                
                    {moment(poll.ends_by).format("DD-MMM-YY HH:mm")}
                    </span><br />                           
                    <img
                    src={baseurl + poll.get_userpic}
                    className="profilepic"
                    height="50"
                    width="50"
                    /><br />By:&nbsp;<span>{poll.get_username}</span>                         
                </Col>
            </React.Fragment>
              )}
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Section;
