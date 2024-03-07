import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import NotificationListEmpty from "./NotificationListEmpty/NotificationListEmpty";
import Notification from "../notifications/Notification/Notification";
import PostCard from "../Posts/PostCard/PostCard";
import "../notifications/Notification/Notification.scss"
import "./notificationList.scss"
import { getNotifications } from "../../api/notification";

export default function NotificationList () {
    const [posts, setPosts] = useState(null);
    const {type} = useParams(); 
    useEffect(() => { getNotifications()
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
    const conditionRender = posts && posts.length !== 0
    return <>{conditionRender ? posts.map(element => {return  element.notificationType === 'comments' ?<PostCard postData={element.postData}/> :  <Notification posts = {element.posts} reaction={element.notificationType} data={element}/>}) : <NotificationListEmpty type={type}/> } </>
}
/* WebSocket */
    // const socket = useRef(new WebSocket ("ws://localhost:9000/api/notifications"));
    // function conecting () {
    //   socket.current.onopen = function(e) {
    //     alert("[open] Соединение установлено");
    //   };
    // }
    // useEffect(() => {
    //   conecting()
    // }, []);
