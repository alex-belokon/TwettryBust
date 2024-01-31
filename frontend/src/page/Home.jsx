import Posts from "../components/Posts/Posts.jsx"
import PostBtn from "../components/Posts/PostBtn/PostBtn"
import { useState } from "react";
import { useScrollToTop } from "../utils/useScrollToTop.js";


export default function Home(){
  const [isFollowingActive, setIsFollowingActive] = useState(false);
  useScrollToTop();

  return(
    <>
      <PostBtn isFollowingActive={isFollowingActive} setIsFollowingActive={setIsFollowingActive}></PostBtn>
      <Posts isFollowingActive={isFollowingActive}></Posts>
    </>
  )
}