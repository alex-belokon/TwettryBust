import { NavLink } from "react-router-dom";
import './profile.style.scss'

export default function FollowList({userData}){

  return(
    <ul className="navigateList">
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="/follow/following" state={{ userId: userData.id }}>Following</NavLink>
      </li>
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="/follow/followers" state={{ userId: userData.id }}>Followers</NavLink>
      </li>
    </ul>
  )
}