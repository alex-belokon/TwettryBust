import { NavLink } from "react-router-dom";
import "./LinkActions.scss";

export default function LinkActions({ linksArr, userData=null }) {
  
  return (
    <ul className="navigateList">
      {linksArr.map((elem, index) => (
        <li className="navigateList__item" key={index}>
          <NavLink className="navigateList__link" to={elem.path} state={{ userData: userData }} preventScrollReset end>
            {elem.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
