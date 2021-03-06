import React,{useState} from "react";
import Header from "./Header";
import Homesection from "./Homesection";
import Postview from "./Postview";

function Home() {
  const [post, setpost] = useState(null);
  const [homesectionview, sethomesectionview] = useState(true);
  const [postview, setPostview] = useState(false);

  const ClickedPost = (post) => {
    setpost(post);
    sethomesectionview(false);
    setPostview(true);
  };
  return (
    <div>
      <Header />
      {homesectionview && <Homesection clickedPost={ClickedPost} />}
      {postview && <Postview post={post} />}
    </div>
  );
}

export default Home;
