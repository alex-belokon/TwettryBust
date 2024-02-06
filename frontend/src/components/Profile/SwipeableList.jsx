import { NavLink } from "react-router-dom";
import { swipeableListArr } from "./swipeableListArr";

export default function SwipeableList() {

  return (
    <ul className="navigateList">
      {swipeableListArr.map((item) => (
        <li className="navigateList__item" key={item.name} title={item.name}>
          <NavLink className="navigateList__link" to={item.link} state={{ flag: true }}  preventScrollReset end>
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
