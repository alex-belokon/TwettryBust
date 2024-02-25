import Button from "../../Buttons/Button/Button";
import NotificationWrapper from "../NotificationWrapper/NotificationWrapper";
import "./Notification.scss"

export default function Notification ({reaction, posts=[1, 2, 3]}) {
    const isSingleReaction = posts.length <= 1;
    const numberPosts = isSingleReaction ? "": posts.length; 
    return <NotificationWrapper reaction={reaction}>
    <div className="notification__content">
        <img className="notification__avatar" src="https://opis-cdn.tinkoffjournal.ru/mercury/main-2-midjourney-avatars.whzewv..jpg?preset=image_570w_2x" alt="" />
        <div className="notification__text-wrapper">
        <h3 className="notification__follower-name">Vikriya Yevdokimova
        </h3>
        <span className="notification__reaction">{reaction} {numberPosts} your post</span>
        </div>
        <p className="notification__text">text</p>
        {!isSingleReaction &&<Button className= "notification__btn" onClick={()=>console.log('test')}>Show all</Button>}
        {/* <h3 className="notification__user-name">@Viki_y_Tory</h3> */}
    </div>
    </NotificationWrapper>
} 