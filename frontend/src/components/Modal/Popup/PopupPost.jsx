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
import { getUsersFollowing, toggleFollow } from "../../../api/profile";
import { useState } from "react";
import { useEffect } from "react";

export default function PopupPost({ closePopup, postData }) {
  const { t } = useTranslation();
  const currentUserId = useSelector((state) => state.authUser.user.id);
  const [isSubscribe, setIsSubscribe] = useState(null);
  const isCurrentUserPost = postData.author.id === currentUserId;
  const dispatch = useDispatch();


  useEffect(()=>{
    getFollowings(currentUserId);
  }, [currentUserId])

  function delPost() {
    closePopup();
    fetchDel();
  }

  function toggleSubscribe () {
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

  async function toggleFollowUser () {
    try {
      await toggleFollow(currentUserId, postData.author.id);
      setIsSubscribe(prevState => !prevState)
    } catch (e) {
      console.log(e);
    }
  }

  async function getFollowings(currentUserId) {
    try {
      console.log(currentUserId);
      const data = await getUsersFollowing(currentUserId);
      // console.log(data);
      // const aa = data.some(elem => elem.id === postData.author.id)
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Popup closePopup={closePopup} popupClass='popupRight'>
      <ul className="popupPost__list">
        {!isCurrentUserPost && (
          <li className="popupPost__item" onClick={toggleSubscribe}>
            {isSubscribe
              ? <><FiUserX className="popupPost__icon" /> Відписатись від користувача</>  
              : <><FiUserX className="popupPost__icon" /> Підписатись на користувача</> }
          </li>
        )}
        {isCurrentUserPost && (
          <li className="popupPost__item" onClick={delPost}>
            <GoCircleSlash className="popupPost__icon" /> Видалити пост
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
