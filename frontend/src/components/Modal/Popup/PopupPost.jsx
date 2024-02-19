import Popup from "./Popup";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FiUserX } from "react-icons/fi";
import { GoCircleSlash } from "react-icons/go";
// import { BsFlag } from "react-icons/bs";
// import { CiViewList } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../api/posts";
import { addDelPost } from "../../../redux/changePost";

export default function PopupPost({ closePopup, postData, setChangePost }) {
  const { t } = useTranslation();
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const isCurrentUserPost = postData.author.id === currentUserId;
  const dispatch = useDispatch();

  function delPost() {
    closePopup();
    fetchDel();
    dispatch(addDelPost());
  }

  async function fetchDel() {
    try {
      await deletePost(postData.id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Popup closePopup={closePopup} position="right">
      <ul className="popupPost__list">
        {!isCurrentUserPost && (
          <li className="popupPost__item" onClick={closePopup}>
            <FiUserX className="popupPost__icon" /> Відписатись
          </li>
        )}
        {isCurrentUserPost && (
          <li className="popupPost__item" onClick={delPost}>
            <GoCircleSlash className="popupPost__icon" /> "Видалити"
          </li>
        )}
        {/* <li className="popupPost__item" onClick={closePopup}>
          <CiViewList className="popupPost__icon" /> Додати/видалити зі списків
        </li> */}
        {/* <li className="popupPost__item" onClick={closePopup}>
          <BsFlag className="popupPost__icon" /> Поскаржитись на пост
        </li> */}
      </ul>
    </Popup>
  );
}

PopupPost.propTypes = {
  closePopup: PropTypes.func,
};
