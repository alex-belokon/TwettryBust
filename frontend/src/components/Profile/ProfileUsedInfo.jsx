import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCalendarOutline } from "react-icons/io5";
import ModalEditProfile from "../Modal/ModalEditProfile/ModalEditProfile";
import FollowActions from "./FollowActions";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa";
import BtnFollow from "../UserCard/BtnFollow";
import { createNewDialog } from "../../api/messages";
export default function ProfileUsedInfo({ userData, setUserData }) {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { t } = useTranslation();
  const userId = useSelector((state) => state.authUser.user.id);
  const { id } = useParams();
  
  const isCurrentUser = userId === id;

  async function createDialog () {
     try {
      const data = await createNewDialog(userId, id);
      console.log('створення нового чату', data);
     } catch (e) {
      console.log(e);
     }
  }

  return (
    <>
      <div className="profile__banner">
        {userData.headerPhoto && (
          <img
            className="profile__bannerImg"
            src={userData.headerPhoto}
            aria-hidden="true"
          />
        )
      }
      </div>
      <div className="profileInfo">
        <div className="profileInfo__photoWrapper">
          <div className="profile__userScreensaver">
            {userData.avatar ? (
              <img
                className="profile__screensaver"
                src={userData.avatar}
                alt={userData.firstName + " photo"}
              />
            ) : (
              <span>{`${userData.userName}`.split("")[0]}</span>
            )}
          </div>
          {isCurrentUser ? (
            <button
              className="profile__btn"
              onClick={() => setIsModalEditOpen(true)}
            >
              {t("btn.editProfile")}
            </button>
          ) : (
            <div className="userActions">
              <Link to='/messages' className="profile__btnLetter" aria-label="send letter" onClick={createDialog}>
                <FaRegEnvelope />
              </Link>
              <div style={{width: '110px'}}></div>
              <BtnFollow userData={userData}></BtnFollow>
            </div>
          )}
        </div>
        <h2 className="profileInfo__userName">
          {userData.firstName} {userData.lastName}
        </h2>
        <p className="profileInfo__userMail">{userData.userName}</p>
        <p className="profileInfo__bio">{userData.bio}</p>
        <p className="profileInfo__date">
          <IoCalendarOutline className="userProfile_icon" />
          {t("userProfile.joined")} {userData.createdAt}
        </p>

        <FollowActions
          following={userData.following}
          followers={userData.followers}
          userId = {id}
        ></FollowActions>
      </div>

      {isModalEditOpen && (
        <ModalEditProfile
          userData={userData}
          setUserData={setUserData}
          closeModal={() => setIsModalEditOpen(false)}
        ></ModalEditProfile>
      )}
    </>
  );
}

ProfileUsedInfo.propTypes = {
  userData: PropTypes.object,
  setUserData: PropTypes.func,
};
