import { NavLink } from "react-router-dom";
import './profile.style.scss'

export default function FollowList({userData}){

  return(
    <ul className="navigateList">
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="/follow/following" state={{ userData: userData }}>Following</NavLink>
      </li>
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="/follow/followers" state={{ userData: userData }}>Followers</NavLink>
      </li>
    </ul>
  )
}