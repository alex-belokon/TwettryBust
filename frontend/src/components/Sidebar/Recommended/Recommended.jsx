import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toggleFollow } from "../../../api/profile";
import BtnFollowToggle from "../../Buttons/BtnFollowToggle/BtnFollowToggle";
import { avatarColor } from "../../../utils/avatarColor";
import { useEffect } from "react";
import "./Recommended.scss";

export default function Recommended({ recommendUser, searchUser, setRecommendUsers, recommendUsers=[], closePopup }) {
  const [btnName, setBtnName] = useState(recommendUser.following);
  const currentUserId = useSelector((state) => state.authUser.user.id);

  function toggleFollowClick() {
    fetchToggle();
  }

  async function fetchToggle() {
    try {
      await toggleFollow(currentUserId, recommendUser.id);
      filterFollow(recommendUser.id);
      setBtnName(prevState => !prevState);
    } catch (e) {
      console.log(e);
    }
  }

  function filterFollow (userId) {
    const filteredUsers = recommendUsers.filter(
      (elem) => elem.id !== userId
    );
    setRecommendUsers(filteredUsers);
  }

  return (
    <>
      {recommendUser && (
        <div className="recommendUser__wrapper">
          <Link
            to={`/profile/${recommendUser.id}`}
            className="recommendUser__link"
            onClick={closePopup}
          >
            <div className={`recommendUser__avatar ${avatarColor(recommendUser?.userName?.[0] || 'U')}`}>
              {recommendUser.avatar ? (
                <img
                  src={recommendUser.avatar}
                  alt={recommendUser.userName}
                  className="recommendUser__img"
                />
              ) : (
                <span className="recommendUser__avatar--text">
                  {recommendUser.userName
                    ? recommendUser?.userName?.[0]
                    : "U"}
                </span>
              )}
            </div>
            <div className={searchUser ? 'recommendUser__userDataWrapper--width' : "recommendUser__userDataWrapper"}>
              <p className="recommendUser__userData">
                {recommendUser.firstName} {recommendUser.lastName}
              </p>
              <p className="recommendUser__userData">
                {recommendUser.userName}
              </p>
            </div>
          </Link>
          {!searchUser && (
            <BtnFollowToggle btnName={btnName} toggleFollowClick={toggleFollowClick}></BtnFollowToggle>
          )}
        </div>
      )}
    </>
  );
}
