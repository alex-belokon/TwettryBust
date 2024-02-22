import NotificationWrapper from "../NotificationWrapper/NotificationWrapper";
import "./Notification.scss"

export default function Notification ({reaction}) {
    return <NotificationWrapper >
    <div className="notification__content">
        <img className="notification__avatar" src="https://opis-cdn.tinkoffjournal.ru/mercury/main-2-midjourney-avatars.whzewv..jpg?preset=image_570w_2x" alt="" />
        <p className="notification__follower-name">Vikriya Yevdokimova
        <span className="notification__reaction">{reaction} your post</span></p>
        <p className="notification__text">text</p>
        {/* <h3 className="notification__user-name">@Viki_y_Tory</h3> */}
    </div>
    </NotificationWrapper>
} 