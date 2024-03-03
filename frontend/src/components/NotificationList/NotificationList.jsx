import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import NotificationListEmpty from "./NotificationListEmpty/NotificationListEmpty";
import Notification from "../notifications/Notification/Notification";
import PostCard from "../Posts/PostCard/PostCard";
import "../notifications/Notification/Notification.scss"
import "./notificationList.scss"
import Button from "../Buttons/Button/Button";
import { getNotifications } from "../../api/notification";

  const mockNotification = [{type : 'reposted', posts : [1, 2, 3]}, {type : 'liked'}, {type : 'comments', postData :  {
    id: 2,
    isInBookmark: true,
    likes: 555,
    postDate: new Date("2024-02-25T19:05:56.000Z"),
    reply: 1,
    repost: 0,
    text: <><h4 className="notification__user">Replying to <Button className= "notification__btn" onClick={()=>console.log('test')}>@Viki_y_Tory</Button></h4>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus inventore illo ratione quo placeat. Veritatis autem unde incidunt iste asperiores."</>,
    userLastName: "userLastName",
    userLogin: "@login",
    userName: "userName",
    userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/smile.jpg",
    view: 10000
  }}, ]
  
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
    // return <>{conditionRender ? <PostList  posts= {posts}/> : <NotificationListEmpty type={type}/> }</>
    return <>{conditionRender ? mockNotification.map(element => {return  element.type === 'comments' ?<PostCard postData={element.postData}/> :  <Notification posts = {element.posts} reaction={element.type}/>}) : <NotificationListEmpty type={type}/> }</>
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
