import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationListEmpty from "./NotificationListEmpty/NotificationListEmpty";
import Notification from "../notifications/Notification/Notification";
import "../notifications/Notification/Notification.scss";
import "./NotificationList.scss";
import { getNotifications } from "../../api/notification";
import { useDispatch, useSelector } from "react-redux";
import { notificationRead } from "../../redux/chatWebSocket";
import SkeletonPost from "../../skeletons/SkeletonPost/SkeletonPost";
import { element } from "prop-types";

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

    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
       setPosts(data);

      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    
    fetchData();
    dispatch(notificationRead());
  }, [countNotification]);

  const conditionRender = posts;

  const replaying = posts?.filter(item => {
    return item.notificationType === "NEW_POST"
  })
   

const checkEmptyArray = location.pathname === "/notifications" ? posts : replaying

return (
    <>
      {!conditionRender ? (
      
        <div className="skeletonPosts__wrapper">
          {[1, 2, 3].map((item) => (
            <SkeletonPost key={item} />
          ))}
        </div>
    

      ) : (
        <>
          {location && posts.map((element, index) => ( 
            (location.pathname === "/notifications" || element.notificationType === "NEW_POST") && (
              <Notification
                key={index}
                posts={element.posts}
                reaction={element.notificationType}
                data={element}
              />
            )
          ))}
           {checkEmptyArray.length  === 0?<NotificationListEmpty type={type} /> :null}
        </>
      )}
      {location.pathname !== "/notifications" && replaying?.length === 0 && <NotificationListEmpty type={type} />}
    </>
  );
  
}
