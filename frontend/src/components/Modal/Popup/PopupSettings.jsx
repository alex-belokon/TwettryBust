import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TbPasswordUser } from "react-icons/tb";
import { LuSunMoon } from "react-icons/lu";
import { LuLanguages } from "react-icons/lu";
import "./popup.style.scss";
export default function PopupSettings({ closePopup }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "LIGHT");
  const themeValue = localStorage.getItem("theme");
  const { t, i18n } = useTranslation();

  function handleChangeLanguage(e) {
    const newLanguage = e.target.value || "uk";
    i18n.changeLanguage(newLanguage);
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="popupSettings__wrapper">
      <Popup closePopup={closePopup} popupClass="popupClass__width popup">
        <ul>
          <li className="chooseElemWrapper">
            <label className="chooseTheme__label" htmlFor="select">
              <LuSunMoon className="popupSettings__icon" />
              {t("settings.themeTitle")}
            </label>
            <select
              className="chooseTheme__select"
              id="select"
              defaultValue={themeValue}
              onChange={(event) => setTheme(event.target.value)}
            >
              <option className="chooseTheme__option" value="LIGHT">
                {t("settings.themeLight")}
              </option>
              <option className="chooseTheme__option" value="DARK">
                {t("settings.themeDark")}
              </option>
              <option className="chooseTheme__option" value="TURQUOISE">
                {t("settings.themeTurquoise")}
              </option>
              <option className="chooseTheme__option" value="BLUE">
                {t("settings.themeBlue")}
              </option>
              <option className="chooseTheme__option" value="BUBBLEGUM">
                {t("settings.themeBubblegum")}
              </option>
            </select>
          </li>
          <li className="chooseElemWrapper">
            <label className="chooseTheme__label" htmlFor="language">
              <LuLanguages className="popupSettings__icon" />{" "}
              {t("settings.languageTitle")}
            </label>
            <select
              className="chooseTheme__select"
              id="language"
              value={i18n.language || "uk"}
              onChange={handleChangeLanguage}
            >
              <option className="chooseTheme__option" value="en">
                {t("settings.languageEn")}
              </option>
              <option className="chooseTheme__option" value="uk">
                {t("settings.languageUk")}
              </option>
            </select>
          </li>
          <li className="chooseElemWrapper">
            <Link to="/forgot-password" className="changePassword">
              <TbPasswordUser className="popupSettings__icon" />{" "}
              {t("settings.password")}
            </Link>
          </li>
        </ul>
      </Popup>
    </div>
  );
}

PopupSettings.propTypes = {
  closePopup: PropTypes.func,
};
