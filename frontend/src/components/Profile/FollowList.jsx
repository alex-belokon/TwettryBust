import { NavLink } from "react-router-dom";
import './profile.style.scss'

export default function FollowList({userId}){

  return(
    <ul className="navigateList">
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="/follow/following" state={{ userId: userId }}>Following</NavLink>
      </li>
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="/follow/followers" state={{ userId: userId }}>Followers</NavLink>
      </li>
    </ul>
  )
}