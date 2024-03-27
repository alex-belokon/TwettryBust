import { useEffect, useState } from "react";
import Button from "../../Buttons/Button/Button";
import NotificationWrapper from "../NotificationWrapper/NotificationWrapper";
import "./Notification.scss";
import { getPostById } from "../../../api/posts";
import { getUsersById } from "../../../api/users";
import {
  calculateTimePassed,
  getNotificationTitle,
  isEmpty,
} from "../../../utils/notificationFunction";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { getDataWithoutSeconds } from "./notificationFunction.js";
import { useSelector } from "react-redux";

export default function Notification({ reaction, posts = [], data }) { 
 const [dataInfo, setDataInfo] = useState({});
 const currentUser = useSelector((state) => {
  return state.authUser.user
 })
  useEffect(() => {
    async function fetchData() {
      let post;
      if (data.post) {
        post = await getPostById(data.post.id);
      }
      const user = await getUsersById(data.sender.id);
      setDataInfo({
        post,
        user,
        type: getNotificationTitle(data.notificationType),
      });
    }
    fetchData();
  }, []);
  
  const { post, user, type } = dataInfo;
  const createdAt = new Date(data.createdAt);
  let content;
  if (type === "subscription") {
    content = (
      <p className="notification__reaction notification__reaction--subscription">
        {type}
      </p>
    );
  }else if(type === "Replying") {
    content = <p className="notification__reaction">
    {type} to @{currentUser.userName}
  </p>
  } 
  
  
  
  else {
    const isSingleReaction = posts.length <= 1;
    const numberPosts = isSingleReaction ? "" : posts.length;
    content = (
      <>
        <p className="notification__reaction">
          {type} {numberPosts} your post
        </p>
        <div className="notification__post-wrapper">
          {post && <p className="notification__text">{post.content}</p>}
          {!isSingleReaction && (
            <Button
              className="notification__btn"
              onClick={() => console.log("test")}
            >
              Show all
            </Button>
          )}
        </div>
      </>
    );
  }

  return (
    <>
    {post && user && 
    <NotificationWrapper reaction={type}>
      {!isEmpty(dataInfo) && (
        <div className="notification__content">
          <div className="notification__top">
          <UserAvatar userName={user.username} />
          <span>{calculateTimePassed(createdAt)}</span>
          </div>
          <div className="notification__text-wrapper">
            <h3 className="notification__follower-name">{user.username}</h3>
            {content}
          </div>
        </div>
      )}
    </NotificationWrapper>
    }
    </>
  );
}
