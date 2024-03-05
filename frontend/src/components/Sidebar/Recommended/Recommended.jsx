import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toggleFollow } from "../../../api/profile";
import BtnFollowToggle from "../../Buttons/BtnFollowToggle/BtnFollowToggle";
import "./Recommended.scss";
import UserAvatar from "../../UserAvatar/UserAvatar";

export default function Recommended({
  recommendUser,
  searchUser,
  setRecommendUsers,
  recommendUsers = [],
  closePopup,
}) {
  const [btnName, setBtnName] = useState(recommendUser.following);
  const currentUserId = useSelector((state) => state.authUser.user.id);

  function toggleFollowClick() {
    fetchToggle();
  }

  async function fetchToggle() {
    try {
      await toggleFollow(currentUserId, recommendUser.id);
      filterFollow(recommendUser.id);
      setBtnName((prevState) => !prevState);
    } catch (e) {
      console.log(e);
    }
  }

  function filterFollow(userId) {
    const filteredUsers = recommendUsers.filter((elem) => elem.id !== userId);
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
            <UserAvatar
              userName={recommendUser.userName}
              userAvatar={recommendUser.avatar}
            ></UserAvatar>

            <div
              className={
                searchUser
                  ? "recommendUser__userDataWrapper--width"
                  : "recommendUser__userDataWrapper"
              }
            >
              <p className="recommendUser__userData">
                {recommendUser.firstName} {recommendUser.lastName}
              </p>
              <p className="recommendUser__userData">
                {recommendUser.userName}
              </p>
            </div>
          </Link>
          {!searchUser && (
            <BtnFollowToggle
              btnName={btnName}
              toggleFollowClick={toggleFollowClick}
            ></BtnFollowToggle>
          )}
        </div>
      )}
    </>
  );
}
