import React, { useState, useEffect } from "react";
import { Jumbotron, Button, Container, Col, Row, Modal, Form, FormControl } from "react-bootstrap";
import ModalImage from "react-modal-image";
import Truncate from "react-truncate";
import moment from "moment";
import "./Section.css";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import camera from "../assets/camera.png";
import { API } from "../Apiservice";
import { useCookies } from "react-cookie";
import Baseurl from "./Baseurl";
import "./Homesection.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from '@material-ui/icons/Create';
import ReactPaginate from 'react-paginate';

const baseurl = Baseurl();

function PostEditor(props) {
  const [editbody, setEditbody] = useState(props.post.body);
  const [edittags, setEdittags] = useState(props.post.tags);
  const [editscreenshot, setEditscreenshot] = useState(props.post.thumbnail);
  const [token] = useCookies(["mr-token"]);

  const PostUpdate = () => {
    const uploadData = new FormData();
    uploadData.append("body", editbody);
    if (editscreenshot) {
      uploadData.append("thumbnail", editscreenshot);
    }
    uploadData.append("tags", edittags);
    API.Postupdate(uploadData, token, props.post).catch((error) => console.log(error));
    setEditbody("");
    setEdittags("");
    setEditscreenshot(null);
    alert("Post Updated. Click close.");
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
          <u>Update your Question</u>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label for="title">Title</label>
        <h3 className="text-dark" id="title">{props.post.title}</h3>
        <br />
        <label for="question">Question</label>
        <textarea
          className="editor"
          id="question"
          placeholder="Type here ..."
          value={editbody}
          onChange={(event) => setEditbody(event.target.value)}
        />
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
            onChange={(event) => setEditscreenshot(event.target.files[0])}
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
          value={edittags}
          onChange={(event) => setEdittags(event.target.value)}
          required
        />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={PostUpdate}>Update your Question</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function AddNewPost(props) {
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

function Homesection(props) {
  const [posts, setPosts] = useState([]);
  const [AddPostModel, setAddPostModel] = useState(false);
  const [EditPostModel, setEditPostModel] = useState(false);
  const [token] = useCookies(["mr-token"]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    API.Userposts(token)
      .then((resp) => setPosts(resp))
      .catch((error) => console.log(error));
  }, [posts]);

  const postClicked = (post) => (event) => {
    props.clickedPost(post);
  };

  const deletepost = (post) => () =>{
    API.Deletepost(post, token).catch(error => console.log(error))
  }

  const [pageNumber, setpageNumber] = useState(0);

  const postsperPage = 3;
  const pagesVisited = pageNumber * postsperPage;

  const [changePost,setchangePost] = useState(null);
  
  const enablePostEdit = (post) => () =>{
    setEditPostModel(true);
    setchangePost(post);    
  }

  const displayPosts = posts.slice(pagesVisited, pagesVisited + postsperPage).filter((post)=>{
    if (searchTerm === ""){
      return post
    }
    else if (post.title.toLowerCase().includes(searchTerm.toLowerCase())){
      return post
    }
    else if (post.body.toLowerCase().includes(searchTerm.toLowerCase())){
      return post
    }
    else if (post.tags.toLowerCase().includes(searchTerm.toLowerCase())){
      return post
    }
  }).map((post) => {
        return (
          <React.Fragment>
            <h3 className="text-dark">{post.title}</h3>
            <br />
            <Container>
              <Row>
                <Col>
                  <span className="text-primary">
                  Asked on&nbsp;
                    {moment(post.timestamp).format("DD-MMM-YY")}
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
                <Col></Col>
                <Col></Col>
              </Row>
            </Container>
            <br />
            <Container>
              <Row>
                <Col>
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
                </Col>
              </Row>
            </Container>
            <Container>
              <Row>
                <Col>
                  <br />
                  {post.tags.split(", ").map((tag) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#"
                          className="btn btn-outline-info btn-sm"
                        >
                          {tag}
                        </a>
                        &nbsp;
                      </React.Fragment>
                    );
                  })}
                  <br /><br />
                  <DeleteForeverIcon fontSize="large" color="error" onClick={deletepost(post)}/>
                  <CreateIcon fontSize="large" color="primary" onClick={enablePostEdit(post)}/>
                  {EditPostModel && <PostEditor
                    post={changePost}
                    show={EditPostModel}
                    onHide={() => setEditPostModel(false)}
                  />}  
                </Col>
                <Col>
                  <br />
                  <span class="text-primary">
                  Posted On:&nbsp;
                    {moment(post.timestamp).format(
                      "DD-MMM-YY HH:mm"
                    )}
                  </span>
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
  });

  const pageCount = Math.ceil(posts.length / postsperPage);
  const changePage = ({selected}) => {
    setpageNumber(selected);
  }

  return (
    <React.Fragment>
      <br />
      <Container>
        <Row>
          {/* Posts */}
          <Col>
          <Row>
          <Col sm={10}>
          <Form inline>
            <FormControl type="text" placeholder="🔍 Search" className="mr-sm-2" onChange={event => {setsearchTerm(event.target.value)}} />
          </Form>
          </Col>
          <Col sm={2}>
            <Button
              variant="primary"
              className="postquestion"
              onClick={() => setAddPostModel(true)}
            >
              Ask a Question
            </Button>
            <AddNewPost
              show={AddPostModel}
              onHide={() => setAddPostModel(false)}
            />
          </Col>
          </Row>
          <br/>
            <Container className="postcol8">
              <Jumbotron>
                <h3 className="text-primary">
                  <LibraryBooksIcon fontSize="large" />
                  &nbsp;<u>Your Questions</u>
                </h3>
                <br />
                <React.Fragment>
                  <Container>
                    {displayPosts}
                  </Container>
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
                </React.Fragment>
              </Jumbotron>
            </Container>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Homesection;
