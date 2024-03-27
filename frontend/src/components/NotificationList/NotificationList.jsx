import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationListEmpty from "./NotificationListEmpty/NotificationListEmpty";
import Notification from "../notifications/Notification/Notification";
import PostCard from "../Posts/PostCard/PostCard";
import "../notifications/Notification/Notification.scss";
import "./NotificationList.scss";
import { getNotifications } from "../../api/notification";
import { useDispatch, useSelector } from "react-redux";
import { notificationRead } from "../../redux/chatWebSocket";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";

export default function NotificationList() {
  const [posts, setPosts] = useState(null);
  const countNotification = useSelector((state) => state.chatWebSocket.unReadNotification);
  const { type } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => { 
    const fetchData = async () => {
      try {
        let data = await getNotifications();
      
        setPosts(prev=>{
          return data
        //     if (location.pathname !== "/notifications") {
        //   return data.filter(el => el.notificationType === "NEW_POST") 
        // }else{return    data}
          
          
      });
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    
    fetchData();
    dispatch(notificationRead());
  }, [countNotification, location]);
  
  const conditionRender = posts && posts.length !== 0;

  return (
    <>
     {!conditionRender && (
          <div className="skeletonPosts__wrapper">
            {[1, 2, 3].map((item) => (
              <SkeletonPost key={item}></SkeletonPost>
            ))}
          </div>
        )}
      {conditionRender ? (
        posts.map((element) =>{
          console.log(element)
          return <Notification
              posts={element.posts}
              reaction={element.notificationType}
              data={element}
            />
        }
          
        )
      ) : (
        <NotificationListEmpty type={type} />
      )}
    </>
  );
}
