import { useEffect, useState } from "react";
import Button from "../../Buttons/Button/Button";
import NotificationWrapper from "../NotificationWrapper/NotificationWrapper";
import "./Notification.scss"
import { getPostById } from "../../../api/posts";
import { getUsersById } from "../../../api/users";
import { getNotificationTitle, isEmpty } from "../../../utils/notificationFunction";
import UserAvatar from "../../UserAvatar/UserAvatar";

export default function Notification ({reaction, posts=[], data}) {
    const [dataInfo, setDataInfo] = useState({}); 
    useEffect(() => {
            async function fetchData() {
            const post = await getPostById(data.post.id); 
            const user = await getUsersById(data.sender.id); 
            setDataInfo({post, user, type:getNotificationTitle(data.notificationType)});
            }
            fetchData();
          }, []); 
         
    const {post, user, type} = dataInfo; 
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
    </div>}
    </NotificationWrapper>
} 