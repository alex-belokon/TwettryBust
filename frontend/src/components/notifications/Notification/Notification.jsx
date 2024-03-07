import { useEffect, useState } from "react";
import Button from "../../Buttons/Button/Button";
import NotificationWrapper from "../NotificationWrapper/NotificationWrapper";
import "./Notification.scss"
import { getPostById } from "../../../api/posts";
import { getUsersById } from "../../../api/users";
import { getNotificationTitle, isEmpty } from "../../../utils/notificationFunction";
import UserAvatar from "../../UserAvatar/UserAvatar";

export default function Notification ({reaction, posts=[], data}) {
    const [dataInfo, setDataInfo] = useState({}); console.log(data);
    useEffect(() => {
            async function fetchData() {
              // You can await here
              const post = await getPostById(data.post.id); 
              // ...
            const user = await getUsersById(data.sender.id); 
            setDataInfo({post, user, type:getNotificationTitle(data.notificationType)});
            }
            fetchData();
          }, []); 
          if (dataInfo) console.log(dataInfo); // Or [] if effect doesn't need props or state
          
    const {post, user, type} = dataInfo; console.log(post);
    const isSingleReaction = posts.length <= 1;
    const numberPosts = isSingleReaction ? "": posts.length; 
    return <NotificationWrapper reaction={reaction}>
    {!isEmpty(dataInfo) && <div className="notification__content">
    <UserAvatar userName = {user.username}/>
    
        <div className="notification__text-wrapper">
        <h3 className="notification__follower-name">{user.username}
        </h3> 
        <span className="notification__reaction">{type} {numberPosts} your post</span>
        </div>
        <p className="notification__text">{post.content}</p>
        {!isSingleReaction &&<Button className= "notification__btn" onClick={()=>console.log('test')}>Show all</Button>}
        {/* <h3 className="notification__user-name">@Viki_y_Tory</h3> */}
    </div>}
    </NotificationWrapper>
} 