import "./popup.style.scss";
import PropTypes from "prop-types";

export default function Popup({ closePopup, children, position = false }) {
  function close(event) {
    if (event.target === event.currentTarget) closePopup();
  }

  const popupClass = position ? "popup popupRight" : "popup";

  return (
    <>
      <div className={popupClass}>{children}</div>
      <div className="popupBg" onClick={(e) => close(e)}></div>
    </>
  );
}

Popup.propTypes = {
  closePopup: PropTypes.func,
  children: PropTypes.node.isRequired,
};
