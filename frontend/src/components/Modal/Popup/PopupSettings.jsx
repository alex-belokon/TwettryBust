import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import "./popup.style.scss";
import { useTranslation } from "react-i18next";

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
    <Popup closePopup={closePopup}>
      <div className="chooseElemWrapper">
        <label className="chooseTheme__label" htmlFor="select">
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
        </select>
      </div>
      <div className="chooseElemWrapper">
        <label className="chooseTheme__label" htmlFor="language">
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
      </div>
    </Popup>
  );
}

PopupSettings.propTypes = {
  closePopup: PropTypes.func,
};
