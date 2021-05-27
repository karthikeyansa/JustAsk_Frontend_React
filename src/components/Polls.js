import "./Polls.css";
import React, { useState, useEffect } from "react";
import { API } from "../Apiservice";
import { useCookies } from "react-cookie";
import moment from "moment";
import { Jumbotron, Button, Container, Col, Row, Modal, Form, FormControl } from "react-bootstrap";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Header from "./Header";
import Baseurl from "./Baseurl";
import ReactPaginate from 'react-paginate';

const baseurl = Baseurl();

function MyVerticallyCenteredModal(props) {
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

function Polls() {
  const [polls, setPolls] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [token] = useCookies(["mr-token"]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    API.Getpolls(token)
      .then((resp) => setPolls(resp))
      .catch((error) => console.log(error));
  }, [polls]);

  const pollvote = (choice, poll) =>{
    const uploadData = new FormData();
    uploadData.append("choice", choice);
      API.Pollvote(uploadData, poll, token).then(resp => console.log(resp)).catch(error => console.log(error))
      console.log("poll voted")
  }

  console.log(polls[0])

  const [pageNumber, setpageNumber] = useState(0);

  const pollsperPage = 3;
  const pagesVisited = pageNumber * pollsperPage;

  const displaypolls = polls.slice(pagesVisited, pagesVisited + pollsperPage).filter((poll)=>{
    if (searchTerm == ""){
      return poll
    }
    else if (poll.question.toLowerCase().includes(searchTerm.toLowerCase())){
      return poll
    }
    else if (poll.get_username.toLowerCase().includes(searchTerm.toLowerCase())){
      return poll
    }
  }).map((poll) => {
        return (
          <React.Fragment>
              <Container>
                  <Row>
                      <Col sm={9}>
                      <p>{poll.question}</p>
                      </Col>
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
                        /><br />Posted By:&nbsp;<span className="text-primary">{poll.get_username}</span>                         
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
                <input type="radio" name="choice" onClick={() => pollvote(poll.choice2, poll)}/>&nbsp;{poll.choice2}<br /><br />
                {poll.choice3 && (<React.Fragment><input type="radio" name="choice" onClick={() => pollvote(poll.choice3, poll)}/>&nbsp;{poll.choice3}<br /><br /></React.Fragment>)}
                {poll.choice4 && (<React.Fragment><input type="radio" name="choice" onClick={() => pollvote(poll.choice4, poll)}/>&nbsp;{poll.choice4}<br /><br /></React.Fragment>)}
                {poll.choice5 && (<React.Fragment><input type="radio" name="choice" onClick={() => pollvote(poll.choice5, poll)}/>&nbsp;{poll.choice5}<br /><br /></React.Fragment>)}
              </React.Fragment>
            )}
            Total response: {poll.total_response}
            <hr />
          </React.Fragment>
        );
  });

  const pageCount = Math.ceil(polls.length / pollsperPage);
  const changePage = ({selected}) => {
    setpageNumber(selected);
  }

  return (
    <React.Fragment>
      <Header />
      <br />
      <Container>
        <Row>
          <Col sm={10}>
            <Form inline>
              <FormControl type="text" placeholder="🔍 Search" className="mr-sm-2" onChange={event => {setsearchTerm(event.target.value)}} />
            </Form>
          </Col>
          <Col sm={2}>
            <Button
              variant="warning"
              className="pollquestion"
              onClick={() => setModalShow(true)}
            >
            Create a Poll
            </Button>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Col>
        </Row>
        <br />
        <Row>
          {/* Polls */}
          <Col>
            <Jumbotron className="pollcol4">
              <h3 className="text-success">
                <TrendingUpIcon fontSize="large" />
                &nbsp;<u>Opinion&nbsp;Polls</u>
              </h3>
              {displaypolls}
              <ReactPaginate 
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationbutton"}
                previousLinkClassName={"previousbutton"}
                nextLinkClassName={"nextbutton"}
                disabledClassName={"paginationdisabled"}
                activeClassName={"paginationActive"}
              />
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Polls;
