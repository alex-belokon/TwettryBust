import { useEffect, useState } from "react";
import Button from "../../Buttons/Button/Button";
import NotificationWrapper from "../NotificationWrapper/NotificationWrapper";
import "./Notification.scss"
import { getPostById } from "../../../api/posts";
import { getUsersById } from "../../../api/users";

export default function Notification ({reaction, posts=[], data}) {
    const [dataInfo, setDataInfo] = useState(null);
    useEffect(() => {
            async function fetchData() {
              // You can await here
              const post = await getPostById("c81fd843-186e-4051-9c18-0fcc7228bc41"); 
              // ...
            const user = await getUsersById(data.sender.id); 
            setDataInfo({post, user, type:getNotificationTitle(data.notificationType)});
            }
            fetchData();
          }, []); 
          if (dataInfo) console.log(dataInfo); // Or [] if effect doesn't need props or state
          
    
    const isSingleReaction = posts.length <= 1;
    const numberPosts = isSingleReaction ? "": posts.length; 
    return <NotificationWrapper reaction={reaction}>
    {dataInfo && <div className="notification__content">
        <img className="notification__avatar" src="https://opis-cdn.tinkoffjournal.ru/mercury/main-2-midjourney-avatars.whzewv..jpg?preset=image_570w_2x" alt="" />
        <div className="notification__text-wrapper">
        <h3 className="notification__follower-name">Vikriya Yevdokimova
        </h3>
        <span className="notification__reaction">{reaction} {numberPosts} your post</span>
        </div>
        <p className="notification__text">text</p>
        {!isSingleReaction &&<Button className= "notification__btn" onClick={()=>console.log('test')}>Show all</Button>}
        {/* <h3 className="notification__user-name">@Viki_y_Tory</h3> */}
    </div>}
    </NotificationWrapper>
} 