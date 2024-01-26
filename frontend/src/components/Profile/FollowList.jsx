import { NavLink } from "react-router-dom";
import './profile.style.scss'

export default function FollowList(){

  return(
    <ul className="navigateList">
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="/follow/following">Following</NavLink>
      </li>
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="/follow/followers">Followers</NavLink>
      </li>
    </ul>
  )
}