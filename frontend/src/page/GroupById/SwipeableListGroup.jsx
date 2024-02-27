import { NavLink } from "react-router-dom";
import { swipeableListArrGroup } from "./swipeableListArrGroup";

export default function SwipeableListGroup() {
  return (
    <ul className="navigateList">
      {swipeableListArrGroup.map((item) => (
        <li className="navigateList__item" key={item.name} title={item.name}>
          <NavLink
            className="navigateList__link"
            to={item.link}
            state={{ flag: true }}
            preventScrollReset
            end
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
