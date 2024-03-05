import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { swipeableListArr, swipeableListArrCurrent } from "./swipeableListArr";
import { useSelector } from "react-redux";

export default function SwipeableList() {
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const { id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(()=>{
    setIsCurrentUser(currentUserId === id)
  }, [id])


  return (
    <ul className="navigateList">
      {(isCurrentUser ? swipeableListArrCurrent : swipeableListArr).map((item) => (
        <li className="navigateList__item" key={item.name} title={item.name}>
          <NavLink className="navigateList__link" to={item.link} state={{ flag: true }}  preventScrollReset end>
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
