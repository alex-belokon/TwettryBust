import Popup from "./Popup";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FiUserX } from "react-icons/fi";
import { GoCircleSlash } from "react-icons/go";
import { BsFlag } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";

export default function PopupPost({ closePopup }) {
  const { t } = useTranslation();

  return (
    <Popup closePopup={closePopup} position="right">
      <ul className="popupPost__list">
        <li className="popupPost__item" onClick={closePopup}>
          <FiUserX className="popupPost__icon" /> Відписатись
        </li>
        <li className="popupPost__item" onClick={closePopup}>
          <CiViewList className="popupPost__icon" /> Додати/видалити зі списків
        </li>
        <li className="popupPost__item" onClick={closePopup}>
          <GoCircleSlash className="popupPost__icon" /> Заблокувати
        </li>
        <li className="popupPost__item" onClick={closePopup}>
          <BsFlag className="popupPost__icon" /> Поскаржитись на пост
        </li>
      </ul>
    </Popup>
  );
}

PopupPost.propTypes = {
  closePopup: PropTypes.func,
};
