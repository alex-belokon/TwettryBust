import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function SwipeableList() {

  return (
    <ul className="navigateList">
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="">Posts</NavLink>
      </li>
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="with_replies">Replies</NavLink>
      </li>
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="highlights">Highlights</NavLink>
      </li>
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="media">Media</NavLink>
      </li>
      <li className="navigateList__item">
        <NavLink className="navigateList__link" to="likes">Likes</NavLink>
      </li>
    </ul>
  );
}
