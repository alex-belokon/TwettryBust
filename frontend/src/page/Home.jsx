import Posts from "../components/Posts/Posts.jsx"
import PostBtn from "../components/Posts/PostBtn/PostBtn"
import { useEffect, useState } from "react";
import { useScrollToTop } from "../utils/useScrollToTop.js";
import PostContent from "../components/Posts/PostContent/PostContent.jsx";
import './Home.scss';
import { useSelector } from "react-redux";
import Button from "../components/Buttons/Button/Button.jsx";

export default function Home() {
  const [isFollowingActive, setIsFollowingActive] = useState(false);
  const notificationCounter = useSelector((state) =>{
    return state.chatWebSocket.unReadNotification;
  });
  useScrollToTop();
  useEffect(()=> {
  console.log(notificationCounter);
  }, [notificationCounter]); 
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
      {notificationCounter&&<Button>{notificationCounter}</Button>}
    </>
  );
}
