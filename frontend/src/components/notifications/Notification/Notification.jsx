import { useEffect, useState } from "react";
import Button from "../../Buttons/Button/Button";
import NotificationWrapper from "../NotificationWrapper/NotificationWrapper";
import "./Notification.scss";
import { getPostById } from "../../../api/posts";
import { getUsersById } from "../../../api/users";
import {
  calculateTimePassed,
  getNotificationTitle,
  hideEmail,
  isEmpty,
} from "../../../utils/notificationFunction";
import UserAvatar from "../../UserAvatar/UserAvatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Notification({ posts = [], data }) { 
const [dataInfo, setDataInfo] = useState({});
const { t } = useTranslation();
const currentUser = useSelector((state) => {
  return state.authUser.user
 })
  useEffect(() => {
    async function fetchData() {
      let post;
      if (data.post) {
        post = await getPostById(data.post?.id);
      }
      const user = await getUsersById(data.sender.id);
      
      setDataInfo({
        post,
        user,
       
      });
    }
    fetchData();
  }, []);

  const { post, user={}} = dataInfo;
  const createdAt = new Date(data.createdAt);
  let content;
  
      const typeT =getNotificationTitle (data.notificationType)
      const type = t(typeT);
      if (typeT === 'notification.sub') {
    content = (
      <p className="notification__reaction notification__reaction--subscription">
        {type}
      </p>
    );
  }else if(typeT === 'notification.rep') {
    content = ( 
    <>
      <p className="notification__reaction">
      {type} <Link
        to={`/profile/${currentUser.id}`}
        className={
         
            "contentCard__textDecoration"
          }
          >@{currentUser.userName}</Link>
      </p>
      <div className="notification__post-wrapper">
          {post && <p className="notification__text">{post.content}</p>}
          <Link
          to={`/post/${data.post?.id}`} 
          className="notification__btn"
          >
           {t ("notification.buttonText")}
          </Link>
      </div>
      </> 
   )
    
  } 
  else {
    const isSingleReaction = posts.length <= 1;
    const numberPosts = isSingleReaction ? "" : posts.length;
    content = (
      <>
        <p className="notification__reaction">
          {type} {numberPosts} 
        </p>
        <div className="notification__post-wrapper">
          {post && <p className="notification__text">{post.content}</p>}
          {!isSingleReaction && (
            <Button
              className="notification__btn"
              onClick={() =>{}}
            >
              {t ("notification.buttonText")}
            </Button>
          )}
        </div>
      </>
    );
  }

  const {lastName,firstName, avatar, email=""}=user;
  const userName = firstName || lastName ? `${firstName} ${lastName}` : hideEmail(email);
  const [time, translateString] = calculateTimePassed(createdAt);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  
  return (
    <>
    { !isEmpty(dataInfo) && 
      <NotificationWrapper reaction={typeT}> 
          <div className="notification__content">
          <div className="notification__top">
          <Link
        to={`/profile/${data.sender.id}`}
        className={
         
            "contentCard__textDecoration"
          }
          >
           <UserAvatar userAvatar={avatar} userName={userName}/>
          </Link>
          <span className="notification__time">{`${time instanceof Date?time.toLocaleString(t("notification.time.format"),options):time} ${t(translateString)}`}</span>
          </div>
          <div className="notification__text-wrapper">
          <Link
        to={`/profile/${data.sender.id}`}
        className={
         
            "contentCard__textDecoration"
          }
          >
            <h3 className="notification__follower-name">{userName}</h3>
            </Link>
            
            {content}
          </div>
        </div>
        </NotificationWrapper>
      }
    </>
  );
}
