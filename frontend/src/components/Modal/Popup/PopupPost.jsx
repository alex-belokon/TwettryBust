import Popup from "./Popup";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FiUserX, FiUserCheck } from "react-icons/fi";
import { GoCircleSlash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../api/posts";
import { addDelPost } from "../../../redux/changePost";
import { addDelFollow } from "../../../redux/changeFollow";
import { getUsersFollowing, toggleFollow } from "../../../api/profile";
import { useState } from "react";
import { useEffect } from "react";

export default function PopupPost({ closePopup, postData }) {
  const { t } = useTranslation();
  const currentUserId = useSelector((state) => state.user.user.id);
  const [isSubscribe, setIsSubscribe] = useState(null);
  const isCurrentUserPost = postData.author.id === currentUserId;
  const dispatch = useDispatch();

  useEffect(() => {
    getFollowings(currentUserId);
  }, [currentUserId]);

  function delPost() {
    closePopup();
    fetchDel();
  }

  function toggleSubscribe() {
    closePopup();
    toggleFollowUser();
  }

  async function fetchDel() {
    try {
      const data = await deletePost(postData.id);
      data && dispatch(addDelPost());
    } catch (e) {
      console.log(e);
    }
  }

  async function toggleFollowUser() {
    try {
      await toggleFollow(currentUserId, postData.author.id);
      setIsSubscribe((prevState) => !prevState);
      dispatch(addDelFollow());
    } catch (e) {
      console.log(e);
    }
  }

  async function getFollowings() {
    try {
      const data = await getUsersFollowing(currentUserId);
      const isInSubscribe = data.some(elem => elem.id === postData.author.id);
      setIsSubscribe(isInSubscribe)
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Popup closePopup={closePopup} popupClass="popupRight">
      <ul className="popupPost__list">
        {!isCurrentUserPost && (
          <li className="popupPost__item" onClick={toggleSubscribe}>
            {isSubscribe ? (
              <>
                <FiUserX className="popupPost__icon popupPost__icon--red" />
                <span className="popupPost__itemText">
                  {t("popup.unsubscribe")}
                </span>
              </>
            ) : (
              <>
                <FiUserCheck className="popupPost__icon popupPost__icon--green" />
                <span className="popupPost__itemText">
                  {t("popup.subscribe")}
                </span>
              </>
            )}
          </li>
        )}
        {isCurrentUserPost && (
          <li className="popupPost__item" onClick={delPost}>
            <GoCircleSlash className="popupPost__icon" />
            <span className="popupPost__itemText popupPost__itemText--noWrap">
              {t("delete.post")}
            </span>
          </li>
        )}
      </ul>
    </Popup>
  );
}

PopupPost.propTypes = {
  closePopup: PropTypes.func,
};
