import Posts from "../components/Posts/Posts.jsx";
import PostBtn from "../components/Posts/PostBtn/PostBtn";
import { useState } from "react";
import { useScrollToTop } from "../utils/useScrollToTop.js";
import PostContent from "../components/Posts/PostContent/PostContent.jsx";
import "./Home.scss";

export default function Home() {
  const [isFollowingActive, setIsFollowingActive] = useState(false);
  useScrollToTop();

  return (
    <>
      <PostBtn
        isFollowingActive={isFollowingActive}
        setIsFollowingActive={setIsFollowingActive}
      ></PostBtn>
      <div className="postContent__wrapper">
        <PostContent></PostContent>
      </div>
      <Posts isFollowingActive={isFollowingActive}></Posts>
    </>
  );
}
