import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Recommended.scss";
import { toggleFollow } from "../../../api/profile";

export default function Recommended({ recommendUser, searchUser }) {
  const [btnName, setBtnName] = useState(recommendUser.following);
  const currentUserId = useSelector((state) => state.authUser.user.id);

  function toggleFollowClick() {
    fetchToggle();
  }
  async function fetchToggle() {
    try {
      const data = await toggleFollow(currentUserId, recommendUser.id);
      data && setBtnName(!btnName);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {recommendUser && (
        <div className="recommendUser__wrapper">
          <Link
            to={`/profile/${recommendUser.id}`}
            className="recommendUser__link"
          >
            <div className="recommendUser__avatar">
              {recommendUser.avatar ? (
                <img
                  src={recommendUser.avatar}
                  alt={recommendUser.userName}
                  className="recommendUser__img"
                />
              ) : (
                <span className="recommendUser__avatar--text">
                  {recommendUser.firstName
                    ? recommendUser.firstName.split("")[0]
                    : "U"}
                </span>
              )}
            </div>
            <div className={searchUser ? 'recommendUser__userDataWrapper recommendUser__userDataWrapper--width' : "recommendUser__userDataWrapper"}>
              <p className="recommendUser__userData">
                {recommendUser.firstName} {recommendUser.lastName}
              </p>
              <p className="recommendUser__userData">
                {recommendUser.userName}
              </p>
            </div>
          </Link>
          {!searchUser && (
            <button className="recommendUser__btn" onClick={toggleFollowClick}>
              {!btnName ? "Слідкувати" : "Відписатись"}
            </button>
          )}
        </div>
      )}
    </>
  );
}
