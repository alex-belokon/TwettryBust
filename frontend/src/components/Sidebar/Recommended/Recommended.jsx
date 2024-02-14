import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Recommended.scss";
import { toggleFollow } from "../../../api/profile";

export default function Recommended({ recommendUser }) {
  const [btnName, setBtnName] = useState(true);
  const currentUserId = useSelector((state) => state.authUser.user.id);

  function toggleFollowClick() {
    fetchToggle();
  }

  async function fetchToggle () {
    try {
      // const data = await toggleFollow(currentUserId, recommendUser.id);
      const data = await toggleFollow('b218f74d-4dde-49d3-80e0-543a81761cd5', 'f1e5d32c-6151-4f3b-a554-602e9901fcec');
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
                <img src={recommendUser.avatar} alt={recommendUser.userName} className="recommendUser__img"/>
              ) : (
                <span className="recommendUser__avatar--text">
                  {recommendUser.firstName
                    ? recommendUser.firstName.split("")[0]
                    : "U"}
                </span>
              )}
            </div>
            <div className="recommendUser__userDataWrapper">
              <p className="recommendUser__userData">
                {recommendUser.firstName} {recommendUser.lastName}
              </p>
              <p className="recommendUser__userData">{recommendUser.email}</p>
            </div>
          </Link>
          <button className="recommendUser__btn" onClick={toggleFollowClick}>
            {btnName ? 'Слідкувати' : 'Відписатись'} 
          </button>
        </div>
      )}
    </>
  );
}
