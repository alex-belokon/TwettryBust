import { NavLink } from "react-router-dom";
import navItems from "./navItemsArr.jsx";
import './navigation.style.scss';


export default function Navigation() {
  return (
    <nav>
      <ul>
        {navItems.map((navItem) => (
          <li className="list__item" key={navItem.name}>
            <NavLink className="list__navItem" to={navItem.link}>
              {({ isActive }) => (
                <div className="list__navItemTitle">
                  {isActive ? navItem.activeIcon : navItem.icon}
                  <span className={`${isActive ? 'list__navItemText--bold' : 'list__navItemText'}`}>{navItem.name}</span>
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
