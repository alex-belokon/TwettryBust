import { getRightIcon } from "./Function"
import "./NotificationWrapper.scss"

export default function NotificationWrapper ({children, reaction}) {
    const icon = getRightIcon(reaction) 
    return <div className={`notification__wrapper`}>{icon}{children}</div>
}