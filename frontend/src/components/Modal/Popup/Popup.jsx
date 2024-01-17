import "./popup.style.scss";
import PropTypes from "prop-types";

export default function Popup({ closePopup, children }) {
  function close(event) {
    if (event.target === event.currentTarget) closePopup();
  }
  return (
    <>
      <div className="popup">{children}</div>
      <div className="popupBg" onClick={(e) => close(e)}></div>
    </>
  );
}

Popup.propTypes = {
  closePopup: PropTypes.func,
  children: PropTypes.node.isRequired,
};
