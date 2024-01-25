import { NavLink } from "react-router-dom";
import navItems from "./navItemsArr.jsx";
import "./navigation.style.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import PopupSettings from "../../Modal/Popup/PopupSettings.jsx";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function Navigation() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userId = useSelector((state) => state.authUser.user.id);
  const { t } = useTranslation();

  return (
    <nav>
      <ul className="list">
        {navItems.map((navItem) => (
          <li className="list__item" key={navItem.link}>
            <NavLink className="list__navItem" to={navItem.link === '/profile' ? `${navItem.link}/${userId}/posts` : navItem.link }>
              {({ isActive }) => (
                <div className="list__navItemTitle">
                  {isActive ? navItem.activeIcon : navItem.icon}
                  <span
                    className={`${
                      isActive ? "list__navItemText--bold" : "list__navItemText"
                    }`}
                  >
                    {t(`${navItem.name}`)}
                  </span>
                </div>
              )}
            </NavLink>
          </li>
        ))}
        <li
          className="list__item list__navItem"
          onClick={() => setIsPopupOpen(true)}
        >
          <div className="list__navItemTitle">
            <IoSettingsOutline className="iconStyle" />
            <span className="list__navItemText">
              {t("navigation.settings")}
            </span>
          </div>
        </li>
        {isPopupOpen && (
          <PopupSettings
            closePopup={() => setIsPopupOpen(false)}
          ></PopupSettings>
        )}
      </ul>
    </nav>
  );
}
