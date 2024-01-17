import { NavLink } from "react-router-dom";
import navItems from "./navItemsArr.jsx";
import './navigation.style.scss';
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import PopupSettings from "../../Modal/Popup/PopupSettings.jsx";

export default function Navigation() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <nav>
      <ul>
        {navItems.map((navItem) => (
          <li className="list__item" key={navItem.name}>
            <NavLink className="list__navItem" to={navItem.link}>
              {({ isActive }) => (
                <div className="list__navItemTitle">
                  {isActive ? navItem.activeIcon : navItem.icon}
                  <span
                    className={`${
                      isActive ? "list__navItemText--bold" : "list__navItemText"
                    }`}
                  >
                    {navItem.name}
                  </span>
                </div>
              )}
            </NavLink>
          </li>
        ))}
        <li className="list__item list__navItem" onClick={()=>setIsPopupOpen(true)}>
          <div className="list__navItemTitle">
            <IoSettingsOutline className="iconStyle" />
            <span className="list__navItemText">Settings</span>
          </div>
        </li>
        {isPopupOpen && <PopupSettings closePopup = {()=>setIsPopupOpen(false)}></PopupSettings>}
      </ul>
    </nav>
  );
}
