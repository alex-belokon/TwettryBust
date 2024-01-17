import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";
import "./popup.style.scss";

export default function PopupSettings({closePopup}) {

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "LIGHT");
  const themeValue = localStorage.getItem("theme");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Popup closePopup={closePopup}>
      <label className="chooseTheme__label" htmlFor="select">Choose a theme:</label>
      <select
        className="chooseTheme__select"
        id="select"
        defaultValue={themeValue}
        onChange={(event) => setTheme(event.target.value)}
      >
        <option className="chooseTheme__option" value="LIGHT">Light</option>
        <option className="chooseTheme__option" value="DARK">Dark</option>
        <option className="chooseTheme__option" value="TURQUOISE">Turquoise</option>
        <option className="chooseTheme__option" value="BLUE">Blue</option>
      </select>
    </Popup>
  );
}


PopupSettings.propTypes = {
  closePopup: PropTypes.func,
};
