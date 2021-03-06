import React, {useState} from 'react';
import Header from "./components/Header";
import Section from "./components/Section";
import Postview from "./components/Postview";
import "./App.css";

function App() {
  const [post, setpost] = useState(null);
  const [sectionview, setSectionview] = useState(true)
  const [postview, setPostview] = useState(false)

  const ClickedPost = (post) =>{
    setpost(post);
    setSectionview(false);
    setPostview(true);
  }

  return (
    <div className="App">
      <Header />
      {sectionview && <Section clickedPost={ClickedPost} />}
      {postview && <Postview post={post} />}
    </div>
  );
}

export default App;
