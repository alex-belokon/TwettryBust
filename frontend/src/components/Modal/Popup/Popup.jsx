import "./popup.style.scss";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Popup({ closePopup }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'LIGHT');

  console.log(theme);
  function close(event) {
    if (event.target === event.currentTarget) closePopup();
  }

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme)
   }, [theme])

  return (
    <>
      <div className="popup">
        <label className="chooseTheme__label" htmlFor="select">Choose a theme:</label>
        <select className="chooseTheme__select" id="select" onChange={()=>setTheme(event.target.value)}>
          <option className="chooseTheme__option" value="LIGHT">Light</option>
          <option className="chooseTheme__option" value="DARK">Dark</option>
        </select>
      </div>
      <div className="popupBg" onClick={(e) => close(e)}></div>
    </>
  );
}

Popup.propTypes = {
  closePopup: PropTypes.func,
};
