import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationListEmpty from "./NotificationListEmpty/NotificationListEmpty";
import Notification from "../notifications/Notification/Notification";
import PostCard from "../Posts/PostCard/PostCard";
import "../notifications/Notification/Notification.scss";
import "./NotificationList.scss";
import { getNotifications } from "../../api/notification";

export default function NotificationList() {
  const [posts, setPosts] = useState(null);
  const { type } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications();
        setPosts(data);
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };
    fetchData();
  }, []);

  const conditionRender = posts && posts.length !== 0;
console.log(posts)
  return (
    <>
      {conditionRender ? (
        posts.map((element) =>
          element.notificationType === "comments" ? (
            <PostCard postData={element.postData} />
          ) : (
            <Notification
              posts={element.posts}
              reaction={element.notificationType}
              data={element}
            />
          )
        )
      ) : (
        <NotificationListEmpty type={type} />
      )}
    </>
  );
}
