import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCalendarOutline } from "react-icons/io5";
import ModalEditProfile from "../Modal/ModalEditProfile/ModalEditProfile";
import FollowActions from "./FollowActions";

export default function ProfileUsedInfo({userData, fetchData}) {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className="profile__banner">
        {userData.banner && (
          <img
            className="profile__bannerImg"
            src={userData.banner}
            alt="user banner"
          />
        )}
      </div>
      <div className="profileInfo">
        <div className="profileInfo__photoWrapper">
          <div className="profile__userScreensaver">
            {userData.userScreensaver ? (
              <img
                className="profile__screensaver"
                src={userData.userScreensaver}
                alt={userData.name + " photo"}
              />
            ) : (
              <span>{`${userData.name}`.split("")[0]}</span>
            )}
          </div>
          <button
            className="profile__btn"
            onClick={() => setIsModalEditOpen(true)}
          >
            {t("btn.editProfile")}
          </button>
        </div>
        <h2 className="profileInfo__userName">
          {userData.name} {userData.lastName}{" "}
        </h2>
        <p className="profileInfo__userMail">{userData.login}</p>
        <p className="profileInfo__bio">{userData.bio}</p>
        <p className="profileInfo__date">
          <IoCalendarOutline className="icon" />
          {t("userProfile.joined")} {userData.joiningDate}
        </p>

        <FollowActions
          following={userData.following}
          followers={userData.followers}
        ></FollowActions>
 
      </div>

      {isModalEditOpen && (
        <ModalEditProfile
          userData={userData}
          fetchData={fetchData}
          // setUserData={setUserData}
          closeModal={() => setIsModalEditOpen(false)}
        ></ModalEditProfile>
      )}
    </>
  );
}
