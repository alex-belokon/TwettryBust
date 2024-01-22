import PropTypes from "prop-types";
import "./modalBtn.style.scss";

export default function ModalBtn({
  children,
  ariaLabel,
  btnClick,
  additionalClass,
}) {
  const btnClasses = `modalBtn ${additionalClass || ""}`;
  return (
    <button
      className={btnClasses}
      onClick={btnClick}
      type="submit"
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
  additionalClass: PropTypes.string,
};
