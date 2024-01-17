import PropTypes from "prop-types";
import "./modalBtn.style.scss";
export default function ModalBtn({ children, ariaLabel, btnClick }) {
  return (
    <button
      className="modalBtn"
      onClick={btnClick}
      type="button"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

ModalBtn.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  btnClick: PropTypes.func,
};
