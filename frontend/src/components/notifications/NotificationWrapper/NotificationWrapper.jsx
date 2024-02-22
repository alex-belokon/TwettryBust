import { FaRegHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";
import "./NotificationWrapper.scss"

export default function NotificationWrapper ({children, reaction}) {
    return <div className={`notification__wrapper`}><FaRegHeart/>{children}</div>
}